const jwt = require("jsonwebtoken")
const UserModel = require("../models/user.model")
require("dotenv").config()


const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log('Extracted Token:', token)
    
    if (!token) {
      return res.status(403).send({ message: "No token provided!" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await UserModel.findById(decoded._id);
    console.log('User Lookup for ID:', decoded._id);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    req.userid = decoded._id;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({ message: "Unauthorized!" });
  }
  return res.status(500).send({ message: error.message });

  }

}

module.exports = verifyToken;
