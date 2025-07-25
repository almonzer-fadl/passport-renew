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
        fullnameEn:String,
        fullnameAr:String,
        passportNo:String,
        nationalNo:String,
        birthday:String,
        birthPlace:String,
        personalPhoto:String,
        passportPhoto:String,
        signature:String,
        expiryDate:String,
        issueDate:String,
        gender:String,
        location:String,
        dateCreated:Date,
        status:String,
        
    }]
})

module.exports = {userSchema}