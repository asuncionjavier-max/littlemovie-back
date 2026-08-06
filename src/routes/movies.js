import express from "express"
import * as moviesController from "../controllers/movies.js";


const router = express.Router();

router.get("/movies", moviesController.getMovies)

router.get("/movies/:id", moviesController.getMovieById)

router.post("/movies", moviesController.addMovie)

router.patch("/movies/:id", moviesController.updateMovie)



router.delete("/movies/:id", moviesController.deleteMovie)

export default router;