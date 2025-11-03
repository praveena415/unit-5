const express = require("express");
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure:true, 
  auth: {
    user: "praveenachintha@gmail.com",
    pass: "1234asdf",
  }
});


const userRouter = express.Router();
userRouter.get("/sendEmail",async (req,res)=>{

  try {
    const info = await transporter.sendMail({
      from: '"praveena" <praveenachintha@gmail.com>', 
      to: " praveenachintha@gmail.com",
      subject: "Hello",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent:", info.messageId);
    res.status(201).json({ Message: info.messageId });
  } catch (err) {
    console.error("Error sending mail:", err);
    res.status(500).json({ error: err.message });
  }
})

module.exports = userRouter;