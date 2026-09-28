import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return res.status(400).json({ message: "username, email and password are required" });
  }

  const existingUser = await User.findOne({ $or: [{ username }, { email: email.toLowerCase() }] });
  if (existingUser) {
    return res.status(409).json({ message: "Username or email already exists" });
  }

  const user = await User.create({ username, email, password });
  res.status(201).json({
    message: "User registered",
    user: { _id: user._id, username: user.username, email: user.email, role: user.role },
  });
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "email and password are required" });
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user || !(await user.isPasswordCorrect(password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
  res.json({ message: "Logged in", token });
});
