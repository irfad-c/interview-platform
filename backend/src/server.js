import express from "express";
import { ENV } from "./lib/env.js";
import { connectDB } from "./lib/db.js";
import cors from "cors";
import { serve } from "inngest/express";
import { inngest, functions } from "./lib/inngest.js";
import { clerkMiddleware } from "@clerk/express";
import chatRoutes from "./routes/chatRoutes.js";
import sessionRoutes from "./routes/sessionRoutes.js";

const app = express();

//Middleware

app.use(express.json());
app.use(cors({ origin: ENV.CLIENT_URL, credentials: true }));
app.use(clerkMiddleware());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from backend" });
});

app.use("/api/chat", chatRoutes);
app.use("/api/sessions", sessionRoutes);

const startServer = async () => {
  try {
    await connectDB();
    const port = ENV.PORT || 5001;
    app.listen(port, () => console.log("Server running on port:", port));
  } catch (error) {
    console.error("Error starting the server", error);
  }
};

startServer();

/*
serve is a ready-made Express handler provided by Inngest
It knows how to:
Receive events
Trigger Inngest functions
Handle retries, errors, execution
*/

/*
const __dirname = path.resolve();
if (ENV.NODE_ENV === "production") {
  //Serve the built frontend files (React/Vite) to the user
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  //This is a catch-all route
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}*/
