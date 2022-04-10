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

router.get("/booked_slots",async function (req,res){
    Booking.find({}, {"intime": 1, "outtime": 1}).then((book)=>{
        res.status(200).send(book)
        // res.status(200).json(book)
    }).catch((err)=>{
        res.status(500).send(err)
    })
})

router.put("/:id", async(req,res)=>{
    try{
        const modify = await Booking.findById(req.params.id);
        if(modify.email === req.body.email){
            await modify.updateOne({$set:req.body})
            res.status(200).json("booking has been updated");
        }else{
            res.status(403).json("You cannot modify this booking");
        }
    }catch(err){
        res.status(500).json(err);
    } 
});

router.delete("/:id", async(req,res)=>{
    try{
        const bookedslot = await Booking.findById(req.params.id);
        if(bookedslot.email === req.body.email){
            await bookedslot.deleteOne();
            res.status(200).json("Booking has been deleted");
        }else{
            res.status(403).json("This Booking cannot be deleted");
        }
    }catch(err){
        res.status(500).json(err);
    }
});

module.exports = router;