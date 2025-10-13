const express = require("express");
const server = express();
const rateLimiter = require("express-rate-limit");
const router = require("./routes/api");

server.use(express.json());

server.use("/check", (req, res) => {
	res.json("Server check is working!");
});

server.use("/data", router);

server.use((req, res) => {
	res.status(404).json({ error: "404 Resource Not Found" });
});

server.listen(7000, () => {
	console.log("Rate limiter active on port 7000");
});
