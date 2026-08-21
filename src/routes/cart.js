import express from "express";
import * as cartController from "../controllers/cart.js"
import authorizer from "../middlewares/authorizer.js";

const router = express.Router();


router.get("/cart", authorizer, cartController.getCart);

router.post("/cart", authorizer, cartController.addMovieToCart);

router.delete("/cart", authorizer, cartController.deleteMovieToCart);

export default router;