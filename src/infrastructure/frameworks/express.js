const express = require("express");
const cors = require("cors");

const userRoutes = require("../../interfaces/routes/userRoutes");


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/bookings", require("../../interfaces/routes/BookingRoutes"));
app.use("/api/hotels", require("../../interfaces/routes/hotelRoutes"));

module.exports = app;

