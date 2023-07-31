const express = require("express")
const router = express.Router()
const {body} = require('express-validator')
const {createbook,viewbook, updatebook,deletebook,} = require('../controllers/book')
const BookModel = require("../Models/Books")

//view books
router.get('/book/:id?',viewbook)
//create books
router.post('/book', [

    body('author').trim().not().isEmpty().withMessage('Author cannot be empty'),
    body('description').trim().not().isEmpty().withMessage('Book description cannot be empty'),
    body('title').trim().not().isEmpty()
    .custom((value, {req}) =>{
        return BookModel.findOne({'title': value}).then(
            BookDoc =>{
                if (BookDoc) {
                    return Promise.reject('Book title already taken')
                }
            }
        )
    })
], createbook)
//update
router.put('/book',updatebook)
//delete
router.delete('/book',deletebook)


module.exports = router;