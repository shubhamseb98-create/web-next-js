import { connectDB } from "../../lib/config";
import { revalidatePath } from "next/cache";

// Models
import Banner from "../../models/Banner";
import Service from "../../models/Service";
import Portfolio from "../../models/Portfolio";
import Testimonial from "../../models/Testimonial";
import Client from "../../models/Client";
import TeamMember from "../../models/TeamMember";
import Technology from "../../models/Technology";
import Work from "../../models/Work";
import whyChoose from "../../models/whyChoose";
import Blog from "../../models/Blog";
import Achievement from "../../models/Achievement";
import Capability from "../../models/Capability";
import Certification from "../../models/Certification";
import CompanyCertification from "../../models/CompanyCertification";
import Category from "../../models/Category";
import Product from "../../models/Product";
import GalleryImage from "../../models/GalleryImage";
import Section from "../../models/Section";
import CustomPage from "../../models/CustomPage";
import PageBanner from "../../models/PageBanner";
import About from "../../models/About";
import HeaderMenu from "../../models/HeaderMenu";

const MODEL_MAP = {
  banner: Banner,
  banners: Banner,
  service: Service,
  services: Service,
  portfolio: Portfolio,
  portfolios: Portfolio,
  testimonial: Testimonial,
  testimonials: Testimonial,
  client: Client,
  clients: Client,
  team: TeamMember,
  teamMember: TeamMember,
  technology: Technology,
  technologies: Technology,
  work: Work,
  ourWork: Work,
  "our-work": Work,
  whyChoose: whyChoose,
  "why-choose": whyChoose,
  blog: Blog,
  blogs: Blog,
  achievement: Achievement,
  achievements: Achievement,
  capability: Capability,
  capabilities: Capability,
  certification: Certification,
  certifications: Certification,
  companyCertification: CompanyCertification,
  "company-certifications": CompanyCertification,
  category: Category,
  categories: Category,
  product: Product,
  products: Product,
  gallery: GalleryImage,
  galleryImage: GalleryImage,
  section: Section,
  sections: Section,
  customPage: CustomPage,
  "custom-pages": CustomPage,
  pageBanner: PageBanner,
  "page-banners": PageBanner,
  about: About,
  "header-menu": HeaderMenu,
  headerMenu: HeaderMenu
};

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { entity, items } = body;

    if (!entity) {
      return Response.json({ message: "Entity name is required" }, { status: 400 });
    }

    const Model = MODEL_MAP[entity];
    if (!Model) {
      return Response.json({ message: `Entity '${entity}' not recognized for reordering` }, { status: 400 });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return Response.json({ message: "Items array is required" }, { status: 400 });
    }

    const bulkOps = items.map((item, index) => {
      const id = typeof item === "string" ? item : (item._id || item.id);
      const sort = typeof item.sort === "number" ? item.sort : index + 1;
      return {
        updateOne: {
          filter: { _id: id },
          update: { $set: { sort } }
        }
      };
    });

    if (bulkOps.length > 0) {
      await Model.bulkWrite(bulkOps);
    }

    try {
      revalidatePath("/", "layout");
    } catch (e) {
      console.warn("Revalidation warning:", e.message);
    }

    return Response.json({
      success: true,
      message: `${entity} reordered successfully`
    });
  } catch (error) {
    console.error("Reorder API Error:", error);
    return Response.json({ message: "Failed to reorder", error: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  return POST(request);
}
