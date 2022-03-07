const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');



router.get('/',(req, res) => {
  console.log('Inside Get')
  res.send("<h1>Hello!</h1>")
  })
  
router.post('/api',function(req, res, next){
  
  console.log(req.body)
  
  var user = {
    userId:new mongoose.Types.ObjectId().toString(),
    firstName:req.body.firstName,
    lastName:req.body.lastName,
    email:req.body.email,
    password:req.body.password,
    profileType:"Manual"
  }
  //cclonsole.log(user)
    User.create(user).then(function(users){
        res.json(users);
    }).catch(next);
});


module.exports = router;