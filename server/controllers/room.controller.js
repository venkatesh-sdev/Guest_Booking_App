import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
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
        const houseOwner = await User.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found Please SignUp as User to create a Rooms" });


        // let files = req.files;
        // if (files.length > 0) {
        //     files = files.map(data => data.filename);
        // }


        // Creating Room and Store Images on MongoDb
        const newRoom = await Room.create({ houseOwnerId: req.user.id, ...req.body });

        // Creating Room and Store Images in Storage
        // const newRoom = await Room.create({ houseOwnerId: req.user.id, ...req.body, roomImages: files });

        // Adding room to the HouseOwner total rooms
        houseOwner.yourRooms.push(newRoom._id);
        houseOwner.save();

        // Message for an Email
        let message = {
            from: process.env.APP_EMAIL,
            to: houseOwner.email,
            subject: 'Room Creation Completed Successfull',
            html: "<h1>Room Created Successfully</h1>"
        }
        // Sending Email
        SendMail(message);

        // Sending Result
        return res.status(201).json({ result: 'Success', data: newRoom });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// UpdateRoom Contorller
export const UpdateRoomController = async (req, res, next) => {
    try {
        // Finding the HouseOwner with userId
        const houseOwner = await User.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found  Please SignUp as User to Update a Rooms" });

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
        const houseOwner = await User.findById(req.user.id);

        if (!houseOwner) return res.status(400).json({ message: "User not Found in  Please SignUp as User to Delete a Rooms" });

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
        const customer = await User.findById(req.user.id);
        if (!customer) res.status(400).json({ message: 'Customer Is Not Exists' });

        customer.bookedRooms = [...customer.bookedRooms, roomBooking._id];
        customer.roomBookedHistory.push(roomBooking._id);
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

        // Creating Transaction Id for Verification
        const transactionId = uuid4();

        schedule.scheduleJob('reminder-payment' + bookedRoom._id, '0 1 */1 * *', async () => {
            // Creating new Stripe Object
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
            // Creating a Checkout Session for Checkout 
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
                success_url: `/bookingroom/:${transactionId}`,
                cancel_url: '/bookingcancel',
                ui_mode: 'hosted'
            })
            let reminderMessage = {
                from: process.env.APP_EMAIL,
                to: customer.email,
                subject: 'Room Rent Reminder',
                html: `<h1> Room Rent Reminder</h1><br/>
                    <b><a href="${session.url}">click Here to Pay</a></b>
                    `
            }
            SendMail(reminderMessage);
            if (checkOutDate < new Date()) {
                schedule.cancelJob('reminder-payment' + bookedRoom._id);
            }
        })

        // Adding to House Owner Booked Room
        const houseOwner = await User.findById(houseOwnerId);
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
        if (!bookedRoom.isAvailable) return res.status(200).json({ message: `Sorry The Room Not Booked Yet So You Can't Cancel It` });
        bookedRoom.isAvailable = true;
        bookedRoom.save();

        schedule.cancelJob('reminder-payment' + bookingId);

        // Removing to House Owner Booked Room
        const customer = await User.findById(req.user.id);

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
        const houseOwner = await User.findById(houseOwnerId);
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

export const getWishlist = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        const filteredRooms = user.wishlist.map(async (id) => {
            const room = await Room.findById(id);
            return room;
        })
        res.status(200).json({ wishlist: filteredRooms });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ error: error.message })
    }
}

export const addWishList = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        user.wishlist.push(req.params.id);
        user.save();
        res.status(200).json({ message: "added To WishList" });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ error: error.message })
    }
}

export const removeFromWishList = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        user.wishlist = user.wishlist.filter(id => id !== req.params.id);
        user.save();
        res.status(200).json({ message: "removed from WishList" });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ error: error.message })
    }
}