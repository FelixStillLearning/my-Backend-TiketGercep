import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Showtime from '../models/Showtime.js';
import Movie from '../models/Movie.js';
import Studio from '../models/Studio.js';

// Get all bookings with JOIN
export const getBookings = async (req, res) => {
  try {
    console.log('=== FETCHING BOOKINGS WITH JOIN ===');
    
    const bookings = await Booking.findAll({
      include: [
        {
          model: User,
          attributes: ['user_id', 'username', 'full_name', 'email', 'phone'],
          required: false
        },
        {
          model: Showtime,
          // ✅ HAPUS 'price' KARENA TIDAK ADA DI DATABASE
          attributes: ['showtime_id', 'show_date', 'show_time'],
          required: false,
          include: [
            {
              model: Movie,
              attributes: ['movie_id', 'title'],
              required: false
            },
            {
              model: Studio,
              attributes: ['studio_id', 'studio_name', 'total_seats'],
              required: false
            }
          ]
        }
      ],
      order: [['created_at', 'DESC']]
    });

    console.log(`Found ${bookings.length} bookings`);

    // ✅ TRANSFORM DATA UNTUK FRONTEND
    const transformedBookings = bookings.map(booking => ({
      booking_id: booking.booking_id,
      user_id: booking.user_id,
      showtime_id: booking.showtime_id,
      booking_code: booking.booking_code,
      total_seats: booking.total_seats,
      total_price: booking.total_price,
      status: booking.status,
      booking_date: booking.booking_date,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      
      // ✅ DATA YANG DIBUTUHKAN FRONTEND
      customer_name: booking.User?.full_name || 'Unknown Customer',
      customer_email: booking.User?.email || '',
      customer_phone: booking.User?.phone || '',
      movie_title: booking.Showtime?.Movie?.title || 'Unknown Movie',
      studio_name: booking.Showtime?.Studio?.studio_name || 'Unknown Studio',
      show_date: booking.Showtime?.show_date || null,
      show_time: booking.Showtime?.show_time || null,
      // ✅ HAPUS showtime_price KARENA TIDAK ADA KOLOM PRICE
      
      // ✅ UNTUK SEATS COLUMN (sementara dari total_seats)
      seat_numbers: `Seat 1-${booking.total_seats}` // Placeholder
    }));

    console.log('Transformed bookings:', transformedBookings);
    res.json(transformedBookings);

  } catch (error) {
    console.error('Error in getBookings:', error);
    res.status(500).json({ 
      message: error.message,
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Get booking by ID with JOIN
export const getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_id', 'username', 'full_name', 'email', 'phone'],
          required: false
        },
        {
          model: Showtime,
          // ✅ HAPUS 'price' KARENA TIDAK ADA DI DATABASE
          attributes: ['showtime_id', 'show_date', 'show_time'],
          required: false,
          include: [
            {
              model: Movie,
              attributes: ['movie_id', 'title'],
              required: false
            },
            {
              model: Studio,
              attributes: ['studio_id', 'studio_name', 'total_seats'],
              required: false
            }
          ]
        }
      ]
    });

    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Transform data untuk frontend
    const transformedBooking = {
      booking_id: booking.booking_id,
      user_id: booking.user_id,
      showtime_id: booking.showtime_id,
      booking_code: booking.booking_code,
      total_seats: booking.total_seats,
      total_price: booking.total_price,
      status: booking.status,
      booking_date: booking.booking_date,
      created_at: booking.created_at,
      updated_at: booking.updated_at,
      
      // Data untuk frontend
      customer_name: booking.User?.full_name || 'Unknown Customer',
      customer_email: booking.User?.email || '',
      customer_phone: booking.User?.phone || '',
      movie_title: booking.Showtime?.Movie?.title || 'Unknown Movie',
      studio_name: booking.Showtime?.Studio?.studio_name || 'Unknown Studio',
      show_date: booking.Showtime?.show_date || null,
      show_time: booking.Showtime?.show_time || null,
      // ✅ HAPUS showtime_price
      seat_numbers: `Seat 1-${booking.total_seats}`
    };

    res.json(transformedBooking);
  } catch (error) {
    console.error('Error in getBookingById:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  try {
    const { user_id, showtime_id, booking_code, total_seats, total_price, status, booking_date } = req.body;
    const booking = await Booking.create({ 
      user_id, 
      showtime_id, 
      booking_code, 
      total_seats, 
      total_price, 
      status, 
      booking_date: booking_date || new Date()
    });
    res.status(201).json({ message: "Booking created", booking_id: booking.booking_id });
  } catch (error) {
    console.error('Error creating booking:', error);
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