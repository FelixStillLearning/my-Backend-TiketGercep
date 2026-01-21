import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./User.js";
import Showtime from "./Showtime.js";
import e from "express";
const { DataTypes } = Sequelize;

const Booking = db.define("Booking", {
  booking_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: "user_id",
    },
    onDelete: "CASCADE",
  },
  showtime_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Showtime,
      key: "showtime_id",
    },
    onDelete: "CASCADE",
  },
  booking_code: {
    type: DataTypes.STRING(20),
    unique: true,
    allowNull: false,
  },
  total_seats: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("pending", "confirmed", "cancelled"),
    defaultValue: "pending",
  },
  booking_date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: "bookings",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      fields: ["user_id"],
      name: "idx_user_id"
    },
    {
      fields: ["showtime_id"],
      name: "idx_showtime_id"
    },
    {
      fields: ["booking_code"],
      name: "idx_booking_code"
    },
    {
      fields: ["status"],
      name: "idx_status"
    },
    {
      fields: ["booking_date"],
      name: "idx_booking_date"
    }
  ]
});

// Associations
Booking.belongsTo(User, {
  foreignKey: "user_id",
  onDelete: "CASCADE"
});
Booking.belongsTo(Showtime, {
  foreignKey: "showtime_id",
  onDelete: "CASCADE"
});

export default Booking;

// (async() => {
//     await db.sync();
// })();
