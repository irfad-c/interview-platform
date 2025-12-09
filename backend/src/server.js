import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";
import { connectDB } from "./lib/db.js";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from backend" });
});

app.get("/something", (req, res) => {
  res.status(200).json({ message: "This is something" });
});

const __dirname = path.resolve();

if (ENV.NODE_ENV === "production") {
  //Serve the built frontend files (React/Vite) to the user
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  //This is a catch-all route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

const startServer = async () => {
  try {
    await connectDB();
    const PORT = process.env.PORT || 5001;
    app.listen(PORT, () => console.log("Server running on port:", PORT));
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();
