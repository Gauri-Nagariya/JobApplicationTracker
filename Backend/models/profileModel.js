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
      required: false,
    },
    location: {
      type: String,
      required: false,
    },
    currentRole: {
      type: String,
      required: false,
    },
    experienceLevel: {
      type: String,
      enum: ["Fresher", "Junior", "Mid", "Senior"],
      required: false,
    },
    skills:{type: [String],
      required: false,
    },
    Portfolio: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
     GitHub: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
     LinkedIn: {
      type: String,
      trim: true,
      match: [
        /^(https?:\/\/)?([\w\-])+\.{1}([a-zA-Z]{2,63})([\w\-._~:/?#[\]@!$&'()*+,;=]*)?$/,
        "Please enter a valid URL",
      ],
    },
  },
  { timestamps: true }
);

const userProfile = mongoose.model("profileModel", profileSchema);

export default userProfile;
