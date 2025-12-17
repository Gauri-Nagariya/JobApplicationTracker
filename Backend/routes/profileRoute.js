import express from "express";
import userProfile from "../models/profileModel.js";
const router = express.Router();

router.get("/profile", async(req, res) => {
  // res.send("profile route is working");
   try {
    const profile = await userProfile.findOne({ user: req.user.id });
    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }
    res.status(200).json({ user: profile });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.post("/profile", async (req, res) => {
    console.log("BODY:", req.body);
console.log("USER:", req.user);
  try {
    const {
      fullName,
      phone,
      location,
      currentRole,
      experienceLevel,
      skills,
    } = req.body;

    const profile = await userProfile.findOneAndUpdate(
      { user: req.user.id },        // 🔑 match
      {
        user: req.user.id,         
        fullName,
        phone,
        location,
        currentRole,
        experienceLevel,
        skills,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Profile saved successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
