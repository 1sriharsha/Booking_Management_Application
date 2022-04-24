const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt");
const Payment = require('../models/Payment');

router.post("/add",async function(req,res){
    const salt = await bcrypt.genSalt(10)
    console.log(req.body)
    var paymentObject={
        userEmail:req.body.email,
        cardHolderName:req.body.cardHolderName,
        cardNumber:await bcrypt.hash(req.body.cardNumber,salt),
        cvv:await bcrypt.hash(req.body.cvv,salt),
        billingLocation:{
            streetAddress:req.body.billingLocation.streetAddress,
            streetAddress2:req.body.billingLocation.streetAddress2 || "",
            city:req.body.billingLocation.city,
            state:req.body.billingLocation.state,
            country:req.body.billingLocation.country,
            zipcode:req.body.billingLocation.zipcode
        },
        promotionUsed:req.body.promotionUsed || "No Promotion Used",
        rewardPointsUsed:req.body.rewardPointsUsed
    }

    }
    paymentMethod=await Payment.create(paymentObject)
    

})

