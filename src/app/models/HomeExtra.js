import mongoose from "mongoose";

    // choose_title
    // choose_subtitle
    // product_title
    // product_subtitle
    // certified_title
    // work_title
    // work_subtitle
    // blog_title
    // blog_subtitle
    // contact_title
    // contact_subtitle
    // featured_project_title
    // featured_project_subtitle
    // featured_project_description
    // client_title
    // client_subtitle
    // client_description
    // achievement_title
    // achievement_subtitle
    // achievement_description
    // capability_title
    // capability_subtitle
    // capability_description
    // technology_title
    // technology_subtitle
    // technology_description
    // team_title
    // team_subtitle
    // team_label
    // team_description
    // testimonial_title
    // testimonial_subtitle
    // testimonial_description

const HomeExtraSchema = new mongoose.Schema({
    work_title: {
    type: String,
    required: false,
    },
    work_subtitle: {
    type: String,
    required: false,
    },
    work_description: {
    type: String,
    required: false,
    },
    service_title: {
    type: String,
    required: false,
    },
    service_subtitle: {
    type: String,
    required: false,
    },
    service_description: {
    type: String,
    required: false,
    },
    blog_title: {
    type: String,
    required: false,
    },
    blog_subtitle: {
    type: String,
    required: false,
    },
    contact_title: {
    type: String,
    required: false,
    },
    contact_subtitle: {
    type: String,
    required: false,
    },
    featured_project_title: {
    type: String,
    required: false,
    },
    featured_project_subtitle: {
    type: String,
    required: false,
    },
    featured_project_description: {
    type: String,
    required: false,
    },
    client_title: {
      type: String,
      required: false,
    },
    client_subtitle: {
      type: String,
      required: false,
    },
    client_description: {
      type: String,
      required: false,
    },
    achievement_title: {
      type: String,
      required: false,
    },
    achievement_subtitle: {
      type: String,
      required: false,
    },
    achievement_description: {
      type: String,
      required: false,
    },
    capability_title: {
      type: String,
      required: false,
    },
    capability_subtitle: {
      type: String,
      required: false,
    },
    capability_description: {
      type: String,
      required: false,
    },
    technology_title: {
      type: String,
      required: false,
    },
    technology_subtitle: {
      type: String,
      required: false,
    },
    technology_description: {
      type: String,
      required: false,
    },
    team_title: {
      type: String,
      required: false,
    },
    team_subtitle: {
      type: String,
      required: false,
    },
    team_label: {
      type: String,
      required: false,
    },
    team_description: {
      type: String,
      required: false,
    },
    testimonial_title: {
      type: String,
      required: false,
    },
    testimonial_subtitle: {
      type: String,
      required: false,
    },
    testimonial_description: {
      type: String,
      required: false,
    },
});

if (mongoose.models.HomeExtra) {
  delete mongoose.models.HomeExtra;
}

export default mongoose.model("HomeExtra", HomeExtraSchema);