const express = require('express')
const app = express();
const dotenv = require('dotenv').config()

const port = process.env.PORT || 3001
app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})

app.get('/api/home',(req,res)=>{
    res.send("Welcome To Bottle Production Suite (BPS)")
})

app.listen(port, ()=>{
    console.log(`Port Listening to ${port}`)
})