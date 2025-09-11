const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const verifyToken = require('../middlewares/verifyToken')
const generateAuthToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '7d' });
  return token;
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = generateAuthToken(user);
  res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists." });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ name, email, password: hashedPassword, role: 'user' });
  await user.save();
  const token = generateAuthToken(user);
  res.status(201).json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

const adminLogin = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email, role: 'admin' });
  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  if(user.role !== 'admin' || user.password !== password) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.status(200).json({ user: { id: user._id, name: user.name, email: user.email, role: user.role } });
};

const getUsers = async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  if (user.role !== 'admin') {
    return res.status(403).json({ message: "Access denied" });
  }
  const users = await User.find({ role: 'user' }).select('-password');
  return res.status(200).json(users);
};

module.exports = { login, register, getUsers, adminLogin };