import Seat from "../models/Seat.js";

// Get all seats
export const getSeats = async (req, res) => {
  try {
    const seats = await Seat.findAll();
    res.json(seats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get seat by ID
export const getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    res.json(seat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new seat
export const createSeat = async (req, res) => {
  try {
    const { studio_id, seat_row, seat_number, seat_label } = req.body;
    const seat = await Seat.create({ studio_id, seat_row, seat_number, seat_label });
    res.status(201).json({ message: "Seat created", seat_id: seat.seat_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update seat
export const updateSeat = async (req, res) => {
  try {
    const { studio_id, seat_row, seat_number, seat_label } = req.body;
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    await seat.update({ studio_id, seat_row, seat_number, seat_label });
    res.json({ message: "Seat updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete seat
export const deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findByPk(req.params.id);
    if (!seat) return res.status(404).json({ message: "Seat not found" });
    await seat.destroy();
    res.json({ message: "Seat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};