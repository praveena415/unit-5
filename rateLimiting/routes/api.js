const express = require("express");
const rateLimiter = require("express-rate-limit");
const router = express.Router();

const accessLimiter = rateLimiter({
	windowMs: 1 * 60 * 1000,
	limit: 5,
	standardHeaders: 'draft-8',
	legacyHeaders: false,
	ipv6Subnet: 56
});

router.get("/open", (req, res) => {
	res.status(200).json({ msg: "This is an open endpoint!" });
});

router.get("/restricted", accessLimiter, (req, res) => {
	res.status(200).json({ message: "You have access to this restricted endpoint!" });
});

module.exports = router;
