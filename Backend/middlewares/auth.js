// const jwt = require("jsonwebtoken");
import jwt from 'jsonwebtoken';

function auth(req, res, next) {
  const token = req.cookies?.token;
  if (!token) {
    return res.status(401).send("unauthorized");
    // return res.redirect("/login");
  }

  try {
    //console.log("Token to verify:", token);

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; //it has value that is passed to generate token at the begining
    next();
  } catch (error) {
    return res.status(401).json({ error: error.message });
  }
}

export default auth;
