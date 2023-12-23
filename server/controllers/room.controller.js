import HouseOwnerModel from '../models/HouseOwner.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';
import SendMail from '../utils/email.js';
import schedule from 'node-schedule';
import Stripe from 'stripe';
import { v4 as uuid4 } from 'uuid'

// GetAllRooms Controller
export const GetAllRoomsController = async (req, res, next) => {
    try {
        // Getting All Rooms
        const rooms = await Room.find({});
        // Sending Result
        res.status(201).json({ result: 'Success', data: rooms });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// GetRoom Controller
export const GetRoomController = async (req, res, next) => {

    try {
        // Getting All Rooms
        const room = await Room.findById(req.params.id);

        // Sending Result
        res.status(201).json({ result: 'Success', data: room });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// CreateRoom Controller
export const CreateRoomController = async (req, res, next) => {
    try {
        // Finding the HouseOwner with userId
        const houseOwner = await HouseOwnerModel.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found in HouseOwner Registrey Please SignUp as HouseOwner to create a Rooms" });

        // Creating Room
        const newRoom = await Room.create({ houseOwnerId: req.user.id, ...req.body });
        newRoom.save();

        // Adding room to the HouseOwner total rooms
        houseOwner.totalRooms.push(newRoom._id);
        houseOwner.save();

        // Sending Result
        res.status(201).json({ result: 'Success', data: newRoom });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// UpdateRoom Contorller
export const UpdateRoomController = async (req, res, next) => {
    try {
        // Finding the HouseOwner with userId
        const houseOwner = await HouseOwnerModel.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found in HouseOwner Registrey Please SignUp as HouseOwner to Update a Rooms" });

        //Extracting the Params from the Request 
        const { id } = req.params;

        // Checing the room is Exists or Not
        const room = await Room.findById(id);
        if (!room) return res.status(400).json({ message: "Update Failed The Room Not Exists" });

        // Update The room 
        const updatedRoom = await Room.findByIdAndUpdate(id, { ...req.body }, { new: true });
        updatedRoom.save();

        // Send the Response 
        res.status(200).json({ message: "Updated SuccessFully", data: updatedRoom });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// DeleteRoom Contorller
export const DeleteRoomController = async (req, res, next) => {
    try {
        // Finding the HouseOwner with userId
        const houseOwner = await HouseOwnerModel.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found in HouseOwner Registrey Please SignUp as HouseOwner to Delete a Rooms" });

        // Extracting the Params from the Request 
        const { id } = req.params;

        // Checing the room is Exists or Not
        const room = await Room.findById(id);
        if (!room) return res.status(400).json({ message: "Delete Failed The Room Not Exists" });

        // Delete The room 
        await Room.findByIdAndDelete(id);

        // Send the Response 
        res.status(200).json({ message: "Deleted SuccessFully" });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// BookRoom
export const BookRoomController = async (req, res, next) => {
    try {
        // Extracting data from request
        let { houseOwnerId, roomId, checkInDate, checkOutDate } = req.body;

        checkInDate = new Date(checkInDate);
        checkOutDate = new Date(checkOutDate);

        // Mark as Room Not available for other users
        const bookedRoom = await Room.findById(roomId);

        if (!bookedRoom.isAvailable) return res.status(200).json({ message: `Sorry The Room Not Available Yet` })
        bookedRoom.isAvailable = false;
        bookedRoom.save();


        // Creating a booking 
        const roomBooking = await Booking.create({ roomId, checkInDate, checkOutDate, houseOwnerId, customerId: req.user.id });

        // Adding to Customers Booked Room
        const customer = await Customer.findById(req.user.id);
        if (!customer) res.status(400).json({ message: 'Customer Is Not Exists' });

        customer.bookedRooms = [...customer.bookedRooms, roomBooking._id];
        customer.bookedHistory.push(roomBooking._id);
        customer.save();
        // Message for an Email
        let customerMessage = {
            from: process.env.APP_EMAIL,
            to: customer.email,
            subject: 'Room Booked Successfull',
            html: "<h1> Room Booked Successfull </h1>"
        }
        // Sending Email
        SendMail(customerMessage);

        schedule.scheduleJob('reminder-payment' + bookedRoom._id, '0 1 */1 * *', () => {
            let reminderMessage = {
                from: process.env.APP_EMAIL,
                to: customer.email,
                subject: 'Room Rent Reminder',
                html: "<h1> Room Rent Reminder</h1>"
            }
            SendMail(reminderMessage);
            if (checkOutDate < new Date()) {
                schedule.cancelJob('reminder-payment' + bookedRoom._id);
            }
        })


        // Adding to House Owner Booked Room
        const houseOwner = await HouseOwnerModel.findById(houseOwnerId);
        houseOwner.bookedRooms.push(roomBooking._id);
        houseOwner.save();
        // Message for an Email
        let houseOwnerMessage = {
            from: process.env.APP_EMAIL,
            to: houseOwner.email,
            subject: 'Room Booked Successfull',
            html: `<h1> ${bookedRoom.roomName} Booked Successfull by ${customer.email} </h1>`
        }
        // Sending Email
        SendMail(houseOwnerMessage);

        res.status(201).json({ message: "Room Booked Successfully", customer })

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// CancelRoom
export const CancelRoomController = async (req, res, next) => {
    try {
        // Extracting the data from the Request 
        const { houseOwnerId, roomId, bookingId } = req.body;

        // Mark as Room available for other users
        const bookedRoom = await Room.findById(roomId);
        if (!bookedRoom.isAvailable) return res.status(200).json({ message: `Sorry The Room Not Booked Yet So You Can't Cancel It` })
        bookedRoom.isAvailable = true;
        bookedRoom.save();

        schedule.cancelJob('reminder-payment' + bookingId);

        // Removing to House Owner Booked Room
        const customer = await Customer.findById(req.user.id);

        // Check If the customer Exits or Not
        if (!customer) res.status(400).json({ message: 'Customer Is Not Exists' })

        customer.bookedRooms = customer.bookedRooms.filter(value => value != bookingId);
        customer.save();

        // Message for an Email
        let customerMessage = {
            from: process.env.APP_EMAIL,
            to: customer.email,
            subject: 'Room Canceld Successfull',
            html: "<h1> Room Canceld Successfull </h1>"
        }

        // Sending Email
        SendMail(customerMessage);

        // Removing to House Owner Booked Room
        const houseOwner = await HouseOwnerModel.findById(houseOwnerId);
        houseOwner.bookedRooms = houseOwner.bookedRooms.filter(value => value != bookingId);
        houseOwner.save();

        // Message for an Email
        let houseOwnerMessage = {
            from: process.env.APP_EMAIL,
            to: houseOwner.email,
            subject: 'Room Canceled  ',
            html: "<h1> Room Canceled  </h1>"
        }
        // Sending Email
        SendMail(houseOwnerMessage);

        // Deleting a Booking
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({ houseOwner, customer })

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}


export const BookingPaymentController = async (req, res) => {
    try {
        const transactionId = uuid4();
        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: req.body.rooms.map(room => (
                {
                    price_data: {
                        currency: 'inr',
                        product_data: {
                            name: room.name
                        },
                        unit_amount: room.price * 100
                    },
                    quantity: 1
                }
            )),
            success_url: `/bookroom/:${transactionId}`,
            cancel_url: '/bookingcancel',
            ui_mode:'embedded'
        })
        return res.status(200).json({ url: session.url });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }

}