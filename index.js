const { fetchFruit } = require('./fetch-fruits')


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
        .catch(err => res.send(`😭${err}`))
})
app.get('/fruit/:fruitName-:time([0-9]+)',async(req,res) => {
    const {fruitName,time} = req.params 
    console.log(`fetching ${fruitName}`)
    await fetchFruit(fruitName,time)
        .then(fruit => res.send(fruit)) 
        .catch(err => res.send(`😭${err}`)) 
    console.log(`fetch complete`)
    
})
// app.all('/*',(req,res) => {
//     res.send('you shouldnt be here')
// })

// TODO: move to 'fetch-fruits' module
const makeDrink = async() => { 
    await fetchFruit('lemon',2000).then(res => console.log(res))
    fetchFruit('banana',0).then(res => console.log(res)) 
}

// makeDrink() 

