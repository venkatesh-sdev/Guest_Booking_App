import User from '../models/User.js';
import { genSalt, hash, compare } from 'bcrypt';
import jwt from 'jsonwebtoken';
import SendEmail from '../utils/email.js';


// User Authentication
// SignUp 
export const signUpController = async (req, res) => {
    try {
        console.log(req.body)
        const { userName, email, password } = req.body;
        // Check User Is Already Exits
        const checkUser = await User.findOne({ email });
        if (checkUser) return res.status(200).json({ message: "The Email Already Exist" })

        // Creating a salt for Hashing the password
        const salt = await genSalt();
        // Hashing a Password with the Created Salt
        const hashedPassword = await hash(password, salt);


        // Creating a User 
        const user = await User.create({ userName, email, password: hashedPassword });
        // Saving the User to Db
        user.save();


        // Message for an Email
        let message = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: 'Registration Successfull',
            html: "<h1> Registertion Successfull You Will Sign In and Use It </h1><br/><a href='http://localhost:5173/login'>Login</a>"
        }
        // Sending Email
        SendEmail(message);

        // Sending Response to the Client
        res.status(201).send({ message: "User Created", status: 'success' });

    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(200).json({ errorMd51: error.message })
    }
}
// SignIn
export const signInController = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Checking User Exists OR Not
        const user = await User.findOne({ email });
        console.log(email, password)
        if (!user) return res.status(200).json({ message: "User Not Exists" });

        // Checking Password Match
        const isMatch = await compare(password, user.password);
        if (!isMatch) return res.status(200).json({ message: "Check Your Details" });
        // console.log(User)

        // Creating JWT TOKEN
        const token = jwt.sign({ id: user._id }, process.env.HASH_KEY);

        // Delete Password from User Object
        delete user.password;

        // Message for an Email
        let message = {
            from: process.env.APP_EMAIL,
            to: email,
            subject: 'Login Successfull',
            html: "<h1> Login Successfull Now You Can Book Rooms </h1><br/><a href='http://localhost:5173/'>Login</a>"
        }
        // Sending Email
        SendEmail(message);

        res.status(201).json({ token, user });
    } catch (error) {
        // Sending Unhandled Error As Response
        res.status(200).json({ errorMd52: error.message })
    }
}
