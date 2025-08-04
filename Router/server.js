import express from "express";
import connectDB from "./db.js";
import dotenv from "dotenv";
import userRoute from "./user.routes.js";
import channelRoute from "./channel.routes.js";
import videoRoute from "./video.routes.js";
import CommentRoute from "./comment.routes.js";
import cors from "cors";
dotenv.config(); // loads your .env variables

const port = 3300;
const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://streamly-vgcb.vercel.app"
];
app.use(express.json());

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);


connectDB().then(() => {
  userRoute(app);
  channelRoute(app);
  videoRoute(app);
  CommentRoute(app);
  app.listen(port, () => console.log(`Server is running on port ${port}`))}
);
