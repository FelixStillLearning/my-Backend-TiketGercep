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
    type: DataTypes.ENUM("G", "PG-13", "R", "NC-17"),
    allowNull: false,
  },
  poster_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
  },
  trailer_url: {
    type: DataTypes.STRING(500),
    allowNull: true,
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