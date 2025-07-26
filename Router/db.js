import mongoose from "mongoose";
// Making a centralised connection for the database
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}/${process.env.MONGO_DBNAME}?retryWrites=true&w=majority`)

const db = mongoose.connection;

mongoose.connection.on('connected', () => {
  console.log('MongoDB connected');
});

mongoose.connection.on('error', (err) => {
  console.error('Connection error:', err);
});

db.once("open", () => console.log("The database is ready"));

export default mongoose;
