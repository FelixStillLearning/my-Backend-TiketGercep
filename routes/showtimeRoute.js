import express from "express";
import {
  getShowtimes,
  getShowtimeById,
  createShowtime,
  updateShowtime,
  deleteShowtime,
} from "../controllers/showtimeControllers.js";

const router = express.Router();

router.get("/showtimes", getShowtimes);
router.get("/showtimes/:id", getShowtimeById);
router.post("/showtimes", createShowtime);
router.put("/showtimes/:id", updateShowtime);
router.patch("/showtimes/:id", updateShowtime);
router.delete("/showtimes/:id", deleteShowtime);

export default router;