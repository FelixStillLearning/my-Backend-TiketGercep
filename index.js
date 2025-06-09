import express from "express";
import cors from "cors";
import db from "./config/Database.js";
// Import models with associations
import "./models/index.js";
import userRoute from "./routes/userRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import bookingSeatRoute from "./routes/bookingSeatRoute.js";
import showtimeRoute from "./routes/showtimeRoute.js";
import movieRoute from "./routes/movieRoute.js";
import studioRoute from "./routes/studioRoute.js";
import seatRoute from "./routes/seatRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        message: 'TiketGercep API is running',
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

app.use('/api', userRoute);
app.use('/api', bookingRoute);
app.use('/api', bookingSeatRoute);
app.use('/api', showtimeRoute);
app.use('/api', movieRoute);
app.use('/api', studioRoute);
app.use('/api', seatRoute);

// Sync database
(async() => {
    try {
        await db.sync();
        console.log("Database synced successfully");
    } catch (error) {
        console.log("Database sync error:", error.message);
    }
})();

app.listen(5000, () => console.log("Server is running on port 5000"));