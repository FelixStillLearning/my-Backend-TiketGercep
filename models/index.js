// Model associations and relationships
import User from './User.js';
import Movie from './Movie.js';
import Studio from './Studio.js';
import Seat from './Seat.js';
import Showtime from './Showtime.js';
import Booking from './Booking.js';
import BookingSeat from './BookingSeat.js';

// User - Booking relationships (One to Many)
User.hasMany(Booking, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});
Booking.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

// Movie - Showtime relationships (One to Many)
Movie.hasMany(Showtime, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE'
});
Showtime.belongsTo(Movie, {
  foreignKey: 'movie_id',
  onDelete: 'CASCADE'
});

// Studio - Showtime relationships (One to Many)
Studio.hasMany(Showtime, {
  foreignKey: 'studio_id',
  onDelete: 'CASCADE'
});
Showtime.belongsTo(Studio, {
  foreignKey: 'studio_id',
  onDelete: 'CASCADE'
});

// Studio - Seat relationships (One to Many)
Studio.hasMany(Seat, {
  foreignKey: 'studio_id',
  onDelete: 'CASCADE'
});
Seat.belongsTo(Studio, {
  foreignKey: 'studio_id',
  onDelete: 'CASCADE'
});

// Showtime - Booking relationships (One to Many)
Showtime.hasMany(Booking, {
  foreignKey: 'showtime_id',
  onDelete: 'CASCADE'
});
Booking.belongsTo(Showtime, {
  foreignKey: 'showtime_id',
  onDelete: 'CASCADE'
});

// Booking - BookingSeat relationships (One to Many)
Booking.hasMany(BookingSeat, {
  foreignKey: 'booking_id',
  onDelete: 'CASCADE'
});
BookingSeat.belongsTo(Booking, {
  foreignKey: 'booking_id',
  onDelete: 'CASCADE'
});

// Seat - BookingSeat relationships (One to Many)
Seat.hasMany(BookingSeat, {
  foreignKey: 'seat_id',
  onDelete: 'CASCADE'
});
BookingSeat.belongsTo(Seat, {
  foreignKey: 'seat_id',
  onDelete: 'CASCADE'
});

// Many-to-Many through BookingSeat
Booking.belongsToMany(Seat, {
  through: BookingSeat,
  foreignKey: 'booking_id',
  otherKey: 'seat_id'
});
Seat.belongsToMany(Booking, {
  through: BookingSeat,
  foreignKey: 'seat_id',
  otherKey: 'booking_id'
});

export {
  User,
  Movie,
  Studio,
  Seat,
  Showtime,
  Booking,
  BookingSeat
};
