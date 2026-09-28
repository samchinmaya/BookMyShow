import { Router } from "express";
import { bookTickets, myBookings } from "../controllers/booking.controller.js";
import { auth } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", auth, bookTickets);
router.get("/me", auth, myBookings);

export default router;
