import Channel from "../Model/channel.model.js";
// POST /api/channel/create
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const userId = req.user.userId; // pulled from verifyToken middleware

    // Checks if a channel already exists for this user
    const existingChannel = await Channel.findOne({ owner: userId });
    if (existingChannel) {
      return res.status(409).json({ message: "Channel already exists for this user." });
    }
    // creating new channel from schema
    const newChannel = new Channel
    ({
      channelName,
      description,
      owner: userId,
    });
    // saving the details of the channel
    await newChannel.save();
    // shwoing success message
    res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    // showing error message
  } catch (err) {
    console.error("Channel creation error:", err);
    res.status(500).json({ message: "Server error during channel creation." });
  }
};

// GET /api/channel/:channelId
export const getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;
    // finds the channel by id and then shows the owner their channel videos
    const channel = await Channel.findById(channelId).populate("videos"); 
    // if the channel doesn't exist then we give 404 error
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }
    // Show the channel
    res.status(200).json({ channel });

  } catch (err) {
    console.error("Channel fetch error:", err);
    res.status(500).json({ message: "Error retrieving channel information." });
  }
};
// getting my channel when I am logged in (owner's channel)
export const getMyChannel = async (req, res) => {
  try {
    const userId = req.user.userId;
    const channel = await Channel.findOne({ owner: userId }).populate("videos");

    if (!channel) {
      return res.status(404).json({ message: "No channel found." });
    }

    res.status(200).json({ channel });
  } catch (err) {
    console.error("Channel lookup error:", err);
    res.status(500).json({ message: "Server error." });
  }
};
