import { Schema, model } from 'mongoose';

const HouseOwnerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    totalRooms: {
        type: [],
        default: []
    },
    availableRooms: {
        type: [],
        default: []
    },
    bookedRooms: {
        type: [],
        default: []
    }
});

const HouseOwner = model('HouseOwners', HouseOwnerSchema);

export default HouseOwner;
