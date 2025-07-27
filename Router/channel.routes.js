import { createChannel, getChannelById} from "./Controllers/channel.controller";
import { verifyToken } from "./Controllers/user.controller";
export default function channelRoute(app){
    app.post("/createChannel", verifyToken , createChannel)
    app.get("/getChannel", getChannelById)
}