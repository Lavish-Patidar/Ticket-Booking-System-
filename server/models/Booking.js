const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    destinationFrom: {
        type: String,
        required: true
    },
    destinationTo: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    },

}, { timestamps: true });

module.exports = mongoose.model('Booking', BookingSchema);