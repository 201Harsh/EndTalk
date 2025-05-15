const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");

router.post(
  "/register",
  [
    body("name").isLength(2).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Email is required"),
    body("password")
      .isLength(6)
      .withMessage("Password must be at least 6 characters"),
    ,
  ],
  userController.RegisterUser
);

router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Email is required"),
    body("password").isLength({ min: 6 }).withMessage("Password is required"),
  ],
  userController.LoginUser
);

module.exports = router;
