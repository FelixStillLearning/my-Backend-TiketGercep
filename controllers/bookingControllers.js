import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Showtime from '../models/Showtime.js';
import Movie from '../models/Movie.js';
import BookingSeat from '../models/BookingSeat.js';
import Seat from '../models/Seat.js';

// Get all bookings
export const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['username', 'email', 'full_name']
        },
        {
          model: Showtime,
          include: [{
            model: Movie,
            attributes: ['title', 'genre', 'duration']
          }]
        },
        {
          model: BookingSeat,
          include: [{
            model: Seat,
            attributes: ['seat_number', 'seat_row', 'seat_label']
          }]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get booking by ID
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['username', 'email', 'full_name']
        },
        {
          model: Showtime,
          include: [{
            model: Movie,
            attributes: ['title', 'genre', 'duration']
          }]
        },
        {
          model: BookingSeat,
          include: [{
            model: Seat,
            attributes: ['seat_number', 'seat_row', 'seat_label']
          }]
        }
      ]
    });
    if (!booking) return res.status(404).json({ message: "Booking not found" });
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date, seats } = req.body;
    
    // Create the booking
    const booking = await Booking.create({ 
      user_id, 
      showtime_id, 
      booking_code, 
      total_seats, 
      total_price, 
      status, 
      booking_date 
    });
    
    // If seats are provided, create booking seats
    if (seats && seats.length > 0) {
      const BookingSeat = (await import('../models/BookingSeat.js')).default;
      
      const bookingSeats = seats.map(seat_id => ({
        booking_id: booking.booking_id,
        seat_id: seat_id
      }));
      
      await BookingSeat.bulkCreate(bookingSeats);
    }
    
    res.status(201).json({ 
      message: "Booking created", 
      booking_id: booking.booking_id,
      booking_code: booking.booking_code
    });
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

// Get bookings by user ID
export const getBookingsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const bookings = await Booking.findAll({
      where: { user_id: userId },
      include: [
        {
          model: User,
          attributes: ['username', 'email', 'full_name']
        },
        {
          model: Showtime,
          include: [{
            model: Movie,
            attributes: ['title', 'genre', 'duration']
          }]
        },
        {
          model: BookingSeat,
          include: [{
            model: Seat,
            attributes: ['seat_number', 'seat_row', 'seat_label']
          }]
        }
      ],
      order: [['created_at', 'DESC']]
    });
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};