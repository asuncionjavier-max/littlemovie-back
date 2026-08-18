import mongoose, { now } from "mongoose";


export const reviewSchema = new mongoose.Schema(
    {
        movieId:{ type: Number, required: true }, 

        userId:{ type: String, required: true },
    
        movieName: { type: String, required: true },
    
        comment:{ type: String, default: "" },
    
        rating: { type: Number, min: 1, max: 10, required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false },
    }
)

export const Review = mongoose.model("Review", reviewSchema);