const express = require("express");
const { signupUser, login } = require("../controllers/userController");
const userRouter = express.Router();
userRouter.post("/signup",signupUser)
userRouter.post("/login",login);
module.exports = userRouter;