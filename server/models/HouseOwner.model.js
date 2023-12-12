const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
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

const User = mongoose.model('User', userSchema);

module.exports = User;
