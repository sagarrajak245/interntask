import express from "express";
import connectMongoDB from "./db/connectmongodb.js"; // Import the MongoDB connection function
import parentRoutes from "./routes/parentRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import replyRoutes from "./routes/replyRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import circleRoutes from "./routes/circleRoutes.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

// Use routes
app.use("/api/parents", parentRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/replies", replyRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/circles", circleRoutes);

// Connect to MongoDB
connectMongoDB().then(() => {
    app.listen(5000, () => {
        console.log("Server is running on port 5000"); // Corrected port number in the log message
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB:", err);
}); 