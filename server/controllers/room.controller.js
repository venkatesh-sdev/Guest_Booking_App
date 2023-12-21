import HouseOwnerModel from '../models/HouseOwner.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.js';
import Customer from '../models/Customer.js';

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
        const { houseOwnerId, roomId, checkInDate, checkOutDate } = req.body;

        // Creating a booking 
        const roomBooking = await Booking.create({ roomId, checkInDate, checkOutDate });

        // Mark as Room Not available for other users
        const bookedRoom = await Room.findById(roomId);
        bookedRoom.isAvailable = false;

        // Adding to Customers Booked Room
        const customer = await Customer.findById(req.user.id);

        if (!customer) res.status(400).json({ message: 'Customer Is Not Exists' })

        customer.bookedRooms = [...customer.bookedRooms, roomBooking._id];
        customer.bookedHistory.push(roomBooking._id);
        customer.save();

        // Adding to House Owner Booked Room
        const houseOwner = await HouseOwnerModel.findById(houseOwnerId);
        houseOwner.bookedRooms.push(roomBooking._id);
        houseOwner.save();



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
        bookedRoom.isAvailable = true;

        // Removing to House Owner Booked Room
        const customer = await Customer.findById(req.user.id);
        // Check If the customer Exits or Not
        if (!customer) res.status(400).json({ message: 'Customer Is Not Exists' })

        customer.bookedRooms = customer.bookedRooms.filter(value => value != bookingId);
        customer.save();

        // Removing to House Owner Booked Room
        const houseOwner = await HouseOwnerModel.findById(houseOwnerId);
        houseOwner.bookedRooms = houseOwner.bookedRooms.filter(value => value != bookingId);
        houseOwner.save();

        // Deleting a Booking
        await Booking.findByIdAndDelete(bookingId);

        res.status(200).json({ houseOwner, customer })

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}
