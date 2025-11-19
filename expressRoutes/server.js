const express = require("express");
const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
	res.status(200).json({msg:"App is working"})
})

app.get("/users/get", (req, res) => {
  res.status(200).json({ "id": 1, "name": "a", "email": "aaaa@example.com" });
});


app.get("/users/list", (req, res) => {
  res.status(200).json([
    { "id": 1, "name": "a", "email": "aaaa@example.com" },
    { "id": 2, "name": "b", "email": "bbbb@example.com" },
    { "id": 3, "name": "c", "email": "ccc@example.com" }
  ]);
});

app.listen(7000,()=>{
	console.log("App is running on the port 7000")
})