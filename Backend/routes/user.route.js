const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { body } = require("express-validator");
const userMiddleware = require("../middlewares/user.middleware");

router.post(
  "/register",
  [
    body("name").isLength(2).withMessage("Name must be at least 2 characters"),
    body("email").isEmail().withMessage("Enter a Valid Email"),
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
    body("email").isEmail().withMessage("Enter a Valid Email"),
    body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
  ],
  userController.LoginUser
);

router.get("/getuser", userMiddleware.userAuth, userController.getUsers);
router.get("/getallusers",  userController.getalltUsers);

router.get('/logout', userMiddleware.userAuth , userController.LogoutUser)

module.exports = router;
