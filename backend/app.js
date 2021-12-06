require("dotenv").config();
const bcrypt = require('bcryptjs');
const jwt= require('jsonwebtoken')
require('./config/database').connect();
const auth = require("./middleware/auth");
const express=require('express');
const User=require('./model/User');
const app=express();

app.use(express.json());
app.get('/',(req,res)=>{
    res.send("server working")
})

app.post("/welcome", auth, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

//For user registration
app.post('/api/register',async(req,res)=>{
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
          const userData={
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            token:token
          }
          res.status(201).json(userData);
    }catch(err){
        console.log(err);
    }

});

//For user Login
app.post('/api/login',async(req,res)=>{
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
          res.status(400).send("All input is required");
          return;
        }
        // check if user exist in our database
        const user = await User.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
          const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
          );
          user.token = token;
          const userData={
            first_name:user.first_name,
            last_name:user.last_name,
            email:user.email,
            token:token
          }
          res.status(200).json(userData);
        }else{
        res.status(400).send("Invalid Credentials");
        }
      } catch (err) {
        console.log(err);
      }

});

//For updating user data to add Fav pokemon
app.post('/api/update',auth,(req,res)=>{
    try{
      const {data,email}=req.body;
      User.collection.updateOne({email:email},
        {
          $push : {
            favourite :{
                  "pokeName":data.pokeName,
                  "url":data.url,
                  "id":data.id
                }
            }
        });
        res.status(200).send("Updated")
    }
    catch(err){
      console.log(err);
    }
});

//For fetching Fav pokemon
app.post('/api/fetchFavPokemon',auth,async(req,res)=>{
  try{
    const {email}=req.body;
    const user = await User.findOne({email});
    res.status(200).json(user.favourite);
  }catch(err){
      console.log(err);
  }
});

//For removing Fav pokemon
app.post('/api/removeFavpokemon',auth,(req,res)=>{
      console.log("in")
      try{
        const {data,email}=req.body;
        User.collection.updateOne({email:email},
          {
            $pull : {
              favourite :{
                "pokeName":data.pokeName,
                  "url":data.url,
                  "id":data.id
              }
              }
          });
          res.status(200).send("Updated")
      }catch(err){
        console.log(err)
      }
});

module.exports=app;