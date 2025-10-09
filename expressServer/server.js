const express = require("express");

const app = express();

app.get("/home",(req,res)=>{
	res.send("<h1>Welcome to Home Page<h1>");
})
app.get("/aboutus",(req,res)=>{
res.json({"message":"Welcome to About US"});
})

app.get("/contactus",(req,res)=>{
	let phone = "902345677";
	let email = "Sample.email.com"

	res.send(`<h3>Phone:${phone}</h3></br><h2>Email to :${email}</h2>`)
})

app.use("*",(req,res)=>{
res.status(404).json({ error: "Invalid route" });
})


app.listen(7001,()=>{
	console.log("App is listening to 7001 port");
})