import express from "express"
import * as usersController from "../controllers/users.js"
import authorizer from "../middlewares/authorizer.js"

const router = express.Router();

router.get("/profile", authorizer, usersController.getMe);

router.delete("/profile", authorizer, usersController.deleteAcount);

export default router;