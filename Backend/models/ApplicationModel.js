import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true, "User is required"],
    },
    companyName: {
      type: String,
      required: [true, "Company name is required"],
      trim: true,
    },
    jobTitle: {
      type: String,
      required: [true, "Job title is required"],
      trim: true,
    },
    jobLocation: {
      type: String,
      required: false,
      trim: true,
    },
    jobType: {
      type: String,
      enum: ["Full-time", "Part-time", "Internship", "Contract", "Remote"],
      required: true,
    },
    status: {
      type: String,
      enum: [
        "Saved",
        "Applied",
        "Shortlisted",
        "Interview Scheduled",
        "Offer",
        "Rejected",
      ],
      default: "Applied",
    },
    salaryRange: {
      min: {
        type: Number,
        required: true,
      },
      max: {
        type: Number,
        required: true,
      },
    },
    applicationDate: {
      type: Date,
      default: Date.now,
    },
    appliedVia: {
      type: String,
      enum: ["LinkedIn", "Company Site", "Referral", "Indeed", "Other"],
      required: false,
    },
    applicationLink: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
    CompanyCareerPage: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
    PortfolioGitHubLinkedIn: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
    resume: {
      data: Buffer,
      contentType: String,
    },
    coverLetter: {
      data: Buffer,
      contentType: String,
    },
    notes: {
      type: String,
      required: false,
      trim: true,
    },
  },
  { timestamps: true }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
