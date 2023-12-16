import HouseOwnerModel from '../models/HouseOwner.model.js';
import Room from '../models/Room.js';
import Booking from '../models/Booking.model.js';
import Customer from '../models/Customer.model.js';

// CreateRoom Controller
export const CreateRoomController = async (req, res, next) => {
    try {
        // Finding the HouseOwner with userId
        const houseOwner = await HouseOwnerModel.findById(req.user.id);

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
        //Extracting the Params from the Request 
        const { id } = req.params;

        // Checing the room is Exists or Not
        const room = await Room.findById(id);
        if (!room) return res.status(400).json({ message: "Update Failed The Room Not Exists" });

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

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}
// CancelRoom
export const CancelRoomController = async (req, res, next) => {
    try {

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}

// AddBooked Rooms
export const AddBookedRooms = async (req, res, next) => {
    try {
        const { roomId, checkInDate, checkOutDate } = req.body;
        const roomBooking = await Booking.create({ roomId, checkInDate, checkOutDate });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}




