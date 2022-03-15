const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const bcrypt = require("bcrypt");


router.post('/add',async function(req, res){
    const salt = await bcrypt.genSalt(10)
    var manualUser = {
      userId:new mongoose.Types.ObjectId().toString(),
      firstName:req.body.newUserData.firstName,
      lastName:req.body.newUserData.lastName,
      email:req.body.newUserData.email,
      password:await bcrypt.hash(req.body.newUserData.password,salt),
      profileType:"Manual"
    }
    //console.log(manualUser)
    try
    {
    //console.log(manualUser.email)
    let user =await User.findOne({email:manualUser.email}).exec(async (err,user)=>{
                if(err){
                    console.log(err)    
                    //console.log('Inside IF')
                    //googleUser =GoogleUser.create(googleUser).exec()
                }
                else{
                    
                    if(user){
                        //console.log('Found User')
                        res.status(409).send("Not Adding to Database, Already Exists")
                    }
                    else{
                        //console.log('User Not Found',res)
                        manualUser = await User.create(manualUser)
                        res.status(200).send("Registered User Data")
                    }
                }
                })
    
    }
    catch(err){
        console.log(err)
    }

    });

router.post('/login',async function(req,res){
    try{
        console.log(req.body.loginData.email)
        let user =await User.findOne({email:req.body.loginData.email}).exec(async (err,user)=>{
            if(err){
                console.log(err)
                //googleUser =GoogleUser.create(googleUser).exec()
            }
            else{
                if(user){
                    console.log('Found User\n')
                  

                    //Check Hashed Passwords
                    console.log(user.password)
                    console.log(req.body.loginData.password)
                    const validPassword =await bcrypt.compare(req.body.loginData.password,user.password);
                    console.log(validPassword)
                    if(validPassword){
                        console.log("User Login Successful")
                        res.status(200).send('Login Successful!')
                    }
                    else{
                        console.log("Password Mismatch")
                        res.status(401).send("Password is incorrect")
                    }
                }
                else{
                    //console.log('User Not Found',res)
                    res.status(404).send('Email not registered')
                }
            }
        })
    }
    catch(err){
        console.log(err)
    }

});
      
  
module.exports = router;