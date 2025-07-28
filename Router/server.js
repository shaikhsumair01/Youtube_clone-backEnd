import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRoute from "./user.routes.js";
import channelRoute from "./channel.routes.js";
import videoRoute from "./video.routes.js";

dotenv.config(); // loads your .env variables

const port = 3300;
const app = express();

app.use(express.json());
connectDB().then(() => {
  userRoute(app);
  channelRoute(app);
  videoRoute(app);
  app.listen(port, () => console.log(`Server is running on port ${port}`));
});
