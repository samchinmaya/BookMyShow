import express from "express";
import userRoutes from "./routes/user.routes.js";
import showRoutes from "./routes/show.routes.js";
import bookingRoutes from "./routes/booking.routes.js";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/shows", showRoutes);
app.use("/api/bookings", bookingRoutes);

app.use((err, _, res,next) => {
  console.log(err);
  res.status(err.statusCode || 500).json({ message: err.message || "Internal Server Error" });
});

export default app;
