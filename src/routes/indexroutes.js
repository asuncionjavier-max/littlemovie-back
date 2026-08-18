import express from "express"
import movies from "./movies.js"
import auth from "./auth.js";
import users from "./users.js"
import wishlist from "./Wishlist.js"
const router = express.Router()

router.get("/health", (req,res) =>{

    return res.status(200).send("Estamos en el aire")
});

router.use(movies)

router.use(auth)

router.use(users)

router.use(wishlist)

export default router;
