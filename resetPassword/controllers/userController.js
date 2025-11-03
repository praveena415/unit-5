const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const userModel = require("../models/userModels");
const saltRounds = 10;
const rateLimit = require("express-rate-limit");
const forgotPasswordLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: "Too many password reset requests, please try later.",
});

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: "praveenachintha@gmail.com",
    pass: "1234asdf",
  },
  tls: {
    rejectUnauthorized: false, 
  },
});

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        if (err) {
        res
          .status(404)
          .json({ Error: "Error in registering the user", errr: err.message });
      } else {
        await userModel.create({ name, email, password: hash });
        res.status(201).json({ Message: "User Registered Succesfully", name });
      }
    });
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Error in registering the user", Err: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ Error: "USer is not registered,please register" });
    }
    let hash = user.password;
    bcrypt.compare(password, hash, async function (err, result) {
      if (result == true) {
        let token = jwt.sign({ userId: user._id }, "praveena");

        res.status(202).json({ Message: "USer Logged in Succesfully", token });
      } else {
        res.status(404).json({ Error: "Wrong Password!!!!" });
      }
    });
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Error in logging the user", errr: err.message });
  }
};

const forgotPassowrd = async (req, res) => {
  try {
    const { email } = req.body;
    let user = await userModel.findOne({ email });
    if (!email) {
      return res.status(404).json({ Error: "USer is not valid" });
    } else {
      let resetToken = jwt.sign({ userId: user._id }, "praveena", {
        expiresIn: 3000,
      });
      const info = await transporter.sendMail({
        from: '"praveena" <praveenachintha@gmail.com>',
        to: " venugopal.burli@masaischool.com",
        subject: "Password Reset",
        html: `<b>Hello ${user.name}</b> <br/>`, 
      });

      console.log("Message sent:", info.messageId);
      let resetPassLink = `http://localhost:7000/users/resetPassword?token=${resetToken}`;
      res
        .status(202)
        .json({ Message: "Reset PAssword Link was shared!!", resetPassLink });
    }
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Error in Resetting your password", errr: err.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    let { token } = req.query;
    let decoded = jwt.verify(token, "Mahesh");
    if (decoded) {
      const { newPassword } = req.body;
      let user = await userModel.findById(decoded.userId);
      bcrypt.hash(newPassword, saltRounds, async function (err, hash) {
        if (err) {
          return res
            .status(404)
            .json({
              MEssage: "Error in Resetiig the password",
              errr: err.message,
            });
        } else {
          user.password = hash;
          await user.save();
          return res
            .status(200)
            .json({ Message: "PAssword Resetted Succesfully" });
        }
      });
    }
  } catch (err) {
    res
      .status(404)
      .json({ Error: "Error in restting the password", erro: err.message });
  }
};

module.exports = {
  signup,
  login,
  forgotPassowrd,
  resetPassword,
  forgotPasswordLimiter,
};
