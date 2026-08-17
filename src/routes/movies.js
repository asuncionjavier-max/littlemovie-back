import express from "express"
import * as moviesController from "../controllers/movies.js";
import { requireAdmin } from "../middlewares/requireRole.js";


const router = express.Router();

router.get("/movies", moviesController.getMovies)

router.get("/movies/:id", moviesController.getMovieById)

router.post("/movies", requireAdmin, moviesController.addMovie)

router.patch("/movies/:id", requireAdmin, moviesController.updateMovie)

router.delete("/movies/:id",requireAdmin,  moviesController.deleteMovie)

export default router;