import Show from "../models/show.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const getShows = asyncHandler(async (req, res) => {
  const shows = await Show.find().sort({ showTime: 1 });
  res.json(shows);
});

export const createShow = asyncHandler(async (req, res) => {
  const { movieName, showTime, ticketPrice, availableTickets } = req.body;
  if (!movieName || !showTime || ticketPrice == null || availableTickets == null) {
    return res.status(400).json({ message: "movieName, showTime, ticketPrice and availableTickets are required" });
  }

  const show = await Show.create({ movieName, showTime, ticketPrice, availableTickets });
  res.status(201).json(show);
});
