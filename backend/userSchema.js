const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    applications:[{
        accountID:String,
        fullname:String,
        passportNo:String,
        birthday:String,
        personalPhoto:String,
        passportPhoto:String,
        signature:String,
        expiry:String,
        location:String,
        dateCreated:Date,
        status:String,
        
    }]
})

module.exports = {userSchema}