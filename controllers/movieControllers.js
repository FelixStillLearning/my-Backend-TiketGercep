import Movie from "../models/Movie.js";

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const { status } = req.query;
    
    let whereClause = {};
    if (status) {
      whereClause.status = status;
    }
    
    const movies = await Movie.findAll({
      where: whereClause
    });
    
    // Process poster URLs to ensure they're complete URLs
    const processedMovies = movies.map(movie => {
      const movieData = movie.toJSON();
      
      // Check if poster_url starts with http(s)
      if (movieData.poster_url && !movieData.poster_url.match(/^https?:\/\//)) {
        // If it's a local file without protocol, add the full server URL
        // Check if it already has /uploads/posters prefix
        if (movieData.poster_url.startsWith('/uploads/posters/')) {
          movieData.poster_url = `http://localhost:5000${movieData.poster_url}`;
        } else {
          movieData.poster_url = `http://localhost:5000/uploads/posters/${movieData.poster_url}`;
        }
      }
      
      return movieData;
    });
    
    res.json(processedMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    
    // Process poster URL to ensure it's a complete URL
    const movieData = movie.toJSON();
    
    // Check if poster_url starts with http(s)
    if (movieData.poster_url && !movieData.poster_url.match(/^https?:\/\//)) {
      // If it's a local file without protocol, add the full server URL
      // Check if it already has /uploads/posters prefix
      if (movieData.poster_url.startsWith('/uploads/posters/')) {
        movieData.poster_url = `http://localhost:5000${movieData.poster_url}`;
      } else {
        movieData.poster_url = `http://localhost:5000/uploads/posters/${movieData.poster_url}`;
      }
    }
    
    res.json(movieData);
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