import express from "express";
import {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieControllers.js";
import upload from "../middleware/upload.js"; // ✅ PERBAIKI INI - tambah default import

const router = express.Router();

router.get("/movies", getMovies);
router.get("/movies/:id", getMovieById);
router.post('/movies', upload.single('poster'), createMovie);
router.patch('/movies/:id', upload.single('poster'), updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;