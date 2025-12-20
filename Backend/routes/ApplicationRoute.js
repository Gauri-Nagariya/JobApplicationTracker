// import express from "express";
// import Application from '../models/ApplicationModel.js'

// const router = express.Router();

// router.get("/applications", async (req, res) => {
//   try {
//     const applications = await Application.find({
//       user: req.user.id,
//     }).sort({ createdAt: -1 });

//     res.json({ applications });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });


// router.post("/application", async (req, res) => {
//   try {
//     const {
//       companyName,
//       jobTitle,
//       jobLocation,
//       jobType,
//       status,
//       applicationDate,
//       appliedVia,
//       notes,
//     } = req.body;

//   // router.post("/applications", async (req, res) => {
//   try {
//     const application = await Application.create({
//       ...req.body,
//       user: req.user.id, // attach logged-in user
//     });

//     res.status(201).json({
//       message: "Application added successfully",
//       application,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


//   router.put("/applications/:id", async (req, res) => {
//   try {
//     const application = await Application.findOneAndUpdate(
//       { _id: req.params.id, user: req.user.id },
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!application) {
//       return res.status(404).json({ message: "Application not found" });
//     }

//     res.json({
//       message: "Application updated successfully",
//       application,
//     });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });


// export default router;


import express from "express";
import Application from "../models/ApplicationModel.js";

const router = express.Router();

/**
 * GET all applications of logged-in user
 */
router.get("/applications", async (req, res) => {
  try {
    const applications = await Application.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({ applications });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

/**
 * CREATE new application
 */
router.post("/applications", async (req, res) => {
  try {
    const application = await Application.create({
      ...req.body,
      user: req.user.id,
    });

    res.status(201).json({
      message: "Application added successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * UPDATE application
 */
router.put("/applications/:id", async (req, res) => {
    console.log("PUT HIT:", req.params.id);
  try {
    const application = await Application.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    res.status(200).json({
      message: "Application updated successfully",
      application,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//-----------------------------------getting perticular application-----------------------------

router.get("/applications/:id", async (req, res) => {
    console.log("GET /applications/:id hit", req.params.id, "user:", req.user);

  try {
    const application = await Application.findOne({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!application) {
      return res.status(404).json({ message: "Not found" });
    }

    res.json({ application });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//---------------------------------------DELETE-------------------------------------

router.delete("/applications/delete/:id", async (req, res) => {
  try {
   const deletedApplication = await Application.findOneAndDelete({
  _id: req.params.id,
  user: req.user.id
});

if (!deletedApplication) {
  return res.status(404).json({ message: "Application not found or cannot delete" });
}

res.status(200).json({ message: "Application deleted successfully" });


  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});


export default router;
