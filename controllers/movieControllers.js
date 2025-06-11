import Movie from "../models/Movie.js";
import path from 'path';
import fs from 'fs';

// Get all movies
export const getMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    // Transform poster URLs untuk frontend
    const moviesWithPosterURL = movies.map(movie => ({
      ...movie.toJSON(),
      poster_url: movie.poster_url ? `http://localhost:5000/${movie.poster_url}` : null
    }));
    res.json(moviesWithPosterURL);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });
    
    // Transform poster URL
    const movieData = {
      ...movie.toJSON(),
      poster_url: movie.poster_url ? `http://localhost:5000/${movie.poster_url}` : null
    };
    
    res.json(movieData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new movie
export const createMovie = async (req, res) => {
  try {
    const { title, synopsis, duration, genre, rating, trailer_url, status, release_date } = req.body;
    
    // Handle poster upload
    const poster_url = req.file ? req.file.path.replace(/\\/g, '/') : null;
    
    const movie = await Movie.create({ 
      title, 
      synopsis, 
      duration, 
      genre, 
      rating, 
      poster_url, 
      trailer_url, 
      status, 
      release_date 
    });
    
    res.status(201).json({ 
      message: "Movie created", 
      movie_id: movie.movie_id,
      poster_url: poster_url ? `http://localhost:5000/${poster_url}` : null
    });
  } catch (error) {
    // Hapus file jika error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: error.message });
  }
};

// Update movie
export const updateMovie = async (req, res) => {
  try {
    console.log('=== UPDATE MOVIE DEBUG ===');
    console.log('Movie ID:', req.params.id);
    console.log('Body:', req.body);
    console.log('File:', req.file);
    console.log('=========================');

    const { title, synopsis, duration, genre, rating, trailer_url, status, release_date } = req.body;
    const movie = await Movie.findByPk(req.params.id);
    
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    let poster_url = movie.poster_url;

    // Jika ada file upload baru
    if (req.file) {
      // Hapus poster lama jika ada
      if (movie.poster_url && fs.existsSync(movie.poster_url)) {
        fs.unlinkSync(movie.poster_url);
      }
      poster_url = req.file.path.replace(/\\/g, '/');
    }

    await movie.update({ 
      title, 
      synopsis, 
      duration, 
      genre, 
      rating, 
      poster_url, 
      trailer_url: trailer_url || movie.trailer_url, // ✅ Keep old value if not provided
      status, 
      release_date: release_date || movie.release_date // ✅ Keep old value if not provided
    });

    res.json({ 
      message: "Movie updated successfully",
      movie_id: movie.movie_id,
      poster_url: poster_url ? `http://localhost:5000/${poster_url}` : null
    });
  } catch (error) {
    console.error('Update movie error:', error); // ✅ Debug
    // Hapus file jika error
    if (req.file) {
      fs.unlinkSync(req.file.path);
    }
    res.status(400).json({ message: error.message });
  }
};

// Delete movie
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // Hapus file poster jika ada
    if (movie.poster_url && fs.existsSync(movie.poster_url)) {
      fs.unlinkSync(movie.poster_url);
    }

    await movie.destroy();
    res.json({ message: "Movie deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};