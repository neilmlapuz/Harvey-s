const express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs'),
    mongo = require('mongodb').MongoClient,
    assert = require('assert'),
    url = 'mongodb://localhost:27017'


router.get('/', (req, res) => {
    // let filename = "lunch.json",
    // data = JSON.parse(fs.readFileSync(__dirname + `/../public/${filename}`), 'utf8')

    mongo.connect(url, (err, client) => {
        assert.equal(null, err)
        console.log("Success Server Connection")

        let db = client.db('HarveyResto')

        db.collection('menu').find().toArray((err, data) => {
            assert.equal(null, err)
            menuData = data[0]

            client.close()

            res.render('index', { menuData: JSON.stringify(data[0]) })
        })
    })
})

module.exports = router