import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Studio from "./Studio.js";
import e from "express";
const { DataTypes } = Sequelize;

const Seat = db.define("Seat", {
  seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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
  seat_row: {
    type: DataTypes.CHAR(1),
    allowNull: false,
  },
  seat_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  seat_label: {
    type: DataTypes.STRING(5),
    allowNull: false,
    comment: "Example: A1, A2, B1, etc.",
  },
}, {
  tableName: "seats",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["studio_id", "seat_row", "seat_number"],
      name: "unique_seat"
    },
    {
      fields: ["studio_id"],
      name: "idx_studio_id"
    },
    {
      fields: ["seat_label"],
      name: "idx_seat_label"
    }
  ]
});

// Association
Seat.belongsTo(Studio, {
  foreignKey: "studio_id",
  onDelete: "CASCADE"
});

export default Seat;

// (async() => {
//     await db.sync();
// })();
