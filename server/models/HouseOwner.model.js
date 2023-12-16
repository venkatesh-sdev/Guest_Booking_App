import { Schema, model } from 'mongoose';

const userSchema = new Schema({
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

const User = model('User', userSchema);

export default User;
