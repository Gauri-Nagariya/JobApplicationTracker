import express from "express";
import userProfile from "../models/profileModel.js";
import auth from "../middlewares/auth.js";
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


// router.get('/profile', authMiddleware, async (req, res) => {
//   try {
//     const user = await userProfile.findOne({ user: req.user.id });
//     if (!user) return res.status(404).json({ message: 'Profile not found' });

//     const completion = calculateProfileCompletion(user);

//     res.json({ user, profileCompletion: completion });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server error' });
//   }
// });



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
      Portfolio,
      GitHub,
      LinkedIn,
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
         Portfolio,
      GitHub,
      LinkedIn
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

const profileFields = [
  'fullName',
  'phone',
  'location',
  'currentRole',
  'experienceLevel',
  'skills',
   'Portfolio',
      'GitHub',
      'LinkedIn'
];

function calculateProfileCompletion(profile) {
  const totalFields = profileFields.length;
  let filled = 0;

  profileFields.forEach(field => {
    const value = profile[field];

    if (value !== undefined && value !== null) {
      if (Array.isArray(value) && value.length > 0) {
        filled++;
      } else if (typeof value === 'string' && value.trim() !== '') {
        filled++;
      } else if (typeof value === 'number') {
        filled++;
      }
    }
  });

  return Math.round((filled / totalFields) * 100);
}


router.get('/profile/completion', async (req, res) => {
  try {
    const profile = await userProfile.findOne({ user: req.user.id });
    if (!profile) return res.status(404).json({ message: 'Profile not found' });

    const completion = calculateProfileCompletion(profile);

    res.status(200).json({ profileCompletion: completion });
  } catch (error) {
    console.error('Error fetching profile completion:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;
