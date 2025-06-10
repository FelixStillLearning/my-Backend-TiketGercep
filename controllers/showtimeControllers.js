import Showtime from "../models/Showtime.js";
import Movie from "../models/Movie.js";
import Studio from "../models/Studio.js";
import { Op } from "sequelize";

// Get all showtimes WITH JOIN
export const getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.findAll({
      include: [
        {
          model: Movie,
          attributes: ['movie_id', 'title']
        },
        {
          model: Studio,
          attributes: ['studio_id', 'studio_name', 'total_seats']
        }
      ],
      order: [['show_date', 'ASC'], ['show_time', 'ASC']]
    });

    console.log('Raw showtimes from DB:', JSON.stringify(showtimes, null, 2)); // Debug

    // Transform data untuk frontend
    const transformedShowtimes = showtimes.map(showtime => ({
      showtime_id: showtime.showtime_id,
      movie_id: showtime.movie_id,
      studio_id: showtime.studio_id,
      show_date: showtime.show_date,
      show_time: showtime.show_time,
      price: showtime.ticket_price,
      movie_title: showtime.Movie?.title || 'No Movie',
      studio_name: showtime.Studio?.studio_name || 'No Studio',
      total_seats: showtime.Studio?.total_seats || 0
    }));

    console.log('Transformed showtimes:', transformedShowtimes); // Debug

    res.json(transformedShowtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ message: error.message });
  }
};

// Get showtime by ID WITH JOIN
export const getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id, {
      include: [
        {
          model: Movie,
          attributes: ['movie_id', 'title']
        },
        {
          model: Studio,
          attributes: ['studio_id', 'studio_name', 'total_seats']
        }
      ]
    });

    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Transform data
    const transformedShowtime = {
      showtime_id: showtime.showtime_id,
      movie_id: showtime.movie_id,
      studio_id: showtime.studio_id,
      show_date: showtime.show_date,
      show_time: showtime.show_time,
      price: showtime.ticket_price,
      movie_title: showtime.Movie?.title || 'N/A',
      studio_name: showtime.Studio?.studio_name || 'N/A',
      total_seats: showtime.Studio?.total_seats || 0
    };

    res.json(transformedShowtime);
  } catch (error) {
    console.error('Error fetching showtime:', error);
    res.status(500).json({ message: error.message });
  }
};

// Create new showtime
export const createShowtime = async (req, res) => {
  try {
    const { movie_id, studio_id, show_date, show_time, price } = req.body;
    
    // Validasi input
    if (!movie_id || !studio_id || !show_date || !show_time || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Cek duplicate showtime
    const existingShowtime = await Showtime.findOne({
      where: {
        studio_id,
        show_date,
        show_time
      }
    });

    if (existingShowtime) {
      return res.status(409).json({ 
        message: "This studio already has a showtime at this date and time" 
      });
    }

    const showtime = await Showtime.create({ 
      movie_id, 
      studio_id, 
      show_date, 
      show_time, 
      ticket_price: price // Field database menggunakan ticket_price
    });
    
    res.status(201).json({ 
      message: "Showtime created successfully", 
      showtime_id: showtime.showtime_id 
    });
  } catch (error) {
    console.error('Error creating showtime:', error);
    res.status(400).json({ message: error.message });
  }
};

// Update showtime
export const updateShowtime = async (req, res) => {
  try {
    const { movie_id, studio_id, show_date, show_time, price } = req.body;
    const showtime = await Showtime.findByPk(req.params.id);
    
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }

    // Cek duplicate untuk update (exclude current record)
    const existingShowtime = await Showtime.findOne({
      where: {
        studio_id,
        show_date,
        show_time,
        showtime_id: { 
          [Op.ne]: req.params.id // Exclude current record
        }
      }
    });

    if (existingShowtime) {
      return res.status(409).json({ 
        message: "This studio already has a showtime at this date and time" 
      });
    }
    
    await showtime.update({ 
      movie_id, 
      studio_id, 
      show_date, 
      show_time, 
      ticket_price: price 
    });
    
    res.json({ message: "Showtime updated successfully" });
  } catch (error) {
    console.error('Error updating showtime:', error);
    res.status(400).json({ message: error.message });
  }
};

// Delete showtime
export const deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) {
      return res.status(404).json({ message: "Showtime not found" });
    }
    
    await showtime.destroy();
    res.json({ message: "Showtime deleted successfully" });
  } catch (error) {
    console.error('Error deleting showtime:', error);
    res.status(500).json({ message: error.message });
  }
};