// // const jwt = require("jsonwebtoken");
// import jwt from 'jsonwebtoken';

// function auth(req, res, next) {
//     console.log("Auth middleware hit, cookies:", req.cookies);

//   const token = req.cookies?.token;
//   if (!token) {
//     return res.status(401).send("unauthorized");
//     // return res.redirect("/login");
//   }

//   try {
//     //console.log("Token to verify:", token);

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     console.log("Decoded token:", decoded);

//     req.user = decoded; //it has value that is passed to generate token at the begining
//     next();
//   } catch (error) {
//     return res.status(401).json({ error: error.message });
//   }
// }

// export default auth;


import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const auth = async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel
      .findById(decoded.id)
      .select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user; // ✅ full user object
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

export default auth;
