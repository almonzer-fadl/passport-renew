require('dotenv').config()

const express = require('express')
const cors = require('cors')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const fs = require('fs')
const path = require('path')
const {userSchema} = require('./userSchema.js')

const app = express()
const PORT = 5000
const JWT_SECRET = process.env.JWT_SECRET 
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const MONGODB_URI = process.env.MONGODB_URI

mongoose.connect(MONGODB_URI)
.then(()=>console.log("connected to "+ MONGODB_URI))
.catch(err=>console.log(err))


const corsOptions = {
  origin: [
    'http://localhost:5173', // React dev server
    'http://localhost:5174', // Alternative React port
    'http://127.0.0.1:3000',
    // Add your production frontend URL when deployed
  ],
  credentials: true, // Allow cookies and authorization headers
  optionsSuccessStatus: 200 // For legacy browser support
};

app.use(cors(corsOptions));

app.use(express.json())

const User = mongoose.model('User',userSchema)

const findUSerByEmail = async(email)=>{
    return await User.findOne({email:email})
}
const findUSerByID = async(id)=>{
    return await User.findOne({_id:id})
}
const extractImageData = (imagePath)=>{
    const imageData = fs.readFileSync(path.join(__dirname, imagePath))
    return imageData
}

const authenticateToken = (req,res,next)=>{
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if(!token){
        return res.status(401).json({message:"Access token required"})
    }
    jwt.verify(token,JWT_SECRET, (err,user)=>{
        if(err){
            return res.status(403).json({message:"Invalid or expired"})
        }
        req.user = user
        next()
    })
}

app.post('/api/register', async(req,res)=>{
    try{
        const {username , email , password} = req.body
        if(!username || !email || !password) {
            return res.status(400).json({message:"All fields are required"})
        }
        if(await findUSerByEmail(email)){
            console.log("can not register user");
            return res.status(400).json({message:"User already exists"})
        }
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new User({username:username, email:email, password:hashedPassword})
        await newUser.save()
        
          const token = jwt.sign(
             { userId: newUser._id, username: newUser.username },
                JWT_SECRET,
                { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email
      }
    });


    }catch(err){
        console.log(err);
        
        return res.status(400).json({error: err})}
})

app.post('/api/login', async (req,res)=>{
   try{
     const {email, password} = req.body
    if(!email || !password){
        return res.status(400).json({message:"Email and password are required"})
    }
    const user = await findUSerByEmail(email)
    if(!user){
        return res.status(400).json({message:"Invalid credentials"})
    }
    if(!await bcrypt.compare(password,user.password)){
        return res.status(400).json({message:"Invalid credentials"})
    }
    const token = jwt.sign(
        {id:user._id, email: user.email},
        JWT_SECRET,
        {expiresIn:JWT_EXPIRES_IN}
    )

    res.json({
        message:"Login successful",
        token,
        user: {
            id:user._id,
            username: user.username,
            email: user.email
        }
    })
   }catch(error){
    console.log("Login error", error);
    
    return res.status(400).json({message:"Server error"})
   }
})

app.get('/api/verify-token', authenticateToken,async(req,res)=>{
    const user = await findUSerByID(req.user.id)
    if(!user){
        return res.status(404).json({message : "User not found"})
    }
    res.json({
        valid:true,
         user: {
            id:user.id,
            username: user.username,
            email: user.email
        }
    })
})

app.post('/api/create-app', async(req,res)=>{
    const {email,application} = req.body
    const user = await findUSerByEmail(email)
    console.log(`${user}: (${application})`)
     if(!user){
        return res.status(404).json({message : "User not found"})
    }
    const formatPhotoName = (extension)=>{
        return `${application.name.split(' ').join('_')}_${application.passportNo.split(" ").join("_")}_${extension}.png`
    }

    const newApplication = {
        accountID:user._id,
        name:application.name,
        passportNo:application.passportNo,
        birthdate:application.birthdate,
        personalPhoto:{
            filename: formatPhotoName("personal"),
            data:application.personalPhoto,
            ContentType:"Image/png"
        },
        passportPhoto:{
            filename: formatPhotoName("passport"),
            data:application.passportPhoto,
            ContentType:"Image/png"
        },
        signature:{
            filename: formatPhotoName("sign"),
            data:application.signature,
            ContentType:"Image/png"
        },
        expiryDate:application.expiryDate,
        dateCreated:new Date().toISOString(""),
        status:"pending",
    }
    user.applications.push(newApplication)
    await user.save()
    return res.status(200).json({message:`application:${application.name} was added to user with email ${email}` })

})

app.get('/api/user-applications', async(req,res)=>{
    const user = await findUSerByEmail(req.body.email)
    if(!user){
        return res.status(404).json({message : "User not found"})
    }
    const applications = user.applications
    return res.status(200).send(applications)

})



app.get('/api/all-applications', async(req,res)=>{
    const combinedApplications = await User.aggregate([
  // Step 1: Filter users with non-empty applications
  { $match: { "applications.0": { $exists: true } } },
  
  // Step 2: Unwind applications array
  { $unwind: "$applications" },
  
  // Step 3: Replace root with the application object
  { $replaceRoot: { newRoot: "$applications" } }
]);
if(!combinedApplications){
    return res.status(404).json({message:"No applications found"})
}
console.log(combinedApplications);
return res.status(200).send(combinedApplications)

})


app.listen(PORT,()=>{
    console.log("connected to server http://localhost:"+PORT)
})
