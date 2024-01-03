import mongoose from 'mongoose';


const roomSchema = new mongoose.Schema({
    houseOwnerId: {
        type: String,
        required: true,
    },
    roomName: {
        type: String,
        required: true
    },
    numberOfBeds: {
        type: Number,
        required: true
    },
    floorNumber: {
        type: Number,
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
            enum: ['AC', 'Fridge', 'Washing Machine', 'Sofa', 'TV']
        }
    ],
    roomImages: [
        {
            type: String,
        }
    ],
    address: { type: String, required: true },
    isAvailable: {
        type: Boolean,
        default: true,
    }
}, {
    timestamps: true
});

const Room = mongoose.model('Room', roomSchema);

export default Room;
