const express = require('express')
const app = express();
const dotenv = require('dotenv').config()
const route = require('./routes/routes')
const {connectDB} = require('./config/database_connection')
const port = process.env.PORT || 3001
app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`)
    next()
})

connectDB();

app.use("/api",route)

app.listen(port, ()=>{
    console.log(`Port Listening to ${port}`)
})