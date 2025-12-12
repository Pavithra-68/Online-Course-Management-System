const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

// Generate token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// REGISTER
exports.register = async (req, res, next) => {
  console.log("REGISTER HIT", req.body);
  try {
    const { name, email, password, role } = req.body;

    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ message: "Email already exists" });

    const user = await User.create({ name, email, password, role });

    res.json({
      message: "Registration successful",
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
};

// LOGIN
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Email Not Exist" });

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    res.json({
      message: "Login successful",
      token: generateToken(user._id),
      role:user.role
    });
  } catch (error) {
    next(error);
  }
};

// GET LOGGED-IN USER INFO (role, name, email)
exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    next(error);
  }
};
