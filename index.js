const {fetchFruit} = require('./fech-fruits')


const express = require('express')
const app = express() 
app.use(express.json())

require('dotenv').config()
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.info(`ready on port ${PORT}`)) 
app.get('/',(req,res) => {
    res.send('root path')
})
app.get('/os',(req,res) => {
    res.send(`node.js running on ${process.platform}`)
})
app.get('/fruit',(req,res) => {
    fetchFruit('banana')
        .then(result => res.send(result)) 
        .catch(err => console.log('err'))
})
app.get('/fruit/:id',(req,res) => {
    res.send(req.params)
})

