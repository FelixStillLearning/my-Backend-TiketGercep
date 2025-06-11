import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import e from "express";
const { DataTypes } = Sequelize;

const Movie = db.define("Movie", {
  movie_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  synopsis: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  rating: {
    type: DataTypes.ENUM("G", "PG", "PG-13", "R", "NC-17"),
    allowNull: false,
  },
  poster_url: {
    type: DataTypes.STRING(500), // ✅ STRING untuk menyimpan path file
    allowNull: true,
    // Contoh: "uploads/posters/poster-1234567890.jpg"
  },
  trailer_url: {
    type: DataTypes.STRING(500), // ✅ STRING untuk URL YouTube/Vimeo
    allowNull: true,
    // Contoh: "https://www.youtube.com/watch?v=abc123"
  },
  status: {
    type: DataTypes.ENUM("now_playing", "coming_soon", "ended"),
    allowNull: false,
  },
  release_date: {
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
}, {
  tableName: "movies",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Movie;