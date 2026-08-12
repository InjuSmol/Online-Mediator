import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
//import cloudinary from "../lib/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";

import { config } from "dotenv";


export const signup = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  try {
    if (!fullName || !email || !phone || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPhone = phone.trim();

    /*
     * Check BOTH email and phone.
     */
    const existingUser = await User.findOne({
      $or: [
        { email: normalizedEmail },
        { phone: normalizedPhone },
      ],
    });

    if (existingUser) {
      if (existingUser.email === normalizedEmail) {
        return res.status(400).json({
          message: "Email already exists",
        });
      }

      if (existingUser.phone === normalizedPhone) {
        return res.status(400).json({
          message: "Phone number already exists",
        });
      }
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(
      password,
      salt
    );

    const newUser = new User({
      fullName,
      email: normalizedEmail,
      phone: normalizedPhone,
      password: hashedPassword,

      phoneVerified: false,
      emailVerified: false,
    });

    /*
     * Save FIRST.
     */
    await newUser.save();

    /*
     * For now we're keeping your existing login behavior.
     *
     * When we implement verification, I recommend moving
     * token generation until AFTER required verification.
     */
    generateToken(newUser._id, res);

    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      email: newUser.email,
      phone: newUser.phone,

      emailVerified: newUser.emailVerified,
      phoneVerified: newUser.phoneVerified,

      profilePic: newUser.profilePic,
    });
  } catch (error) {
    console.log(
      "Error in signup controller:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    generateToken(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      phone: user.phone,

      phoneVerified: user.phoneVerified,
      emailVerified: user.emailVerified,

      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(
      "Error in login controller:",
      error.message
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;
    const userId = req.user._id;

    if (!profilePic) {
      return res.status(400).json({ message: "Profile pic is required" });
    }
    config();

    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
    const uploadResponse = await cloudinary.uploader.upload(profilePic);
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true }
    );

    res.status(200).json(updatedUser);
  } catch (error) {
    console.log("error in update profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
