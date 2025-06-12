import BookingSeat from '../models/BookingSeat.js';
import Booking from '../models/Booking.js';
import Seat from '../models/Seat.js';

// Get all booking seats
export const getBookingSeats = async (req, res) => {
  try {
    const bookingSeats = await BookingSeat.findAll();
    res.json(bookingSeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking seat by ID
export const getBookingSeatById = async (req, res) => {
  try {
    const bookingSeat = await BookingSeat.findByPk(req.params.id);
    if (!bookingSeat) return res.status(404).json({ message: "Booking seat not found" });
    res.json(bookingSeat);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking seats by booking ID
export const getBookingSeatsByBookingId = async (req, res) => {
  try {
    const bookingSeats = await BookingSeat.findAll({
      where: { booking_id: req.params.bookingId }
    });
    res.json(bookingSeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new booking seat
export const createBookingSeat = async (req, res) => {
  try {
    const { booking_id, seat_id } = req.body;
    const bookingSeat = await BookingSeat.create({ booking_id, seat_id });
    res.status(201).json({ message: "Booking seat created", booking_seat_id: bookingSeat.booking_seat_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update booking seat
export const updateBookingSeat = async (req, res) => {
  try {
    const { booking_id, seat_id } = req.body;
    const bookingSeat = await BookingSeat.findByPk(req.params.id);
    if (!bookingSeat) return res.status(404).json({ message: "Booking seat not found" });
    await bookingSeat.update({ booking_id, seat_id });
    res.json({ message: "Booking seat updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete booking seat
export const deleteBookingSeat = async (req, res) => {
  try {
    const bookingSeat = await BookingSeat.findByPk(req.params.id);
    if (!bookingSeat) return res.status(404).json({ message: "Booking seat not found" });
    await bookingSeat.destroy();
    res.json({ message: "Booking seat deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booked seats by showtime ID
export const getBookedSeatsByShowtimeId = async (req, res) => {
  try {
    const { showtimeId } = req.params;
    
    // Get all bookings for this showtime
    const bookings = await Booking.findAll({
      where: { 
        showtime_id: showtimeId,
        status: 'confirmed' // Only confirmed bookings
      }
    });
    
    // Get all booking seat records for these bookings
    const bookingIds = bookings.map(booking => booking.booking_id);
    const bookingSeats = await BookingSeat.findAll({
      where: { booking_id: bookingIds },
      include: [{ 
        model: Seat, 
        attributes: ['seat_id', 'seat_row', 'seat_number', 'seat_label'] 
      }]
    });
    
    res.json(bookingSeats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
