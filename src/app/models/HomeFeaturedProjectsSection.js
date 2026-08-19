import mongoose from "mongoose";

const homeFeaturedProjectsSectionSchema = new mongoose.Schema({
  title: {
    type: String,
    default: "Featured",
  },
  titleHighlight: {
    type: String,
    default: "Projects",
  },
  intro: {
    type: String,
    default: "Explore a curated selection of our most recent and impactful work. Scroll down to experience our stacked GSAP presentation.",
  },
  backgroundColor: {
    type: String,
    default: "transparent",
  }
}, {
  timestamps: true,
});

if (mongoose.models.HomeFeaturedProjectsSection) {
  delete mongoose.models.HomeFeaturedProjectsSection;
}

export default mongoose.model("HomeFeaturedProjectsSection", homeFeaturedProjectsSectionSchema);
