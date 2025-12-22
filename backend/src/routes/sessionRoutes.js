import express from "express";
import { createSession, getActiveSession } from "../controllers/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSession);
export default router;
