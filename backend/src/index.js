const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()
const app = express()
require('./config/db')

const AuthData = require('./routes/Auth.routes')

app.use(cors(
{
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    sameSite: false,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/auth', AuthData)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})