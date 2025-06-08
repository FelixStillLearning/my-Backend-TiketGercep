import express from "express";
import {
  getSeats,
  getSeatById,
  createSeat,
  updateSeat,
  deleteSeat,
} from "../controllers/seatControllers.js";

const router = express.Router();

router.get("/seats", getSeats);
router.get("/seats/:id", getSeatById);
router.post("/seats", createSeat);
router.put("/seats/:id", updateSeat);
router.patch("/seats/:id", updateSeat);
router.delete("/seats/:id", deleteSeat);

export default router;