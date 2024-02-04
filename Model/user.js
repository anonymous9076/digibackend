const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    dob: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
    },
    institute: {
        type: String,
        required: true,
    },
    qualification: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true,
        minLength:8
    },
    token:{
        type:String
    },
    profileImg:{
        type:String
    },
})
const newUserModel = mongoose.model('users' , userSchema); 
module.exports=newUserModel