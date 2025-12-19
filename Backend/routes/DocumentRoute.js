import multer from "multer";
import auth from "../middlewares/auth.js";
import express from "express";
import Application from "../models/ApplicationModel.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post(
  "/upload-docs",
  auth,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "coverLetter", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // Find the application by ID from frontend
      const { applicationId } = req.body;
      if (!applicationId) return res.status(400).json({ message: "Application ID is required" });

      let application = await Application.findById(applicationId);
      if (!application) return res.status(404).json({ message: "Application not found" });

      // Save resume if uploaded
      if (req.files.resume) {
        application.resume = {
          data: req.files.resume[0].buffer,
          contentType: req.files.resume[0].mimetype,
        };
      }

      // Save cover letter if uploaded
      if (req.files.coverLetter) {
        application.coverLetter = {
          data: req.files.coverLetter[0].buffer,
          contentType: req.files.coverLetter[0].mimetype,
        };
      }

      await application.save();
      res.status(200).json({ message: "Documents uploaded successfully", application });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: error.message });
    }
  }
);


router.get("/files/:applicationId/:type", auth, async (req, res) => {
  try {
    const { applicationId, type } = req.params;
        const { download } = req.query; // <-- this line is required

    const application = await Application.findById(applicationId);
    if (!application) return res.status(404).json({ message: "Application not found" });

    if (!["resume", "coverLetter"].includes(type))
      return res.status(400).json({ message: "Invalid file type" });

    const file = application[type];
    if (!file || !file.data) return res.status(404).json({ message: `${type} not found` });

    // Determine file extension from mimetype
    let ext = "";
    switch (file.contentType) {
      case "application/pdf":
        ext = ".pdf";
        break;
      case "application/msword":
        ext = ".doc";
        break;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        ext = ".docx";
        break;
      default:
        ext = "";
    }

   res.set({
      "Content-Type": file.contentType,
      "Content-Disposition": download === "true"
        ? `attachment; filename=${type}-${applicationId}${ext}` // force download
        : "inline" // view in browser
    });

    res.send(file.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
