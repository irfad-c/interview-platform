import express from "express";
import { ENV } from "./lib/env.js";
import path from "path";

const app = express();

app.get("/", (req, res) => {
  res.status(200).json({ message: "success from backend" });
});

app.get("/something",(req,res)=>{
  res.status(200).json({message:"This is something"})
})

const __dirname=path.resolve();

if(ENV.NODE_ENV==="production"){
  //Serve the built frontend files (React/Vite) to the user
app.use(express.static(path.join(__dirname,"../frontend/dist")))
//This is a catch-all route
app.get("/{*any}",(req,res)=>{
    res.sendFile(path.join(__dirname,"../frontend","dist","index.html"))
  })
}

app.listen(ENV.PORT, () => console.log("Server running on port:", ENV.PORT));
