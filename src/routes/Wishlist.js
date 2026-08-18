import express from "express";
import * as wishlistController from "../controllers/Wishlist.js"
import authorizer from "../middlewares/authorizer.js"

const router = express.Router();

router.get("/wishlist",authorizer, wishlistController.getWishlist)

router.post("/wishlist", authorizer, wishlistController.addWish);

router.delete("/wishlist/:movieId",authorizer, wishlistController.deleteWish);

export default router