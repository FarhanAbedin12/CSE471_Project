// reservationRoutes.js

import express from "express";
import { checkSlotAvailability } from "../controllers/reservation.controller.js";

const router = express.Router();

// Route to check if a slot is available
router.post("/check", checkSlotAvailability);

export default router;
