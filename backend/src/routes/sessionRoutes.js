import express from "express";
import { createSession } from "../controllers/sessionController.js";
import { protectRoute } from "../middleware/protectRoute.js";

const router = express.Router();
router.post("/", protectRoute, createSession);
export default router;
