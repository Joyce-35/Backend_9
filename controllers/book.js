
const AuthorModel = require('../Models/Author')
const {validationResult} = require('express-validator')
const BookModel= require('../Models/Books')

const viewbook = (req, res) =>{
    //listbooks
    const {id} =req.params
    if (id) {
        BookModel.find({author:id}).then( books =>{
            res.json({data: books})
        }).catch(err =>console.log(err))
    } else {
        BookModel.find().then( books =>{
            res.json({data: books})
        }).catch(err =>console.log(err))
    }

   
}
const createbook = (req, res) =>{
    //createbooks
    //validation
    const error = validationResult(req)
    if (!error.isEmpty()) {
        console.log(error)
        return res.json({message: error.array()[0].msg})
    }
    const {title, author, description} = req.body
    const book = new BookModel({title, author, description})
    book.save().then(result =>{
        res.json({message: 'create successful', data: result})
    }).catch(err =>console.log(err))
   
}

const updatebook = (req, res) =>{
    //updatebooks
    const {id, title, author, description} = req.body
    BookModel.findById(id).then(book =>{
        if (book) {
            book.title = title
            book.author = author
            book.description = description

            book.save()

            res.json({message: "update Successfull", data: book})

        }
        res.json({message: "Book Cannot be found"})
    }).catch(err =>console.log(err))

}

const deletebook = (req, res) =>{
    //deletebooks
    const {id} = req.body
     BookModel.findByIdAndRemove(id).then(deletedbook =>{
    if (deletedbook) {
        AuthorModel.deleteMany({bookId: deletedbook._id}).then(result =>{
            res.json({message: "book deleted", data: deletedbook})
        }).catch(err =>console.log(err))
        
        return
    }
    res.json({message: "Book Cannot be found"})
   }).catch(err =>console.log(err))

}
module.exports = {
    viewbook,
     createbook,
    updatebook,
      deletebook,
 }