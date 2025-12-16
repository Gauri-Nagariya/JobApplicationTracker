import express from "express";
import userProfile from "../models/profileModel.js";
const router = express.Router();

router.get("/profile", (req, res) => {
  res.send("profile route is working");
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
