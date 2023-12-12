const express = require('express');
require('dotenv').config({ path: './configs/.env' });
const cors = require('cors');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan('combined'))



// Database Connection
const DB_Connection = () =>
    mongoose.connect(process.env.MONGO_CONN);


// Server Listening
const PORT = process.env.PORT || 4000;
app.listen(PORT, async () => {
    await DB_Connection();
    console.log("Database Connected SuccessFully");
    console.log("Server running in http://localhost:" + PORT);
});