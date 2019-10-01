const express = require('express'),
    app = express(),
    path = require('path'),
    bodyParser = require('body-parser'),
    mongo = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb+srv://nml:Shippuden14@harveycluster-gpldz.mongodb.net/test?retryWrites=true&w=majority'



//middleware
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

//use json as response
app.use(bodyParser.json())
//allows parsing of the post data
app.use(bodyParser.urlencoded({ extended: false }))


mongo.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    assert.equal(null, err)
    console.log("Success Server Connection")

    const db = client.db('HarveyResto'),
        collectionMenu = db.collection('menu'),
        collectionReserve = db.collection('reserve')

    app.locals['menu'] = collectionMenu
    app.locals['reserve'] = collectionReserve


})

app.use((req, res, next) => {
    const collectionMenu = req.app.locals['menu'],
        collectionReserve = req.app.locals['reserve']
    req.collectionMenu = collectionMenu
    req.collectionReserve = collectionReserve
    next()
})

app.use('/', require('./routes/index'))
app.use('/delReserve', require('./routes/delReserve'))



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening in ${port}`)
})