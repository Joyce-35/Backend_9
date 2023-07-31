//require express and bodyparser
const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const AuthorRoutes = require('./routes/Author')
const BookRoutes = require('./routes/book')

//create instances
const app = express()


//middlewares
app.use(bodyParser.json())

//routes
app.use(AuthorRoutes);
app.use(BookRoutes);

//port
mongoose.connect(
    "mongodb+srv://Joyce:joyce1355@cluster0.mceuxxy.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(result => {
    app.listen(3000, function () {
        console.log("server started on port 3000")
    })
}).catch(err => console.log(err))

