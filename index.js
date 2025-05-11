import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import contactRoutes from "./routes/ContactRoute.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.use("/contact", contactRoutes); // Now handled from routes/contactRoutes.js
// DB Connection
mongoose
  .connect(process.env.ATLAS_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.redirect("process.env.FRONTEND_URL");
});

// Server Listen
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
