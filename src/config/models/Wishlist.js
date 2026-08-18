import mongoose, { model, Schema } from "mongoose";

const wishlistSchema = new Schema({
        userId: { type: String, required: true },
        movieId: { type: Number, required: true },
    },
    {
        timestamps: { createdAt: true, updatedAt: false}
    }
);
/* indice compuesto unico, si un usuario ya tiene esa peli no puede volver a añadirla
    |||
    VVV      */
    wishlistSchema.index(
    {
        userId: 1,
        movieId: 1,
    },
    {
        unique: true
    },
);

export const Wishlist = model("Wishlist", wishlistSchema);