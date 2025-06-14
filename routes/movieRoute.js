import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieControllers.js";

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.post("/movies", createMovie);
router.put("/movies/:id", updateMovie);
router.patch("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;