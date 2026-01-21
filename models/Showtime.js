import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Movie from "./Movie.js";
import Studio from "./Studio.js";
import e from "express";
const { DataTypes } = Sequelize;

const Showtime = db.define("Showtime", {
  showtime_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  movie_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Movie,
      key: "movie_id",
    },
    onDelete: "CASCADE",
  },
  studio_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Studio,
      key: "studio_id",
    },
    onDelete: "CASCADE",
  },
  show_date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  show_time: {
    type: DataTypes.TIME,
    allowNull: false,
  },
  ticket_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: "showtimes",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["movie_id", "studio_id", "show_date", "show_time"],
      name: "unique_showtime"
    },
    {
      fields: ["movie_id"],
      name: "idx_movie_id"
    },
    {
      fields: ["studio_id"],
      name: "idx_studio_id"
    },
    {
      fields: ["show_date"],
      name: "idx_show_date"
    },
    {
      fields: ["show_date", "show_time"],
      name: "idx_show_datetime"
    }
  ]
});

// Associations
Showtime.belongsTo(Movie, {
  foreignKey: "movie_id",
  onDelete: "CASCADE"
});
Showtime.belongsTo(Studio, {
  foreignKey: "studio_id",
  onDelete: "CASCADE"
});

export default Showtime;