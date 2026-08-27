import { connectDB } from "../../lib/config";
import ProjectFaq from "../../models/ProjectFaq";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

const INITIAL_FAQS = [
  {
    question: "What development services do you specialize in?",
    answer: "We specialize in developing robust static, dynamic, and complex e-commerce websites. We leverage cutting-edge frameworks like React, Next.js, and Node to deliver high-performance solutions.",
    sort: 1,
    status: "active"
  },
  {
    question: "How do you roll out digital solutions for businesses?",
    answer: "Our process includes Discovery (auditing your needs), Prototyping (building MVP), Optimization (fine-tuning UX/UI), and Deployment (launching with comprehensive monitoring).",
    sort: 2,
    status: "active"
  },
  {
    question: "Can you tailor web solutions to fit our specific needs?",
    answer: "Absolutely. We build fully custom, highly scalable platforms tailored strictly to your industry requirements, from healthcare portals to luxury e-commerce.",
    sort: 3,
    status: "active"
  },
  {
    question: "What kind of post-deployment support do you provide?",
    answer: "We provide extensive maintenance packs including performance monitoring, security patching, feature scaling, and dedicated engineering support.",
    sort: 4,
    status: "active"
  }
];

export async function GET() {
  try {
    await connectDB();
    let faqs = await ProjectFaq.find().sort({ sort: 1, createdAt: 1 }).lean();

    // Auto-seed if empty
    if (!faqs || faqs.length === 0) {
      await ProjectFaq.insertMany(INITIAL_FAQS);
      faqs = await ProjectFaq.find().sort({ sort: 1, createdAt: 1 }).lean();
    }

    return Response.json({ success: true, data: faqs });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();
    const { question, answer, sort, status } = body;

    if (!question || !answer) {
      return Response.json({ success: false, error: "Question and Answer are required" }, { status: 400 });
    }

    const created = await ProjectFaq.create({
      question: question.trim(),
      answer: answer.trim(),
      sort: Number(sort) || 0,
      status: status || "active"
    });

    revalidatePath("/projects", "page");

    return Response.json({ success: true, data: created });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
}
