import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import e from "express";
const { DataTypes } = Sequelize;

const Studio = db.define("Studio", {
  studio_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  studio_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  rows: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seats_per_row: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: "studios",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
});

export default Studio;

// (async() => {
//     await db.sync();
// })();
