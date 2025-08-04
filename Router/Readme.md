# 🎬 YouTube Clone Backend

This is the backend API for a YouTube Clone application, built with **Express.js** and **MongoDB**. It handles user authentication, video management, and supports full CRUD operations. Designed to integrate seamlessly with a responsive React frontend.

---

## 🚀 Features

- 🔐 **User Authentication** (JWT-based)
- 📹 **Video CRUD Operations for user channel**
-🧑‍💬 **Comment CRUD Operations**
-📺 **Creating Channel and viewing channel**
- 🧠 **Middleware for Token Validation**
- 📁 **MongoDB Integration with Mongoose**
- 📊 **Structured Error Handling**
- 📦 **RESTful API Design**

---

## 🛠️ Tech Stack

| Layer        | Technology        |
|--------------|-------------------|
| Server       | Express.js        |
| Database     | MongoDB + Mongoose|
| Auth         | JWT               |
| Styling      | N/A (Backend only)|
| Dev Tools    |Nodemon            |
| Testing      |ThunderClient      |

---

## 📂 Project Structure

-Router
    -Controllers
        -channel.controller.js
        -Comment.controller.js
        -user.controller.js
        -video.controller.js
    -Model
        -channel.model.js
        -Comment.model.js
        -user.model.js
        -video.model.js
    -channel.routes.js
    -comment.routes.js
    -video.routes.js
    -user.routes.js
    -db.js
    -server.js

## 🔧 Setup Instructions

1. **Clone the repository**
   ```bash
-   git clone https://github.com/shaikhsumair01/Youtube_clone-backEnd.git
   cd Youtube-clone-backend
   
2. **Install Dependencies**
    npm init
    npm install
    <!-- Install these dependencies -->
    npm install express nodemon jsonwebtoken mongoose cors dotenv bcrypt
    npm install --save-dev nodemon



3. **Configure your .env file:**    
-   Create a .env file in the root directory with the following keys:

-    Port=3300
# MongoDB Configuration
-    MONGO_USERNAME=your_mongo_username
-    MONGO_PASSWORD=your_mongo_password
-    MONGO_DBNAME=your_database_name
-    MONGO_CLUSTER=your_cluster_url

# JWT Secret
- SECRET_KEY=your_jwt_secret

# Note: You can construct your MongoDB URI like this:
- const uri = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_CLUSTER}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
    
4. **Run the server**
    npm start

5. **Start the server at frontEnd (Refer to Youtube_Clone-Frontend) which runs at port 5173**


## 📡API Endpoints:
**User Routes**
- Post: /register : to regsiter new user
- Post: /login : to login existing user

**Video Routes**
- Post: /uploadVideo : to upload a new the video
- Get: /getAllVideos : to fetch all the videos
- Put:/updateVideo/:id : to update video by id
- Delete:/deleteVideo/:id : to delete video by id

**Channel Routes**
- Post: /createChannel : to create a new channel 
- Get: /getChannel/:channelId : to get a channel by id
- Get:/getMyChannel : to get the current logged in user's channel

**Comment Routes**
- Post: /addComments : to add new comments
- Get: /getComments/:id : to get comments by videoId (getting the comments of a particular video)
- Put: /updateComment/:commentId : updating the comment from it's id
- Delete: /deleteComment/:commentId: deleting the comment from it's id

## 🧪Testing
- Used Thunder Client to test endpoints. Included JWT to protect all the routes

## 🛡️ Security
- Passwords are hashed using bcrypt
- Protected routes use JWT middleware
- Input validation and error handling included


# 📌 Future Improvements:
    1) Deployed the backend on Render on https://youtube-clone-backend-6b23.onrender.com. Will connect the render with the frontend and deploy it on vercel.
    2) creating Analytic dashboard for analysing the video data viewed by the user and and filters based on user preferences.


#   📄 License
This project is licensed under the MIT License.

#   🙌 Acknowledgments
Inspired by the YouTube platform and built to practice full-stack development skills.
