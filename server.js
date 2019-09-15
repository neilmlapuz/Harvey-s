const express = require('express'),
    app = express(),
    path = require('path')

//middleware
app.use(express.static(__dirname + '/public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')


app.use('/', require('./routes/index'))



const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`listening in ${port}`)
})