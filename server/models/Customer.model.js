const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
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
            roomId: {
                type: String,
            },
            checkInDate: {
                type: Date,
                required: true
            },
            checkOutDate: {
                type: Date,
                required: true
            }
        }
    ],
    wishlist: [
        {
            roomId: {
                type: String,
            }
        }
    ],
    bookedHistory: [
        {
            roomId: {
                type: String,
            },
            checkInDate: {
                type: Date,
                required: true
            },
            checkOutDate: {
                type: Date,
                required: true
            }
        }
    ]
}, {
    timestamps: true
});

const Customer = mongoose.model('Customers', customerSchema);

module.exports = Customer;
