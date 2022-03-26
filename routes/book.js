const express = require('express');
const router = express.Router();
const Booking = require("../models/Booking");



// router.post('/', function(req, res, next){
//     const user =  User.findOne({email: req.body.email});
//     user && res.status(404).json("please log in to book");
//     const newbooking = new Booking(req.body);
//     Booking.create(req.body).then(function(bookings){
//         res.send(bookings);
//     }).catch(next);
// });

router.post("/add", async (req,res)=>{
    console.log("error1")
    try{
        Booking.create(req.body).then(function(){
            res.status(200).json({
                message:"Booking done"
            });
            console.log("booking successful")
        });
    }catch (err){
        res.status(500).json(err);
        console.log("error")
    }
});

module.exports = router;