import mongoose, { mongo } from 'mongoose';

const bookingSchema = new mongoose.Schema({
    roomId: { type: String, required: true },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
});

const Booking = mongoose.model('Booking', bookingSchema);

export default Booking;