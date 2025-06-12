import express from "express";
import {
  getBookingSeats,
  getBookingSeatById,
  getBookingSeatsByBookingId,
  getBookedSeatsByShowtimeId,
  createBookingSeat,
  updateBookingSeat,
  deleteBookingSeat,
} from "../controllers/bookingSeatControllers.js";

const router = express.Router();

router.get("/booking-seats", getBookingSeats);
router.get("/booking-seats/:id", getBookingSeatById);
router.get("/bookings/:bookingId/seats", getBookingSeatsByBookingId);
router.get("/showtimes/:showtimeId/booked-seats", getBookedSeatsByShowtimeId);
router.post("/booking-seats", createBookingSeat);
router.put("/booking-seats/:id", updateBookingSeat);
router.patch("/booking-seats/:id", updateBookingSeat);
router.delete("/booking-seats/:id", deleteBookingSeat);

export default router;
