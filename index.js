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
app.get('/fruit/:fruitName-:time([0-9]+)',async(req,res) => {
    const {fruitName,time} = req.params 
    console.log(`fetching ${fruitName}`)
    
    await fetchFruit(fruitName,time)
        .then(fruit => res.send(fruit)) 
        .catch(err => res.send(`😭${err}`)) 
    console.log(`fetch complete`)  
})
app.get('/fruit/:fruitName',(req,res) => {
    const {fruitName } = req.params  
    fetchFruit(fruitName)
        .then(result => res.send(result)) 
        .catch(err => res.send(`😭${err}`))
})
app.get('/drink/:fruitA.:fruitB/:time?',async(req,res) => {
    const { fruitA, fruitB } = req.params 
    const { time } = req.query 
    const a = fetchFruit(fruitA ,time)
    const b = fetchFruit(fruitB,0) 
    if (time < 2000) {
        Promise.race([a,b]).then(drink => res.send(drink))
        .catch(err => res.send(`😭${err}`)) 
    } else {
        Promise.all([a,b]).then(drink => res.send(drink))
        .catch(err => res.send(`😭${err}`)) 
    }  
})
app.post('/fruit', (req,res) => {  
    for (const key in req.body) {
        console.log(`${key}:${req.body[key]}`);
    }
    res.send('test res')
})
// TODO: add auth
app.all('/*',(req,res) => {
    res.send('you shouldnt be here')
})