import express from "express";
import Application from '../models/ApplicationModel.js'

const router = express.Router();

router.get("/application", (req, res) => {
  res.send("Application route is working");
});

router.post("/application", async (req, res) => {
  try {
    const {
      companyName,
      jobTitle,
      jobLocation,
      jobType,
      status,
      applicationDate,
      appliedVia,
      notes,
    } = req.body;

    const profile = await Application.findOneAndUpdate(
      { user: req.user.id }, // 🔑 match
      {
        user: req.user.id,
        companyName,
        jobTitle,
        jobLocation,
        jobType,
        status,
        applicationDate,
        appliedVia,
        notes,
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Application details saved successfully",
      profile,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
