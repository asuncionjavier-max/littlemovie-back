import express from "express"
import movies from "./movies.js"
import auth from "./auth.js";
import users from "./users.js"

const router = express.Router()

router.get("/health", (req,res) =>{

    res.status(200).send("Estamos en el aire")
});

router.use(movies)

router.use(auth)

router.use(users)

export default router;
