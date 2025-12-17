import express from "express";
import userModel from "../models/userModel.js";
// const { body, validationResult } = require("express-validator");
import { body, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import auth from "../middlewares/auth.js"; // ✅ IMPORT THIS

const router = express.Router();

router.get("/", (req, res) => {
  res.send("User route working");
});

//--------------------------------------REGISTER---------------------------
router.get("/register", (req, res) => {
  res.send("register route working");
});

router.post(
  "/register",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("email").trim().isEmail().withMessage("Invalid email format"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(error.array());
    }

    const { username, email, password } = req.body;

    const existingUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });
    if (existingUser) {
      const msg =
        existingUser.email === email
          ? "Email already registered"
          : "Username already registered";

      return res.status(400).json({
        success: false,
        message: msg,
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const user = await userModel.create({
      username,
      email,
      password: hashPassword,
    });

    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    // res.json(user);
    // res.redirect("/home");
    res.status(200).json({
      message: "register successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
);


//---------------------------UPDATE USER DETAILS-----------------------------

// router.get("/update/:id", (req, res) => {
//   //  console.log("auth user:", req.user);
//   res.render("updateUser", { userID: req.user.userID });
// });


router.put("/update", auth, async (req, res) => {
  try {
    const { username, password } = req.body;

    const updateData = {};

    if (username) updateData.username = username;
    if (password) updateData.password = await bcrypt.hash(password, 10);

    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      updateData,
      { new: true }
    );

    res.status(200).json({
      // message: "User updated successfully",
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
      },
    });
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

//---------------------------------------------LOGIN------------------------------------
router.get("/login", (req, res) => {
  // res.send("working register")
  res.send("login route working");
});

router.post(
  "/login",
  body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters"),

  body("password")
    .trim()
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  async (req, res) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).send(error.array());
    }

    const { username, password } = req.body;

    const user = await userModel.findOne({ username: username });

    if (!user) {
      return res.status(400).send("user or password must be incorrect");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).send("user or password must be incorrect");
    }
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.cookie("token", token);
    // res.send('logged in')
    // res.redirect("/home");
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  }
);
 
//-------------------------------AUTH CHECK---------------------

router.get("/me", auth, (req, res) => {
  res.status(200).json({
    user: req.user
  });
});

// ---------------------------LOGOUT-------------------------------
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out" });
});


export default router;
