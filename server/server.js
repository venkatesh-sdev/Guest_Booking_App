import express, { json, urlencoded } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import mongoose from 'mongoose';
import { fileURLToPath } from 'url'
import path from 'path';
import morgan from 'morgan';

// Routers
import AuthRoute from './routes/auth.route.js'
import RoomRoute from './routes/room.route.js'

// Controllers

// Token

// Models

// --- Defaults --- //
dotenv.config({ path: './configs/.env' });
const app = express();

// Overwriting a Default filename and dirname finder because of using module type exports and imports
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Parsing the data
app.use(json({ limit: '30mb' }));
app.use(urlencoded({ limit: '30mb', extended: true }));

// For Avoiding Cross-Orgin-Resource-Sharing Error
app.use(cors());

// Logger Middleware 
app.use(morgan('common'));

// A express Built-In Middleware used to set the path for directory
app.use("/assets", express.static(path.join(__dirname, 'public/assets')))

// --- File Storage --- //
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/assets');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage });

// --- Routes With Files --- //

// --- Router Routes --- //
app.use('/api/auth', AuthRoute);
app.use('/api/room', RoomRoute);



// --- Connections --- //
const DBConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION);
        console.log("DB Connected");
        // The App Listing in the PORT of 3001
        app.listen(
            process.env.PORT,
            () => {
                console.log("Server Running in http://localhost:" + process.env.PORT);
                // Data Insertion
                // console.log("Data Added Succesfully");
            }
        )
    }
    catch (error) {
        console.log(error);
    }
};

// MongoDB Database Connection Call
DBConnection();

