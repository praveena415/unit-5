const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

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

app.get("/test",async(req,res)=>{
	await res.json({Message:"Node mailer is working!"})
})

app.get("/sendemail", async (req, res) => {
  try {
    const info = await transporter.sendMail({
      from: '"masai Student" <praveenachintha@gmail.com>', 
      to: "praveenachintha194@gmail.com", 
      subject: "Testing Mail - NEM Student",
      text: "This is a testing Mail sent by NEM student, no need to reply.",
    });

    res.json("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Failed to send email.");
  }
});

app.listen(4000, () => {
  console.log(`Server running on 4000`);
});