import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Booking from "./Booking.js";
import Seat from "./Seat.js";

const { DataTypes } = Sequelize;

const BookingSeat = db.define("BookingSeat", {
  booking_seat_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  booking_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Booking,
      key: "booking_id",
    },
    onDelete: "CASCADE",
  },
  seat_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Seat,
      key: "seat_id",
    },
    onDelete: "CASCADE",
  },
}, {
  tableName: "booking_seats",
  timestamps: true,
  createdAt: "created_at",
  updatedAt: "updated_at",
  indexes: [
    {
      unique: true,
      fields: ["booking_id", "seat_id"],
      name: "unique_booking_seat"
    },
    {
      fields: ["booking_id"],
      name: "idx_booking_id"
    },
    {
      fields: ["seat_id"],
      name: "idx_seat_id"
    }
  ]
});

// Associations
BookingSeat.belongsTo(Booking, {
  foreignKey: "booking_id",
  onDelete: "CASCADE"
});

BookingSeat.belongsTo(Seat, {
  foreignKey: "seat_id",
  onDelete: "CASCADE"
});

export default BookingSeat;
