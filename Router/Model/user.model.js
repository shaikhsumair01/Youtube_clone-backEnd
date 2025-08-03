import mongoose from "mongoose";

//  User schema for authentication
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },

  avatar: {
    type: String,
    default: "https://unsplash.com/photos/a-close-up-of-a-toy-head-on-a-blue-background-xmCtXeF8CeA", 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  channelsOwned: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  subscribedChannels: [{ type: mongoose.Schema.Types.ObjectId, ref: "Channel" }],
  likedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  dislikedVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: "Video" }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
});

const Users = mongoose.model("User", userSchema)
export default Users;