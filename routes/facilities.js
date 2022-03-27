const express = require('express');
const router = express.Router();
const { default: mongoose } = require('mongoose');
const Facility = require('../models/Facility');
router.post("/add",async function (req,res){
    var address= req.body.newFacilityData.facilityLocation.address.split(",")
    var manualFacility = {
        facilityId:new mongoose.Types.ObjectId().toString(),
        facilityName:req.body.newFacilityData.facilityName,
        facilityLocation:{
            place_id:req.body.newFacilityData.facilityLocation.place_id,
            street:address[0]+","+address[1],
            city:address[2],
            state:address[3],
            country:address[4]
        },
        facilitySports:req.body.newFacilityData.facilitySport,
        facilityInformation:req.body.newFacilityData.facilityInfo,
        reservationPeriodStart:req.body.newFacilityData.reservationPeriodStart,
        reservationPeriodEnd:req.body.newFacilityData.reservationPeriodEnd
    }
    //console.log(manualFacility)
    try{
        let facility= await Facility.findOne({'facilityLocation.place_id':manualFacility.facilityLocation.place_id}).exec(async (err,facility)=>{
            if(err){
                console.log(err)
            }
            else{
                if(facility){
                    res.status(409).send("Facility Already Exists")
                }
                else{
                    createdFacility=await Facility.create(manualFacility)
                    res.status(200).json({
                        message:"Added Successfully",
                        facility:manualFacility
                    })
                }
            }
        })
        
    }
    catch(err){
        console.log(err)
    }
});
module.exports = router