const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser')



//middleware
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//use json as response
app.use(bodyParser.json())
//allows parsing of the post data
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/', require('./routes/index'))






const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening in ${port}`)
})