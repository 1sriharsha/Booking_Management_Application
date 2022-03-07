const express = require('express');
const passport = require('passport');
const router = express.Router();


//@desc Auth with Google
//@route GET /auth/google
router.get('/google',passport.authenticate('google',{scope:['profile','email']}))

//@desc Google Auth Callback - Redirect to home page on success full login, or to login page if error
//@route GET /auth/google/callback
router.get('/google/callback',passport.authenticate('google',{failureRedirect:'/'}),(req,res)=>{
    //res.redirect('/home')
    res.redirect("http://localhost:8080/home.html")
    
})

module.exports = router