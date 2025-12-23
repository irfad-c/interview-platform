import express from "express";
import {
  createSession,
  getActiveSession,
  getMyRecentSession,
  getSessionById,
} from "../controllers/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.post("/", protectRoute, createSession);
router.get("/active", protectRoute, getActiveSession);
router.get("/my-recent", protectRoute, getMyRecentSession);
router.get(":/id", protectRoute, getSessionById);

export default router;
