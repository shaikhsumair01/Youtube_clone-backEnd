import Users from "../Model/user.model"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
dotenv.config();

export const registerUser = async(req, res) =>{
    try{
         // taking the name, email and password input from the user
        let { name, email, password } = req.body;

        if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
    }
    email = email.toLowerCase();

        // looking for existing users from the existing email
        
        const exisiting_user = await Users.findOne({ email: email });
        // if the user exists then return the message user already exists else create new user  
        if (exisiting_user) {
            return res.status(400).json({ message: "User already exist!" })
        } else {
            // creating a hash password for the user and storing them with user details
            const hashedPassword = await bcrypt.hash(password, 10);
            const user = new Users({ name, email, password:hashedPassword });
            await user.save();
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            return res.status(201).json({ message: "User added successfully", token });
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
            const token = jwt.sign({userId: user._id, userName: user.name, userEmail : user.email}, process.env.SECRET_KEY, {expiresIn:"1h"})
             res.status(200).json({ message: "Login Successful", token: token });
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
            const user = jwt.verify(token, process.env.SECRET_KEY)
            req.user = user; // attaching user info to req obj
            next() // processed to next route or middleware
        } catch (err) {
            return res.status(403).json({ message: "Invalid JWT Token!" })
        }
    }
}
    

