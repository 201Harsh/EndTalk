const userModel = require("../models/user.model");
const userServices = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.RegisterUser = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    const IsUserExist = await userModel.findOne({ email });
    if (IsUserExist) {
      return res.status(400).json({
        message: "User already exist",
      });
    }

    const hashedPassword = await userModel.hashPassword(password);

    const Newuser = await userServices.CreateAUser({
      name,
      email,
      password: hashedPassword,
    });

    const token = Newuser.JWT_VERIFY();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User created successfully",
      Newuser,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.LoginUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const User = await userModel.findOne({ email });

    if (!User) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isMatched = User.ComparePassword(password);

    if (!isMatched) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = User.JWT_VERIFY();

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "User logged in successfully",
      User,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getalltUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    res.status(200).json({
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.getUsers = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "Users fetched successfully",
      user,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports.LogoutUser = async (req, res) => {
  try {
    res.clearCookie("token");
    res.status(200).json({
      message: "User logged out successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
