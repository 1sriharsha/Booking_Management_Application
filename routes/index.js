const express = require('express');
const router = express.Router();
const User = require('../models/users');
const bodyParser = require('body-parser');  
const asyncHandler = require('express-async-handler')


router.get('/',asyncHandler(async(req, res) => {
    res.send('Hello')
  }))

router.post('/register', asyncHandler(async(req, res) => {
    let resp = await profileServiceApi.post(`/createProfile`, req.body)
    res.status(resp.status).send(resp.data)
  }))

module.exports = router;