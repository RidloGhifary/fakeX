const User = require("../models/User.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const SignUp = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty())
    return res.status(400).json({ message: errors.array() });

  let { username, email, password, dateOfBirth } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: email }, { username, username }],
    });

    if (user)
      return res.status(400).json({ message: "User or email already exist" });

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      dateOfBirth,
    });

    await newUser.save();

    res.status(201).send({ message: "User created successful" });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

const SignIn = async (req, res) => {
  let { username, password } = req.body;

  try {
    // TODO - CHECK USERNAME EXISTED
    const currentUser = await User.findOne({ username: username });
    if (!currentUser)
      return res.status(404).json({ message: "Cannot find username" });

    const validatePassword = bcrypt.compareSync(password, currentUser.password);
    if (!validatePassword)
      return res.status(401).json({ message: "Wrong credentials" });

    const token = jwt.sign({ id: currentUser._id }, process.env.JWT_SECRET);

    const { password: pass, ...others } = currentUser._doc;

    res.cookie("auth_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(200).json(others);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { SignUp, SignIn };
