const express = require("express");
const { signup, login, forgotPassowrd, resetPassword, forgotPasswordLimiter } = require("../controllers/userControllers");
const userRouter = express.Router();

userRouter.post("/signup",signup);
userRouter.post("/login",login)
userRouter.post("/forgotPassword",forgotPasswordLimiter,forgotPassowrd)
userRouter.post("/resetPassword",resetPassword)
module.exports = userRouter;