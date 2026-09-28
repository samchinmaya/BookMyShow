import mongoose, { Schema } from "mongoose";

const bookingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  showId: { type: Schema.Types.ObjectId, ref: "Show", required: true },
  seats: { type: Number, required: true, min: 1 },
  totalAmount: { type: Number, required: true },
}, { timestamps: true }); // createdAt = booking date

const Booking = mongoose.model("Booking", bookingSchema);
export default Booking;
