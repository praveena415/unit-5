const Author = require("../models/authorModel")
const Book = require("../models/bookModel")

exports.createAuthor = async(req, res)=>{
    try {
        const author = await Author.create(req.body)
        res.status(200).json(author)
    } catch (error) {
        res.status(404).json({error:error.message})
    }
}
