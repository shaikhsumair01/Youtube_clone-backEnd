import { deleteVideo, getAllVideos, updateVideo, uploadVideo } from "./Controllers/video.controller.js";

export default function videoRoute(app){
    app.post("/uploadVideo", uploadVideo);
    app.get("/getAllVideos", getAllVideos);
    app.put("/updateVideo/:id", updateVideo);
    app.delete("/deleteVideo/:id", deleteVideo);
}
