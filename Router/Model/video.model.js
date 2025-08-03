import mongoose from "mongoose";
// Creating video Schema:
const videoSchema = new mongoose.Schema({
   videoId: { type: String, required: true, unique: true },
  title: String,
  description: String,
  thumbnail: String,
  channelTitle: String,
  publishedAt: Date,
  views: Number,
  likes: Number,
  fetchedAt: { type: Date, default: Date.now },
  channel: { type: mongoose.Schema.Types.ObjectId, ref: "Channel" }

})
const Video =  mongoose.model("Video", videoSchema)
export default Video;