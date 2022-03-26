const mongoose = require('mongoose');


const BookingSchema = mongoose.Schema({
    firstName: {type: String, required: true},
	lastName: {type: String, required: true},
	email: {type: String, required: true},
    location: {type: String, required: true},
    gear: {type: Array, default: []},
    upgrade: {
        Referee : {type: Number},
        Trainer: {type: Number}
    },
    intime: {
        hours: {type: Number, required: true, min: 0, max: 23},
        minutes: {type: Number, required: true, min: 0, max: 59}
    },
    outtime: {
        hours: {type: Number, required: true, min: 0, max: 23},
        minutes: {type: Number, required: true, min: 0, max: 59}
    }
});

const Booking = mongoose.model('bookings', BookingSchema);
module.exports = Booking;