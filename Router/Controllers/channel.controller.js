import channelModel from "../Model/channel.model.js";
// POST /api/channel/create
export const createChannel = async (req, res) => {
  try {
    const { channelName, description } = req.body;
    const userId = req.user.userId; // pulled from verifyToken middleware

    // Checks if a channel already exists for this user
    const existingChannel = await channelModel.findOne({ owner: userId });
    if (existingChannel) {
      return res.status(409).json({ message: "Channel already exists for this user." });
    }

    const newChannel = new channelModel({
      channelName,
      description,
      owner: userId,
    });

    await newChannel.save();
    res.status(201).json({ message: "Channel created successfully", channel: newChannel });
  } catch (err) {
    console.error("Channel creation error:", err);
    res.status(500).json({ message: "Server error during channel creation." });
  }
};

// GET /api/channel/:channelId
export const getChannelById = async (req, res) => {
  try {
    const { channelId } = req.params;
    // shows owner their channel info
    const channel = await channelModel.findById(channelId).populate("videos"); 
    
    if (!channel) {
      return res.status(404).json({ message: "Channel not found." });
    }

    res.status(200).json({ channel });
  } catch (err) {
    console.error("Channel fetch error:", err);
    res.status(500).json({ message: "Error retrieving channel information." });
  }
};
