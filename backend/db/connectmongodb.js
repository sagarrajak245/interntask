import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables

const connectMongoDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, { 
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to MongoDB: ${err.message}`);
        process.exit(1); // Exit the process with failure
    }
};

export default connectMongoDB;