import { verifyToken } from "./Controllers/user.controller.js";
import { deleteVideo, getAllVideos, updateVideo, uploadVideo } from "./Controllers/video.controller.js";

export default function videoRoute(app){
    app.post("/uploadVideo",verifyToken, uploadVideo);
    app.get("/getAllVideos", getAllVideos);
    app.put("/updateVideo/:id",verifyToken, updateVideo);
    app.delete("/deleteVideo/:id",verifyToken, deleteVideo);
}
