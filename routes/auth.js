const express = require('express');
const passport = require('passport');
const router = express.Router();
const {OAuth2Client} =require('google-auth-library');
let jwt = require('jsonwebtoken')
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
            profileType:"Google",
            userType:"Customer"
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
                        let token = jwt.sign({email:googleUser.email},process.env.JWT_SECRET,{expiresIn:'12h'});
                        res.cookie("Access_Token",token,{httpOnly:true,secure:true,expires:new Date(Date.now() + 900000)}).status(409).json(
                            {
                                success: true,
                                firstName:googleUser.firstName,
                                lastName:googleUser.lastName,
                                userType:googleUser.userType,
                                message:'Authentication Successful!'
                            }
                        )
                    }
                    else{
                        let token = jwt.sign({email:googleUser.email},process.env.JWT_SECRET,{expiresIn:'12h'});
                        googleUser =GoogleUser.create(googleUser)
                        res.cookie("Access_Token",token,{httpOnly:true,secure:true,expires:new Date(Date.now() + 900000)}).status(200).json(
                            {
                                success: true,
                                firstName:response.payload.given_name,
                                lastName:response.payload.family_name,
                                profileType:'Customer',
                                message:'Authentication Successful!'
                            }
                        )
                    }
                    
                }
            })
            
        }
        catch(err){
            console.log(err)
        }
    })
    
})




module.exports = router