import { loginUser, registerUser } from "./Controllers/user.controller.js";
export default function userRoute(app){
app.post("/register", registerUser)
app.post("/login", loginUser)
}