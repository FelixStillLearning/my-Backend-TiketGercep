import { Sequelize } from "sequelize";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const main = async () => {
  try {
    // Create a connection to the database
    const sequelize = new Sequelize('db_tiketgercep', 'root', '', {
      host: 'localhost',
      dialect: 'mysql'
    });

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    // Get all poster files from the uploads/posters directory
    const postersDir = path.join(__dirname, 'uploads', 'posters');
    const posterFiles = fs.readdirSync(postersDir);
    console.log('Poster files in directory:', posterFiles);

    // Get all movies from the database
    const [movies] = await sequelize.query('SELECT movie_id, title, poster_url FROM movies');
    console.log('Movies in database:', movies);

    // Update each movie with a local poster file
    for (let i = 0; i < Math.min(movies.length, posterFiles.length); i++) {
      const movie = movies[i];
      const posterFile = posterFiles[i];

      console.log(`Updating movie ${movie.movie_id} (${movie.title}) with poster: ${posterFile}`);
      
      await sequelize.query('UPDATE movies SET poster_url = ? WHERE movie_id = ?', {
        replacements: [posterFile, movie.movie_id]
      });
    }

    // Get updated movies
    const [updatedMovies] = await sequelize.query('SELECT movie_id, title, poster_url FROM movies');
    console.log('Updated movies:', updatedMovies);

    await sequelize.close();
    console.log('Database connection closed.');
  } catch (error) {
    console.error('Error:', error);
  }
};

main();
