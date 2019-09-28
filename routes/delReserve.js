const express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs')

router.get('/', (req, res) => {
    res.render('delReserve')
})

router.post('/:delRes', (req, res) => {
    const { name } = req.body
    if (!name) {
        console.log("REACHED")
        return res.status(400).json({
            message: 'Name field should be completed'
        })
    }


    req.collectionReserve.deleteOne({ name: name })
        .then(result => {
            console.log("OK GOOD")
            res.status(200).json({ message: 'Reservation Deleted' })
        })

        .catch(error => res.send(error))
})

module.exports = router