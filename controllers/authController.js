import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateTokens } from "../utils/tokenUtils.js";

let refreshTokens = []; // Temporary in-memory store

// Register
export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || "user"
    });

    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });

    const { accessToken, refreshToken } = generateTokens(user);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Logout
export const logout = async (req, res) => {
  const { token } = req.body;
  refreshTokens = refreshTokens.filter(t => t !== token);
  res.json({ message: "Logged out successfully" });
};

// Refresh Token
export const refresh = async (req, res) => {
  const { token } = req.body;
  if (!token) return res.status(401).json({ message: "Refresh token required" });
  if (!refreshTokens.includes(token)) return res.status(403).json({ message: "Invalid token" });

  try {
    const decoded = verifyRefreshToken(token);
    const { accessToken, refreshToken } = generateTokens({ _id: decoded.id, role: decoded.role });
    res.json({ accessToken, refreshToken });
  } catch (error) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};
