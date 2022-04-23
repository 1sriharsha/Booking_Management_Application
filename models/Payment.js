const mongoose = require('mongoose');
const bcrypt = require("bcrypt");


const PaymentSchema = mongoose.Schema({
    userEmail:{type:String,required:true},
    cardHolderName:{type:String,required:true},
    cardNumber:{type:String,required:true},
    cardExpiry:{type:String,required:true},
    billingLocation:{
        streetAddress:{type:String,required:true},
        streetAddress2:{type:String},
        city:{type:String,required:true},
        state:{type:String,required:true},
        country:{type:String,required:true},
        zipcode:{type:Number,required:true}
    },
    promotionCodeUsed:{type:String},
    rewardPointsUsed:{type:String}
})