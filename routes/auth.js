const express = require('express');
const passport = require('passport');
const router = express.Router();
const {OAuth2Client} =require('google-auth-library');
const { response } = require('express');
const GoogleUser = require("../models/GoogleUser")
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
//@desc Auth with Google
//@route GET /auth/google
router.get('/google',(req,res)=>{passport.authenticate('google'),{failureRedirect:'/'},(req,res)=>{
    //res.header("Access-Control-Allow-Origin", "*");
    res.send("Added Successfully");
     
     
 }
})

router.post('/google',(req,res)=>{
    const {tokenId} = req.body;
    //console.log(tokenId);
    client.verifyIdToken({idToken:tokenId,audience:process.env.GOOGLE_CLIENT_ID}).then(response=>{
        //console.log(response.payload)
        var googleUser = {
            googleId:response.payload.sub,
            firstName:response.payload.given_name,
            lastName:response.payload.family_name,
            displayName:response.payload.name,
            email:response.payload.email,
            image:response.payload.picture,
            profileType:"Google"
            
        }
        try{
            //console.log(googleUser)
            let user = GoogleUser.findOne({email:googleUser.email}).exec((err,user)=>{
                if(err){
                   console.log(err)
                    //googleUser =GoogleUser.create(googleUser).exec()
                }
                else{
                    if(user){
                        res.status(409).send("Not Adding to Database, Already Exists")
                    }
                    else{
                        googleUser =GoogleUser.create(googleUser)
                        res.status(200).send("Registered User Data")
                    }
                }
            })
            
        }
        catch(err){
            console.log(err)
        }
    })
    
})




//@desc Google Auth Callback - Redirect to home page on success full login, or to login page if error
//@route GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{

    
})

module.exports = router