require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
require('./config/database').connect();
const express=require('express');
const User=require('./model/User');
const app=express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("server working")
})

//For user registration
app.post('/register',async(req,res)=>{
    try {
        const {first_name,last_name,email,password}=req.body;
        //checking user input
        if(!(email&&password&&first_name&&last_name)){
            res.status(400).send("All input is required");
        }

        //checking if user already exsits in database
        const oldUser=await User.findOne({email});
        if(oldUser){
            return res.status(409).send("User Already Exist. Please Login");
        }
        
        //encrypting the Password
        encryptedPassword=await bcrypt.hash(password,10);
        const user = await User.create({
            first_name,
            last_name,
            email: email.toLowerCase(),
            password: encryptedPassword,
          });

          //creating token
          const token =jwt.sign(
              {user_id:user._id,email},
              process.env.TOKEN_KEY,
              {
                  expiresIn:"2h",
              }
          );
          user.token=token
          res.status(201).json(user);
    }catch(err){
        console.log(err);
    }

});

//For user Login
app.post('/login',(req,res)=>{

});

module.exports=app;