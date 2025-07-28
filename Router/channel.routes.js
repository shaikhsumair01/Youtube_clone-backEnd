import { createChannel, getChannelById} from "./Controllers/channel.controller.js";
import { verifyToken } from "./Controllers/user.controller.js";
export default function channelRoute(app){
    app.post("/createChannel", verifyToken , createChannel)
    app.get("/getChannel/:channelId", getChannelById)
}