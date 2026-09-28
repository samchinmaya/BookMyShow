import mongoose from "mongoose";
import Show from "../models/show.model.js";
import Booking from "../models/booking.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const bookTickets = asyncHandler(async (req, res) => {
  const { showId } = req.body;
  const seats = Number(req.body.seats);
  if (!mongoose.isValidObjectId(showId) || !Number.isInteger(seats) || seats < 1) {
    return res.status(400).json({ message: "A valid showId and seats (1 or more) are required" });
  }

  // take the tickets only if enough are left, in ONE atomic step,
  // so two people booking at the same time can't both get the last tickets
  const show = await Show.findOneAndUpdate(
    { _id: showId, availableTickets: { $gte: seats } },
    { $inc: { availableTickets: -seats } },
    { new: true }
  );
  if (!show) {
    const showExists = await Show.exists({ _id: showId });
    return showExists
      ? res.status(409).json({ message: "Not enough tickets left" })
      : res.status(404).json({ message: "Show not found" });
  }

  const booking = await Booking.create({
    userId: req.user.userId,
    showId,
    seats,
    totalAmount: seats * show.ticketPrice,
  });
  res.status(201).json({ message: "Booking confirmed", booking });
});

export const myBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ userId: req.user.userId })
    .populate("showId", "movieName showTime ticketPrice")
    .sort({ createdAt: -1 });
  res.json(bookings);
});
