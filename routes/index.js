const express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs')



router.get('/', (req, res) => {
    // let filename = "lunch.json",
    // data = JSON.parse(fs.readFileSync(__dirname + `/../public/${filename}`), 'utf8')


    const menuData = req.collectionMenu.find({}).toArray().then(results =>
        res.render('index', { menuData: JSON.stringify(results[0]) }))




})
router.post('/:reserve', (req, res) => {
    //multiple http post can be implemented by an if statement of req.params
    //console.log(req.params) //{reserve:reserve} //mostly used for id specification
    console.log(req.body)
    const { reservationDate, time, name } = req.body
    if (!reservationDate || !time || !name) {
        return res.status(400).json({
            message: 'Reservation fields needs to be complete'
        })
    }

    const payload = { reservationDate, time, name }
    req.collectionReserve.insertOne(payload)
        .then(result => res.json(result.ops[0]))
        .catch(error => res.send(error))


    // console.log(">>>", "NOPE")
    return
})



module.exports = router