const express = require("express")
const router = express.Router()
const {body} = require('express-validator')
const {AddAuthor, ListAuthors} = require('../controllers/Author')
const AuthorModel = require("../Models/Author")

//add author
router.post('/author', [
    body('name').trim().not().isEmpty().withMessage('Name cannot be empty'),
    body('email').trim().not().isEmpty().withMessage('Email cannot be empty'),
    body('country').trim().not().isEmpty().withMessage('Country cannot be empty'),
    body('bookId').trim().not().isEmpty()
    .custom((value, {req}) =>{
        return AuthorModel.findOne({'bookId': value}).then(
            BookDoc =>{
                if (BookDoc) {
                    return Promise.reject('Sorry this Author already exit')
                }
            }
        )
    })
],AddAuthor)
//List authors
router.get('/author', ListAuthors)

module.exports = router;
