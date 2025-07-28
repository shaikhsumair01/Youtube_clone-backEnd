import mongoose from "mongoose";
// Making a centralised connection for the database
const connectDB = async () => {
 try {

mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`)

const db = mongoose.connection;

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once("open", () => console.log("The database is ready"));
 }
 catch (error){
  console.error("MongoDB connection FAILED :", error.message);
    process.exit(1); // stop the server if DB can't connect

 }
}
export default connectDB;
