import mongoose, { Schema } from "mongoose";

const showSchema = new Schema({
  movieName: { type: String, required: true, trim: true },
  showTime: { type: Date, required: true },
  ticketPrice: { type: Number, required: true, min: 0 },
  availableTickets: { type: Number, required: true, min: 0 },
}, { timestamps: true });

const Show = mongoose.model("Show", showSchema);
export default Show;
