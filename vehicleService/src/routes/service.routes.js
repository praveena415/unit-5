const express = require("express")
const router = express.Router()

const {bookService, getAllBookings} = require("../controllers/service.controllers")
const auth = require("../middlewares/auth.middleware")

router.post("/book",auth,bookService)
router.get("/mybooking",auth,getAllBookings)

module.exports = router 