const {validationResult} = require('express-validator')
const AuthorModel = require('../Models/Author')

const AddAuthor = (req, res) =>{

    //validation
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error)
        return res.json({message: error.array()[0].msg})
    }
    const {name, email, country,bookId} = req.body
    const author = new AuthorModel({name, email, country,bookId})


    author.save().then(result =>{
        if (result) {
            res.json({message: "Author Added", data: result})
        
        }
        else{
            res.json({message: "Fail to add Author"})
        }
    })
}
const ListAuthors = (req, res) =>{
    AuthorModel.find()
    .populate('bookId', 'title author description')
    .then(authors =>{{
        res.json({data: authors})
    }}).catch(err =>console.log(err))
}
module.exports = {
      AddAuthor,
      ListAuthors,
 }