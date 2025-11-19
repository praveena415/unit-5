const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

app.get("/test",(req,res)=>{
	res.status(200).json("Test of Dishes");
})

app.get("/getAllDishes",(req,res)=>{
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	let items = data.dishes;
	res.status(200).json({msg:"Dishes are here",items});
	console.log(items);
})

app.post("/addDish",(req,res)=>{
	let dat = req.body;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	let items = data.dishes;
	let idx = data.dishes.length;
	let newDish = {...dat,id:idx+1};
	items.push(newDish);
	fs.writeFileSync("./db.json",JSON.stringify(data))
	res.status(200).json({"msg":"New Dish Added"});
})

app.get("/dishes/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"))
	let items = data.dishes;
	let needed = items.filter(ele=>ele.id==id);
	if(needed.length===0){
		res.status(404).json({"error":"Id is  not Valid"})
	}
	else{
		res.status(200).json({"msg":"Your Dish","Dish":needed})
	}
})


app.put("/dishes/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
	let items = data.dishes;
	let updatedItem = req.body;
	let found = false;
	let updatedDishes = items.map((ele,idx)=>{
		if(ele.id == id){
			found=true;
			return {...ele,...updatedItem}
		}else return ele;
	})
	if(!found) res.status(404).json({"msg":"ID NOT DOUND"})
	data.dishes = updatedDishes;
	fs.writeFileSync("./db.json",JSON.stringify(data));
	res.status(200).json({"msg":"Data Updated","Data":updatedDishes})

})

app.delete("/deleteDish/:id",(req,res)=>{
	let id = req.params.id;
	let data = JSON.parse(fs.readFileSync("./db.json","utf-8"));
	let items = data.dishes;
	let found = false;
	let updatedDishes = items.filter((ele)=>{
		if(ele.id==id) found=true;
		return ele.id!=id;
	})
	if(!found) res.status(404).json({"msg":"ID NOT DOUND"})
	data.dishes = updatedDishes;
	fs.writeFileSync("./db.json",JSON.stringify(data));
	res.status(200).json({"msg":"Data Updated","Data":updatedDishes})

})

app.get("*",(req,res)=>{
	res.status(404).json({"error:":"404 NOT FOUND"});

})

app.listen(7002,()=>{
	console.log("App is working on 7002")
})