import mongoose from "mongoose";
const CommentSchema = new mongoose.Schema({
    channelName: {
        type:String,
        trim:true,
        required:true,
     
    },
    CommentBody:{
        type:String,
        default:""
    },
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
    required: true
  },
 video: {
    type: String,
  ref: "Video",
  required: true

  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  dislikes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }

})
const Comments = mongoose.model("Comments", CommentSchema)
export default Comments;