const express = require('express'),
    router = express.Router(),
    path = require('path'),
    fs = require('fs')

router.get('/', (req, res) => {
    res.render('delReserve')
})

module.exports = router