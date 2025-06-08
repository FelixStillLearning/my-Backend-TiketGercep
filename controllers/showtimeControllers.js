import Showtime from "../models/Showtime.js";

// Get all showtimes
export const getShowtimes = async (req, res) => {
  try {
    const showtimes = await Showtime.findAll();
    res.json(showtimes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get showtime by ID
export const getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });
    res.json(showtime);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new showtime
export const createShowtime = async (req, res) => {
  try {
    const { movie_id, studio_id, show_date, show_time, ticket_price } = req.body;
    const showtime = await Showtime.create({ movie_id, studio_id, show_date, show_time, ticket_price });
    res.status(201).json({ message: "Showtime created", showtime_id: showtime.showtime_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update showtime
export const updateShowtime = async (req, res) => {
  try {
    const { movie_id, studio_id, show_date, show_time, ticket_price } = req.body;
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });
    await showtime.update({ movie_id, studio_id, show_date, show_time, ticket_price });
    res.json({ message: "Showtime updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete showtime
export const deleteShowtime = async (req, res) => {
  try {
    const showtime = await Showtime.findByPk(req.params.id);
    if (!showtime) return res.status(404).json({ message: "Showtime not found" });
    await showtime.destroy();
    res.json({ message: "Showtime deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};