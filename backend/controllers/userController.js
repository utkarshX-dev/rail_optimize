const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const wrapAsync = require("../utils/wrapAsync.js");
const User = require("../models/userModel.js");

const generateToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

const loginUser = wrapAsync(async (req, res) => {
  const { email, name, password, googleId } = req.body;

  let user = await User.findOne({ email });

  if (!user) {
    let passwordHash = null;
    if (password) passwordHash = await bcrypt.hash(password, 10);

    user = new User({
      name,
      email,
      password: passwordHash,
      googleId: googleId || undefined, 
    });

    await user.save();
  } else {
    if (password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return res.status(401).json({ message: "Invalid credentials" });
    }
    if (googleId && !user.googleId) {
      user.googleId = googleId;
      await user.save();
    }
  }

  const token = generateToken(user);
  res.json({ token, user, message: "Logged in successfully" });
});

module.exports = { loginUser };
