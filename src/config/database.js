import mongoose from "mongoose";
import "dotenv/config";

export const dbConnect = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("> success connecting database")
        
    } catch (error) {
        console.error("> error connecting database")
        
    }
};