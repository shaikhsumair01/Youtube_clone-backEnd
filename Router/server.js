import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // loads your .env variables

const port = 3300;
const app = express();

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(uri)
.then(() => console.log(' Connected to MongoDB Atlas'))
.catch(err => console.error('Connection error:', err));

app.use(express.json());

app.listen(port, () => console.log(`Server is running on port ${port}`));
