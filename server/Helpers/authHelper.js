import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const generateTokenAndSetCookie = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.SECRET_KEY, {
    expiresIn: "15d",
  });

  res.cookie("jwt", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV !== "development", 
    sameSite: "None", 
    maxAge: 15 * 24 * 60 * 60 * 1000, 
  });
};

export const loginHelper = async (email, password) => {
  
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("User nahi mila ya email ghalat hai");
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error("Ghalat password");
  }

  return user;
};
