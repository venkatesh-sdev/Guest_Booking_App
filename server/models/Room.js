const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomSchema = new Schema({
    roomName: {
        type: String,
        required: true
    },
    numberOfBeds: {
        type: Number,
        required: true
    },
    floorSize: {
        type: String,
        required: true
    },
    rentPerDay: {
        type: Number,
        required: true,
    },
    minimumRentDays: {
        type: Number,
        required: true,
    },
    maximumRentDays: {
        type: Number,
        required: true,
    },
    otherFeatures: [
        {
            type: String,
            enum: ['AC', 'Fridge', 'WashingMachine', 'Sofa', 'TV']
        }
    ],
    roomImages: [
        {
            imageUrl: {
                type: String,
                default: "",
            }
        }
    ]
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

module.exports = Room;
