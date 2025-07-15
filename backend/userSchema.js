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
        name:String,
        passportNo:String,
        birthdate:String,
        personalPhoto:{
            filename:String,
            data:String,
            ContentType:String
        },
        passportPhoto:{
            filename:String,
            data:String,
            ContentType:String
        },
        signature:{
            filename:String,
            data:String,
            ContentType:String
        },
        expiryData:String,
        dateCreated:Date,
        status:String,
        
        
    }]
})

module.exports = {userSchema}