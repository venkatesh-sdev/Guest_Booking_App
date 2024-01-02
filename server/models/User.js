import { Schema, model } from 'mongoose';

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    profilePic: {
        type: String,
        default: ''
    },
    password: {
        type: String,
        required: true
    },
    wishlist: [
        {
            type: String,
        }
    ],
    roomBookedHistory: [
        {
            type: String,
        }
    ],
    yourRooms: [
        {
            type: String,
        }
    ],
    availableRooms: [
        {
            type: String,
        }
    ],
    unAvailableRooms: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
});

const User = model('Users', userSchema);

export default User;
