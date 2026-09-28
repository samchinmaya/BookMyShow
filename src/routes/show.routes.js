import { Router } from "express";
import { getShows, createShow } from "../controllers/show.controller.js";
import { auth, adminOnly } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", getShows);
router.post("/", auth, adminOnly, createShow);

export default router;
