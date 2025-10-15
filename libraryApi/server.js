const app = require("./app")
const connectDB = require("./config/db")

app.listen(3000, (req,res)=>{
    console.log("serving running on port 3000")
})