const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')
dotenv.config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    profilePic: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"
    },
    facebookId: { 
        type: String, 
        unique: true,
        sparse:true,

    },
    googleId: { 
        type: String, 
        unique: true,
        sparse:true,
    },
    githubId: { 
        type: String, 
        unique: true,
        sparse:true,

    },
}, { timestamps: true })
    
const User = mongoose.model('User', userSchema)
module.exports = User
