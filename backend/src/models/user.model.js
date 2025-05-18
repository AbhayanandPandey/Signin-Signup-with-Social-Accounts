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
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://tse4.mm.bing.net/th?id=OIP.hGSCbXlcOjL_9mmzerqAbQHaHa&pid=Api&P=0&h=180"
    },
}, { timestamps: true })

userSchema.pre("save", async function(next){
    if(this.isModified("password"))
        {
            console.log(this.password)
            this.password =await bcrypt.hash(this.password,10)
            console.log(this.password)
        }
        next()
    })
    
const User = mongoose.model('User', userSchema)
module.exports = User
