import express from "express";
import authorizer from "../middlewares/authorizer.js";
import * as checkoutController from "../controllers/checkout.js"

const router = express.Router();

router.post("/checkout", authorizer,checkoutController.checkoutCart);

export default router;
