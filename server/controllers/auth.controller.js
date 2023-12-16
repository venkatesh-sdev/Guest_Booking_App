import Customer from '../models/Customer.model.js';
import HouseOwnerModel from '../models/HouseOwner.model.js';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';




// SignUp 
export const CustomerSignUpController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check User Is Already Exits
        const user = await Customer.findOne({ email });
        console.log(user)
        if (user) return res.status(400).json({ message: "The Email Already Exist" })

        // Creating a salt for Hashing the password
        const salt = await genSalt();
        // Hashing a Password with the Created Salt
        const hashedPassword = await hash(password, salt);

        // Creating a Customer 
        const customer = await Customer.create({ email, password: hashedPassword });
        // Saving the Customer to Db
        customer.save();

        // Sending Response to the Client
        res.status(201).send({ message: "User Created", details: customer });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}
// SignIn
export const CustomerSignInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Checking User Exists OR Not
        const customer = await Customer.findOne({ email });
        console.log(email, password)
        if (!customer) return res.status(400).json({ message: "User Not Exists" });

        // Checking Password Match
        const isMatch = await compare(password, customer.password);
        if (!isMatch) return res.status(400).json({ message: "Check Your Details" });
        // console.log(customer)

        // Creating JWT TOKEN
        const token = jwt.sign({ id: customer._id }, process.env.HASH_KEY);

        // Delete Password from customer Object
        delete customer.password;

        res.status(201).json({ token, customer });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}


// SignUp Controller
export const HouseOwnerSignUpController = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check User Is Already Exits
        const user = await HouseOwnerModel.findOne({ email });
        console.log(user)
        if (user) return res.status(400).json({ message: "The Email Already Exist" })

        // Creating a salt for Hashing the password
        const salt = await genSalt();
        // Hashing a Password with the Created Salt
        const hashedPassword = await hash(password, salt);

        // Creating a HouseOwner 
        const houseOwner = await HouseOwnerModel.create({ email, password: hashedPassword });
        // Saving the HouseOwner intoDb
        houseOwner.save();

        // Sending Response to the Client
        res.status(201).send({ message: "User Created", details: houseOwner });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}
// SignIn Controller
export const HouseOwnerSignInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Checking User Exists OR Not
        const houseOwner = await HouseOwnerModel.findOne({ email });
        console.log(email, password)
        if (!houseOwner) return res.status(400).json({ message: "User Not Exists" });

        // Checking Password Match
        const isMatch = await compare(password, houseOwner.password);
        if (!isMatch) return res.status(400).json({ message: "Check Your Details" });
        // console.log(houseOwner)

        // Creating JWT TOKEN
        const token = jwt.sign({ id: houseOwner._id }, process.env.HASH_KEY);

        // Delete Password from HouseOwner Object
        delete houseOwner.password;

        res.status(201).json({ token, houseOwner, });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(400).json({ errorMessage: error.message })
    }
}
