import mongoose from "../db.js";
// Creating video Schema:
const videoSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    trim: true,
  },
    description: {
    type: String,
    default: "",
  },
    url: {
    type: String,
    required: true,
  },
     thumbnail: {
    type: String,
    required: true,
  },
    duration: {
    type: String,
  },
    views: {
    type: Number,
    default: 0,
  },
    uploadDate: {
    type: Date,
    default: Date.now,
  },
    category: {
    type: String,
  },
    tags: [String],

   channel: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Channel",
    required: true,
},
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  dislikes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],

})
export default mongoose.Model("video", videoSchema)