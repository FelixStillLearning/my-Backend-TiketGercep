import express from "express";
import cors from "cors";
import db from "./config/Database.js";
import userRoute from "./routes/userRoute.js";
import bookingRoute from "./routes/bookingRoute.js";
import showtimeRoute from "./routes/showtimeRoute.js";
import movieRoute from "./routes/movieRoute.js";
import studioRoute from "./routes/studioRoute.js";
import seatRoute from "./routes/seatRoute.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(userRoute);
app.use(bookingRoute);
app.use(showtimeRoute);
app.use(movieRoute);
app.use(studioRoute);
app.use(seatRoute);

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