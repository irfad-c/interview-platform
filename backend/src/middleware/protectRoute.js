import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) {
        return res
          .status(401)
          .json({ message: "Unauthorised - invalid token" });
      }
      const user = await User.findOne({ clerkId });
      if (!user) {
        res.status(401).json({ message: "User not found" });
      }
      //we are attaching user property inside the request object
      req.user = user;
      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  },
];
