import { deleteComment, fetchComments, postNewComment, updateComment } from "./Controllers/Comment.controller.js";
import { verifyToken } from "./Controllers/user.controller.js";

export default function CommentRoute(app){
    app.get("/getComments/:id", fetchComments)
    app.post("/addComments",verifyToken, postNewComment)
    app.put("/updateComment/:commentId",verifyToken,updateComment)
    app.delete("/deleteComment/:commentId", verifyToken,deleteComment)
} 