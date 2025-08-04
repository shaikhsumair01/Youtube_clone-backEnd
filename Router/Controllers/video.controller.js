import Video from "../Model/video.model.js";
import Channel from "../Model/channel.model.js";

// Post method for creating videos:
export const uploadVideo = async (req, res) => {
  try {
    const { title, url, channelId ,description} = req.body;
    const userId = req.user.userId; // pulled from verifyToken middleware
    if(!userId){
      return res.status(400).json({message:"The user doesn't exist"});
    }
    const channel = await Channel.findById(channelId);
if (!channel) {
  return res.status(404).json({ message: "Channel not found" });
}

    else{
    /* We will get the url from the body and then split the result giving us ["https", "youtube", "url"]
    Then after getting the array, we will pop the url and if the url has a special charater "?" then we will remove it from split*/
   const videoId = url.split("/").pop().split("?")[0];
//    if the videoId is not found return status 400
    if (!videoId) {
  return res.status(400).json({ message: "Invalid URL. Could not extract videoId." });
}
//    if the videoId is existing return status 400
const existing = await Video.findOne({ videoId });
if (existing) {
  return res.status(409).json({ message: "This video already exists in database. Please try adding another video." });
}

const thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;


    const video = await Video.create({
      title,
      url,
      channel: channelId,
      videoId,
      description,
      thumbnail:thumbnail
    });

    // Push video into the channel’s video array
    await Channel.findByIdAndUpdate(channelId, {
      $push: { videos: video._id },
    });

    res.status(201).json({ message: "Video uploaded", video });
  }
  } catch (err) {
    console.error("Video upload error:", err);
    res.status(500).json({ message: "Error uploading video" });
  }
};

// Get request for fetching all the video
export const getAllVideos = async (req, res) => {
  try {
    // if videos found we will populate the channel object in video schema
    const videos = await Video.find().populate("channel");
    // Show video data
    res.status(200).json(videos);
  } catch (err) {
    res.status(500).json({ message: "Error fetching videos" });
  }
};

// Put request for updating the video
export const updateVideo = async (req, res) => {
  try {
    // getting the id from the url
    const { id } = req.params;
    const userId = req.user.userId;
  
     if(!userId){
      return res.status(400).json({message:"The user doesn't exist"});
    }
    else{
      // Prepare update fields
    let updatedFields = { ...req.body };

    // If URL is being updated, re-extract videoId and regenerate thumbnail
    if (req.body.url) {
      const videoId = req.body.url.split("/").pop().split("?")[0];

      if (!videoId) {
        return res.status(400).json({ message: "Invalid URL. Could not extract videoId." });
      }

      updatedFields.videoId = videoId;
      updatedFields.thumbnail = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
    }

 // finding the videos from id and then updating it
    const updated = await Video.findByIdAndUpdate(id, updatedFields,{ new: true });
    // if the video is not existing then we send video not found
    if (!updated) return res.status(404).json({ message: "Video not found" });
    // else update it
    res.status(200).json({ message: "Video updated", video: updated });
    }
   
  } catch (err) {
    res.status(500).json({ message: "Error updating video" });
  }
};
// delete request for deleting the videos by id
export const deleteVideo = async (req, res) => {
  try {
    // getting id from the url
    const { id } = req.params;
     const userId = req.user.userId;
     if(!userId){
      return res.status(400).json({message:"The user doesn't exist"});
    }
    else{
       // searching for the id and deleting it
    const deleted = await Video.findByIdAndDelete(id);
    console.log(deleted)
    // if the video doesn't exist then we return video not found
    if (!deleted) return res.status(404).json({ message: "Video not found" });

    // updating the channel once the video is deleted
   if (deleted.channel) {
  await Channel.findByIdAndUpdate(deleted.channel, {
    $pull: { videos: deleted._id },
    });
  } 
  // Showing the success message
    res.status(200).json({ message: "Video deleted" });
}

    // handling the error
  } catch (err) {
    res.status(500).json({ message: "Error deleting video" });
  }
};
