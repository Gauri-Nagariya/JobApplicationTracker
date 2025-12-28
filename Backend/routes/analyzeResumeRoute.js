// import express from "express";
// import multer from "multer";
// import mammoth from "mammoth";
// import cors from "cors";
// import stringSimilarity from "string-similarity";

// import { extractPdfText } from "../middlewares/pdfHelper.js";
// import { SKILLS } from "../utils/skillList.js";

// const router = express.Router();

// /* ================= CONFIG ================= */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });

// // router.use(
// //   cors({
// //     // origin: "http://localhost:5173",
// //     //  origin: "https://job-application-tracker-peach-seven.vercel.app",
// //      origin: "https://job-application-tracker-lemon-eight.vercel.app",
// //     credentials: true,
// //   })
// // );

// /* ================= HELPERS ================= */
// const normalize = (text) =>
//   text
//     .toLowerCase()
//     .replace(/[-_.,]/g, " ")
//     .replace(/\s+/g, " ")
//     .trim();

// /* ================= SKILL ALIASES ================= */
// const SKILL_ALIASES = {
//   html: ["html", "html5"],
//   css: ["css", "css3"],
//   javascript: ["javascript", "js", "es6"],
//   react: ["react", "react.js"],
//   node: ["node", "node.js"],
//   express: ["express", "express.js"],
//   "rest api": ["rest api", "restful api", "restful apis", "rest apis"],
// };

// /* ================= SECTION ALIASES ================= */
// const SECTION_ALIASES = {
//   summary: ["summary", "career objective", "objective"],
//   skills: ["skills", "key skills", "technical skills"],
//   experience: ["experience", "project experience", "projects"],
//   education: ["education", "academic background"],
// };

// /* ================= MATCHERS ================= */
// const exactSkillMatch = (skill, text) => {
//   const aliases = SKILL_ALIASES[skill] || [skill];

//   return aliases.some((alias) => {
//     const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
//     const regex = new RegExp(`\\b${escaped}\\b`, "i");
//     return regex.test(text);
//   });
// };

// const fuzzySoftSkillMatch = (skill, text) => {
//   const skillWords = skill.split(" ");
//   const textWords = text.split(" ");

//   if (text.includes(skill)) return true;

//   for (let i = 0; i <= textWords.length - skillWords.length; i++) {
//     const phrase = textWords.slice(i, i + skillWords.length).join(" ");
//     if (stringSimilarity.compareTwoStrings(skill, phrase) > 0.75) {
//       return true;
//     }
//   }
//   return false;
// };

// /* ================= ROUTE ================= */
// router.post("/analyze-resume", upload.single("resume"), async (req, res) => {
//   try {
//     const { jobDescription } = req.body;
//     const file = req.file;
//     const MIN_JD_LENGTH = 100; // characters

//     if (!jobDescription || jobDescription.trim().length < MIN_JD_LENGTH) {
//   return res.status(400).json({
//     success: false,
//     message:
//       "Job description is too short. Please paste a complete job description for accurate analysis."
//   });
// }

//     if (!file || !jobDescription) {
//       return res.status(400).json({
//         message: "Resume file and Job Description are required",
//       });
//     }

//     /* ===== TEXT EXTRACTION ===== */
//     let resumeText = "";

//     if (file.mimetype === "application/pdf") {
//       resumeText = await extractPdfText(file.buffer);
//     } else if (
//       file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//     ) {
//       const result = await mammoth.extractRawText({ buffer: file.buffer });
//       resumeText = result.value;
//     } else {
//       return res.status(400).json({ message: "Unsupported file type" });
//     }

//     const resume = normalize(resumeText);
//     const jd = normalize(jobDescription);

//     /* ===== JD SKILLS (ONLY FROM JD) ===== */
//     const jdHardSkills = SKILLS.hard.filter((s) =>
//       exactSkillMatch(s, jd)
//     );
//     const jdTools = SKILLS.tools.filter((s) =>
//       exactSkillMatch(s, jd)
//     );
//     const jdSoftSkills = SKILLS.soft.filter((s) =>
//       exactSkillMatch(s, jd)
//     );

//     if (jdHardSkills.length + jdTools.length + jdSoftSkills.length < 3) {
//   return res.status(400).json({
//     success: false,
//     message:
//       "Job description does not contain enough skill keywords. Please paste a detailed JD."
//   });
// }


//     /* ===== RESUME MATCHING ===== */
//     const hardSkillsMatched = jdHardSkills.filter((s) =>
//       exactSkillMatch(s, resume)
//     );
//     const hardSkillsMissing = jdHardSkills.filter(
//       (s) => !exactSkillMatch(s, resume)
//     );

//     const toolsMatched = jdTools.filter((s) =>
//       exactSkillMatch(s, resume)
//     );
//     const toolsMissing = jdTools.filter(
//       (s) => !exactSkillMatch(s, resume)
//     );

//     const softSkillsMatched = jdSoftSkills.filter((s) =>
//       fuzzySoftSkillMatch(s, resume)
//     );
//     const softSkillsMissing = jdSoftSkills.filter(
//       (s) => !fuzzySoftSkillMatch(s, resume)
//     );

//     /* ===== SECTION CHECK ===== */
//     const missingSections = Object.entries(SECTION_ALIASES)
//       .filter(([_, aliases]) => !aliases.some((a) => resume.includes(a)))
//       .map(([section]) => section);

//     /* ===== SCORING ===== */
//     const totalJDSkills =
//       jdHardSkills.length + jdTools.length + jdSoftSkills.length;

//     const totalMatchedSkills =
//       hardSkillsMatched.length +
//       toolsMatched.length +
//       softSkillsMatched.length;

//     const searchabilityScore = totalJDSkills
//       ? Math.round((totalMatchedSkills / totalJDSkills) * 100)
//       : 0;

//     // const jobMatchScore = Math.min(100, Math.max(0, searchabilityScore));
//     /* ===== FIX OVERALL SCORE ===== */
// const hardSkillsScore =
//   jdHardSkills.length ? (hardSkillsMatched.length / jdHardSkills.length) * 100 : 100;
// const toolsScore =
//   jdTools.length ? (toolsMatched.length / jdTools.length) * 100 : 100;
// const softSkillsScore =
//   jdSoftSkills.length ? (softSkillsMatched.length / jdSoftSkills.length) * 100 : 100;
// // const missingSectionsScore = missingSections.length === 0 ? 100 : 80;
// const missingSectionsPenalty = missingSections.length * 10;
// const missingSectionsScore = Math.max(50, 100 - missingSectionsPenalty);

// /* Weighted overall score */
// let overallResumeScore = Math.round(
//   // 0.4 * searchabilityScore +
//   // 0.2 * hardSkillsScore +
//   // 0.15 * toolsScore +
//   // 0.15 * softSkillsScore +
//   // 0.1 * missingSectionsScore
//     0.45 * searchabilityScore +   // JD keyword alignment (MOST important)
//   0.25 * hardSkillsScore +      // core skills
//   0.15 * toolsScore +           // tools & tech
//   0.05 * softSkillsScore +      // soft skills (low weight)
//   0.10 * missingSectionsScore   // structure
// );

// if (searchabilityScore < 20) {
//   overallResumeScore = Math.min(overallResumeScore, 45);
// }

//     /* ===== RESPONSE ===== */
//     res.json({
//       success: true,
//       analysis: {
//         // overallResumeScore: jobMatchScore,
//         // searchabilityScore,
//            overallResumeScore,   // <-- use weighted score
//     searchabilityScore,   // <-- keep as-is

//         hardSkills: {
//           matched: hardSkillsMatched,
//           missing: hardSkillsMissing,
//         },

//         tools: {
//           matched: toolsMatched,
//           missing: toolsMissing,
//         },

//         softSkills: {
//           matched: softSkillsMatched,
//           missing: softSkillsMissing,
//         },

//         missingSections,

//         recruiterInsights: {
//           recruiterTimeSaved: `${100 - overallResumeScore}%`,
//           reason:
//             overallResumeScore < 50
//               ? "Low ATS match – missing JD skills"
//               : "Resume is recruiter-friendly",
//         },

//         improvementTips: [
//   ...(hardSkillsMissing.length
//     ? [
//         "Add missing technical skills explicitly mentioned in the job description",
//         "Ensure core technologies appear in both the Skills section and project experience",
//       ]
//     : [
//         "Technical skills are well-aligned with the job requirements",
//       ]),

//   ...(toolsMissing.length
//     ? [
//         "Mention tools, frameworks, and platforms used in real-world projects",
//         "Include tools within bullet points to strengthen ATS keyword density",
//       ]
//     : [
//         "Tools and technologies are clearly demonstrated through projects",
//       ]),

//   ...(softSkillsMissing.length
//     ? [
//         "Demonstrate soft skills using action-driven achievement statements",
//         "Show collaboration, ownership, or problem-solving through examples",
//       ]
//     : [
//         "Soft skills are subtly and effectively communicated",
//       ]),

//   "Start bullet points with strong action verbs (Built, Optimized, Implemented)",
//   "Quantify impact wherever possible (%, users, response time, revenue)",
//   // "Prioritize the most relevant experience in the top half of the resume",
//   // "Keep formatting ATS-safe: avoid tables, graphics, and heavy icons",
//   "Ensure consistent job titles and dates to improve recruiter readability",
// ],

//         // funInsight: `Add ${
//         //   hardSkillsMissing.length + toolsMissing.length
//         // } JD skills to improve match 🚀`,
//         funInsight:
//   hardSkillsMissing.length + toolsMissing.length === 0
//     ? "Perfect keyword alignment — your resume speaks the recruiter’s language"
//     : hardSkillsMissing.length + toolsMissing.length <= 2
//     ? "Almost there! A couple of well-placed keywords can make this resume shine"
//     : hardSkillsMissing.length + toolsMissing.length <= 5
//     ? "Good progress — adding a few more keywords could boost visibility"
//     : "Significant skill gaps detected — aligning closer to the JD will improve ATS performance",
//       },
//     });
//   } catch (error) {
//     console.error("Resume analysis failed:", error);
//     res.status(500).json({ message: "Resume analysis failed" });
//   }
// });

// export default router;



import express from "express";
import multer from "multer";
import mammoth from "mammoth";
import stringSimilarity from "string-similarity";

import { extractPdfText } from "../middlewares/pdfHelper.js";
import { SKILLS } from "../utils/skillList.js";

const router = express.Router();

/* ================= CONFIG ================= */
// const upload = multer({
//   storage: multer.memoryStorage(),
//   limits: { fileSize: 5 * 1024 * 1024 },
// });
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!allowedTypes.includes(file.mimetype)) {
      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Only PDF and DOCX files are allowed"
        )
      );
    }
    cb(null, true);
  },
});

/* ================= HELPERS ================= */
const normalize = (text) =>
  text
    .toLowerCase()
    .replace(/[-_.,]/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const SKILL_ALIASES = {
  html: ["html", "html5"],
  css: ["css", "css3"],
  javascript: ["javascript", "js", "es6"],
  react: ["react", "react.js"],
  node: ["node", "node.js"],
  express: ["express", "express.js"],
  "rest api": ["rest api", "restful api", "restful apis", "rest apis"],
};

const SECTION_ALIASES = {
  summary: ["summary", "career objective", "objective"],
  skills: ["skills", "key skills", "technical skills"],
  experience: ["experience", "project experience", "projects"],
  education: ["education", "academic background"],
};

const exactSkillMatch = (skill, text) => {
  const aliases = SKILL_ALIASES[skill] || [skill];
  return aliases.some((alias) => {
    const escaped = alias.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`\\b${escaped}\\b`, "i");
    return regex.test(text);
  });
};

const fuzzySoftSkillMatch = (skill, text) => {
  const skillWords = skill.split(" ");
  const textWords = text.split(" ");
  if (text.includes(skill)) return true;
  for (let i = 0; i <= textWords.length - skillWords.length; i++) {
    const phrase = textWords.slice(i, i + skillWords.length).join(" ");
    if (stringSimilarity.compareTwoStrings(skill, phrase) > 0.75) return true;
  }
  return false;
};

/* ================= ROUTE ================= */
// router.post("/analyze-resume", upload.single("resume"), async (req, res) => {

  router.post("/analyze-resume", (req, res) => { upload.single("resume")(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === "LIMIT_FILE_SIZE") {
        return res.status(400).json({
          success: false,
          message: "File too large. Max size allowed is 5MB.",
        });
      }

      return res.status(400).json({
        success: false,
        message: err.message || "Invalid file upload",
      });
    }

    if (err) {
      return res.status(400).json({
        success: false,
        message: "File upload failed",
      });
    }

    // ✅ YOUR EXISTING LOGIC CONTINUES HERE


  const { jobDescription } = req.body;
  const file = req.file;
  const MIN_JD_LENGTH = 100;

  // ==== 1. VALIDATIONS FIRST ====
  if (!file || !jobDescription) {
    return res.status(400).json({
      success: false,
      message: "Resume file and Job Description are required",
    });
  }

  if (jobDescription.trim().length < MIN_JD_LENGTH) {
    return res.status(400).json({
      success: false,
      message:
        "Job description is too short. Please paste a complete job description for accurate analysis.",
    });
  }

  // ==== 2. TEXT EXTRACTION ====
  let resumeText = "";
  try {
    if (file.mimetype === "application/pdf") {
      resumeText = await extractPdfText(file.buffer);
    } else if (
      file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ buffer: file.buffer });
      resumeText = result.value;
    } else {
      return res.status(400).json({ success: false, message: "Unsupported file type" });
    }
  } catch (error) {
    console.error("Text extraction failed:", error);
    return res.status(500).json({ success: false, message: "Resume text extraction failed" });
  }

  const resume = normalize(resumeText);
  const jd = normalize(jobDescription);

  // ==== 3. EXTRACT JD SKILLS ====
  const jdHardSkills = SKILLS.hard.filter((s) => exactSkillMatch(s, jd));
  const jdTools = SKILLS.tools.filter((s) => exactSkillMatch(s, jd));
  const jdSoftSkills = SKILLS.soft.filter((s) => exactSkillMatch(s, jd));

  if (jdHardSkills.length + jdTools.length + jdSoftSkills.length < 3) {
    return res.status(400).json({
      success: false,
      message:
        "Job description does not contain enough skill keywords. Please paste a detailed JD.",
    });
  }

  // ==== 4. RESUME MATCHING ====
  const hardSkillsMatched = jdHardSkills.filter((s) => exactSkillMatch(s, resume));
  const hardSkillsMissing = jdHardSkills.filter((s) => !exactSkillMatch(s, resume));

  const toolsMatched = jdTools.filter((s) => exactSkillMatch(s, resume));
  const toolsMissing = jdTools.filter((s) => !exactSkillMatch(s, resume));

  const softSkillsMatched = jdSoftSkills.filter((s) => fuzzySoftSkillMatch(s, resume));
  const softSkillsMissing = jdSoftSkills.filter((s) => !fuzzySoftSkillMatch(s, resume));

  // ==== 5. SECTION CHECK ====
  const missingSections = Object.entries(SECTION_ALIASES)
    .filter(([_, aliases]) => !aliases.some((a) => resume.includes(a)))
    .map(([section]) => section);

  // ==== 6. SCORING ====
  const totalJDSkills = jdHardSkills.length + jdTools.length + jdSoftSkills.length;
  const totalMatchedSkills = hardSkillsMatched.length + toolsMatched.length + softSkillsMatched.length;
  const searchabilityScore = totalJDSkills ? Math.round((totalMatchedSkills / totalJDSkills) * 100) : 0;

  const hardSkillsScore = jdHardSkills.length ? (hardSkillsMatched.length / jdHardSkills.length) * 100 : 100;
  const toolsScore = jdTools.length ? (toolsMatched.length / jdTools.length) * 100 : 100;
  const softSkillsScore = jdSoftSkills.length ? (softSkillsMatched.length / jdSoftSkills.length) * 100 : 100;
  const missingSectionsPenalty = missingSections.length * 10;
  const missingSectionsScore = Math.max(50, 100 - missingSectionsPenalty);

  let overallResumeScore = Math.round(
    0.45 * searchabilityScore +
      0.25 * hardSkillsScore +
      0.15 * toolsScore +
      0.05 * softSkillsScore +
      0.1 * missingSectionsScore
  );
  if (searchabilityScore < 20) overallResumeScore = Math.min(overallResumeScore, 45);

  // ==== 7. RESPONSE ====
  res.json({
    success: true,
    analysis: {
      overallResumeScore,
      searchabilityScore,
      hardSkills: { matched: hardSkillsMatched, missing: hardSkillsMissing },
      tools: { matched: toolsMatched, missing: toolsMissing },
      softSkills: { matched: softSkillsMatched, missing: softSkillsMissing },
      missingSections,
      recruiterInsights: {
        recruiterTimeSaved: `${100 - overallResumeScore}%`,
        reason:
          overallResumeScore < 50 ? "Low ATS match – missing JD skills" : "Resume is recruiter-friendly",
      },
      improvementTips: [
        ...(hardSkillsMissing.length
          ? [
              "Add missing technical skills explicitly mentioned in the job description",
              "Ensure core technologies appear in both the Skills section and project experience",
            ]
          : ["Technical skills are well-aligned with the job requirements"]),
        ...(toolsMissing.length
          ? [
              "Mention tools, frameworks, and platforms used in real-world projects",
              "Include tools within bullet points to strengthen ATS keyword density",
            ]
          : ["Tools and technologies are clearly demonstrated through projects"]),
        ...(softSkillsMissing.length
          ? [
              "Demonstrate soft skills using action-driven achievement statements",
              "Show collaboration, ownership, or problem-solving through examples",
            ]
          : ["Soft skills are subtly and effectively communicated"]),
        "Start bullet points with strong action verbs (Built, Optimized, Implemented)",
        "Quantify impact wherever possible (%, users, response time, revenue)",
        "Ensure consistent job titles and dates to improve recruiter readability",
      ],
      funInsight:
        hardSkillsMissing.length + toolsMissing.length === 0
          ? "Perfect keyword alignment — your resume speaks the recruiter’s language"
          : hardSkillsMissing.length + toolsMissing.length <= 2
          ? "Almost there! A couple of well-placed keywords can make this resume shine"
          : hardSkillsMissing.length + toolsMissing.length <= 5
          ? "Good progress — adding a few more keywords could boost visibility"
          : "Significant skill gaps detected — aligning closer to the JD will improve ATS performance",
    },
  });
  })});

export default router;
