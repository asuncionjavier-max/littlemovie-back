import express from "express"
import movies from "./movies.js"
import auth from "./auth.js";

const router = express.Router()

router.get("/health", (req,res) =>{

    res.status(200).send("Estamos en el aire")
});

router.use(movies)

router.use(auth)

export default router;
