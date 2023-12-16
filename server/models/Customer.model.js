import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true
    },
    bookedRooms: [
        {
            type: String,
        }
    ],
    wishlist: [
        {
            type: String,
        }
    ],
    bookedHistory: [
        {
            type: String,
        }
    ]
}, {
    timestamps: true
});

const Customer = model('Customers', customerSchema);

export default Customer;
