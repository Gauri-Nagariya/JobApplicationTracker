import mongoose from "mongoose";

const profileSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "userModel",
      required: [true, "user is required"],
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    location: {
      type: String,
      required: false,
    },
    currentRole: {
      type: String,
      required: true,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid", "Senior"],
    },
    skills: [String],
  },
  { timestamps: true }
);

const userProfile = mongoose.model("profileModel", profileSchema);

export default userProfile;
