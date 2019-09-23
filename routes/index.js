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
    if (!checkInputDate(reservationDate) || !time || !name) {
        console.log("REACHED")
        return res.status(400).json({
            message: 'Reservation fields needs to be complete'
        })
    }

    const payload = { reservationDate, time, name }

    req.collectionReserve.insertOne(payload)
        .then(result => {
            console.log("OK GOOD")
            res.status(200).json({ message: 'Thank you!' })
        })    //returns payload to client
        
        .catch(error => res.send(error))


})

const checkInputDate = (inputDate) => {
    //0[1-9]$|1[0-9]$|2[0-9]$|3[0-1]$\/0[1-9]$|1[0-2]$\/
    //remove partial match with -- $ (End String)
    let dateFormat = (/^(0[1-9]|1[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])$/g)

    if (inputDate.match(dateFormat)) {

        let inputDateArr = inputDate.split('/').map(val => parseInt(val))
        inputDateArr.push(2019)
        const [day, month, year] = inputDateArr

        const dateReserve = new Date(year, (month - 1), day),
            dateCurrent = new Date()
        if (dateReserve > dateCurrent) {
            return inputDateArr.join("/")
        }
        return "" //enter date after current time
    }
    return "" //enter date with the correct format
}


// AIzaSyDotkKLJ3cA6UTswoSGF7pqB-M5eioGu8U

module.exports = router