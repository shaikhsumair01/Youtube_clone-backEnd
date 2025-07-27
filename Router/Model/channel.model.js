// Channel model for storing the channel details
import mongoose from "../db.js";

const channelSchema = new mongoose.Schema({
  channelName: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  description: {
    type: String,
    default: "",
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  channelBanner: {
    type: String,
    default: "https://unsplash.com/photos/sample-banner",
  },

  subscribers: {
    type: Number,
    default: 0,
  },

  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const channelModel = mongoose.model("Channel", channelSchema);
export default channelModel
