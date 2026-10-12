const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserSetting } = require("../models");

// Generate JWT Token helper function
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "7d", // Token expires in 7 days
  });
};

// @desc    Register a new user
// @route   POST /api/v1/auth/register
// @access  Public
const register = async (req, res) => {
  try {
    const { name, email, password, timezone } = req.body;

    // Validate required fields
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Please provide all required fields (name, email, password).",
        });
    }

    // Check if user already exists
    const existingUser = await User.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, message: "Email is already registered." });
    }

    // Hash the password securely with bcrypt
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create the new user
    const newUser = await User.create({
      name,
      email,
      password_hash,
      timezone: timezone || "UTC",
    });

    // Automatically create default user settings record
    await UserSetting.create({
      user_id: newUser.id,
      preferred_language: "en",
      theme: "light",
      notifications_enabled: true,
    });

    // Generate token
    const token = generateToken(newUser.id);

    return res.status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      data: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        timezone: newUser.timezone,
      },
    });
  } catch (error) {
    console.error("Registration Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during registration." });
  }
};

// @desc    Authenticate user & get token (Login)
// @route   POST /api/v1/auth/login
// @access  Public
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide both email and password.",
        });
    }

    // Find user by email
    const user = await User.findOne({
      where: { email: email.toLowerCase().trim() },
    });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Compare submitted password with stored password hash
    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password." });
    }

    // Generate token
    const token = generateToken(user.id);

    return res.status(200).json({
      success: true,
      message: "Logged in successfully.",
      token,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        timezone: user.timezone,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error during login." });
  }
};

// @desc    Get current authenticated user profile
// @route   GET /api/v1/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    // req.user is attached by authMiddleware
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ["password_hash"] },
    });

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    return res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    console.error("GetMe Error:", error);
    return res
      .status(500)
      .json({ success: false, message: "Server error fetching profile." });
  }
};

module.exports = {
  register,
  login,
  getMe,
};
