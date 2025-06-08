import Booking from '../models/Booking.js';

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll();
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date } = req.body;
    const booking = await Booking.create({ user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date });
    res.status(201).json({ message: "Booking created", booking_id: booking.booking_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking
export const updateBooking = async (req, res) => {
  try {
    const { user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date } = req.body;
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await booking.update({ user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date });
    res.json({ message: "Booking updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    await booking.destroy();
    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};