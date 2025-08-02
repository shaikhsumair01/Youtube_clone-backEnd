import Users from "../Model/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async(req, res) =>{
    try{
         // taking the name, email and password input from the user

        let { username, email, password } = req.body;
        console.log("Incoming data:", req.body);


        if (!username || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
    }
    // validating email
    email = email.toLowerCase();
    // emailRegex checks if the email address contains symbols such as @ or other symbols
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
  return res.status(400).json({ message: "Invalid email format, Email should contain @ and . symbols" });
    }
// Domain whitelisting for the emails. This will check whether the email address has gmail.com extension or not
const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com"];
const domain = email.split("@")[1];

if (!allowedDomains.includes(domain)) {
  return res.status(400).json({ message: "Email domain not allowed, only gmail.com, yahoo.com and outlook.com domains accepted" });
}

        // looking for existing users from the existing email
        
        const exisiting_user = await Users.findOne({ email: email });
        // if the user exists then return the message user already exists else create new user  
        if (exisiting_user) {
            return res.status(409).json({ message: "User already exist!" })
        } else {
            // creating a hash password for the user and storing them with user details and giving the token for 1 day
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({ username, email, password:hashedPassword });
            await user.save();
            const token = jwt.sign({ userId: user._id, userName: user.username, userEmail: user.email }, process.env.Secret_Key, { expiresIn: '1d' });
            return res.status(201).json({ message: "User added successfully", token,  
    user: {
    id: user._id,
    username: user.username,
    email: user.email
  }
 });
        }
    } catch (err) {
        

       console.error("Registration error:", err); 
        return res.status(500).json({ message: `Cannot add the user details due to server error.` });
    }
};

// loging the user in by verifying user credientials
export const loginUser = async (req, res) =>{
    try{
        // getting the user inputs from req.body
        const {email, password} = req.body;
        // searching for user's email 
       const user = await Users.findOne({ email: email.toLowerCase() });

        // if the user doesn't exist we return a message stating invalid user otherwise we provide them jwt token for signing in
        if(!user){
            return res.status(404).json({message: "The provided User does not exist"})
        }
        // using bcrypt to compare the password
         const isPasswordValid = await bcrypt.compare(password, user.password);

        //  if the password is valid then give the token
        if (isPasswordValid){
            const token = jwt.sign({userId: user._id, userName: user.username, userEmail : user.email}, process.env.Secret_Key, {expiresIn:"1d"})
             res.status(200).json({ message: "Login Successful", token: token,  user: { id: user._id, username: user.username, email: user.email }
 });
        }
        // else return error message
        else {
         return res.status(401).json({ message: "Invalid credentials" });
        }

    }
    catch(err){
         console.error("Login error:", err);

         return res.status(500).json({ message: `Cannot fetch the user details due to server error.`});
    }
}

// creating a verification middleware for the api:
export const verifyToken = (req, res, next) =>{
      
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: "Can't find the jwt token on your api headers!" })
    } else {
        try {
            const token = authHeader.split(" ")[1];
            const user = jwt.verify(token, process.env.Secret_Key)
            req.user = user; // attaching user info to req obj
            console.log("Decoded user:", req.user);

            next() // processed to next route or middleware
        } catch (err) {
            return res.status(403).json({ message: "Invalid JWT Token!" })
        }
    }
}
    

