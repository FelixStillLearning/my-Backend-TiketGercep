import Movie from "../models/Movie.js";

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    res.json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new movie
export const createMovie = async (req, res) => {
  try {
    const { title, synopsis, duration, genre, rating, poster_url, trailer_url, status, release_date } = req.body;
    const movie = await Movie.create({ title, synopsis, duration, genre, rating, poster_url, trailer_url, status, release_date });
    res.status(201).json({ message: "Movie created", movie_id: movie.movie_id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    const { title, synopsis, duration, genre, rating, poster_url, trailer_url, status, release_date } = req.body;
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.update({ title, synopsis, duration, genre, rating, poster_url, trailer_url, status, release_date });
    res.json({ message: "Movie updated" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    await movie.destroy();
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};