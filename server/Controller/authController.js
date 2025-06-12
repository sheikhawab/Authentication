import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import {
  loginHelper,
  generateTokenAndSetCookie,
} from "../Helpers/authHelper.js";



export const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ status: "error", message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    generateTokenAndSetCookie(user._id, res);

    res.status(201).json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User created and logged in successfully",
      
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};




export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    res.json({
      status: "success",
      data: users,
      message: "All users fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await loginHelper(email, password);

    generateTokenAndSetCookie(user._id, res);

    res.json({
      status: "success",
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      message: "User logged in successfully",
    });
  } catch (error) {
    res.status(401).json({ status: "error", message: error.message });
  }
};




export const logoutUser = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return res.status(200).json({
      status: "success",
      message: "User logged out successfully",
    });
  } catch (error) {
    return res.status(500).json({ status: "error", message: "Logout failed" });
  }
};
