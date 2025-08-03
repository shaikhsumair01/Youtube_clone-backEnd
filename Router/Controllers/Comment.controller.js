import Comments from "../Model/Comment.Model.js"
import mongoose from "mongoose";
export const fetchComments = async(req,res)=>{
try{
// We will send the videoId through the url passed by the user
 const videoId = req.params.id;
//  We will find the existing comments and then populate the user details. Sort is to show the latest comments
    const comments = await Comments.find({ video: videoId })
      .populate("user", "username avatar") 
      .sort({ createdAt: -1 }); 
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: "Failed to retrieve comments" });
  }

}
export const postNewComment = async(req,res)=>{
try{
    // We will get the videoId on which we want to comment 
const { videoId, CommentBody, channelName} = req.body;
 
  if (!req.user || !req.user.userId) {
      return res.status(401).json({ error: "User authentication failed" });
    }

// create new comment
     const newComment = await Comments.create({
      user: req.user.userId,
      video: videoId, 
      CommentBody,
      channelName,
    });

    // send the success status showing new comment
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Failed to create comment" });

  }
} 

// Updating the comment by id
export const updateComment = async (req, res) => {
    // we will send the comment id through the url
  const { commentId } = req.params;
//   fetching the updated comments from the body
  const { CommentBody } = req.body;

  try {
    // finding the comment from the id
    const comment = await Comments.findById(commentId);
    // if comment's doesn't exist then no comments found
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    /*since the user details are stored in mongoose.Schema.Types.ObjectId, we will pull out the userId from it 
     and check if the userId present in the comment object matches the userId fetched from the url.
     Meaning in other terms if a different user tries to modify the comment posted by another user then we should pass an error warning*/
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized to update this comment" });
    }
// if the user is authorised
    comment.CommentBody = CommentBody;
    await comment.save();

    res.status(200).json(comment);
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ error: "Failed to update comment" });
  }
};
// deleting the comments
export const deleteComment = async (req, res) => {
  const { commentId } = req.params;

  try {
    const comment = await Comments.findById(commentId);

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Making sure only the author can delete their own comment
    if (comment.user.toString() !== req.user.userId) {
      return res.status(403).json({ error: "Unauthorized to delete this comment" });
    }

    await comment.deleteOne(); 
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
};
