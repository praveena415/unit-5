const mongoose = require("mongoose");
const express = require("express");
const connectToDB = require("./db");
const userRouter = require("./userRoutes");

const app = express();
app.use(express.json());
connectToDB()

app.get("/test",(req,res)=>{
	res.status(200).json({message:"App is teking"});

})
app.use("/users",userRouter);


app.use((req,res)=>{
	res.status(404).json({Error:"Route is not defined!"});
})

app.listen(7000,()=>{
	console.log("App is working on the route 7000")
})