import mongoose from "../db.js";
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
  fetchedAt: { type: Date, default: Date.now }

})
export default mongoose.Model("video", videoSchema)