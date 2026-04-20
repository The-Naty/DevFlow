import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import authRoutes from "./routes/authRoutes";
import { protect } from "./middleware/authMiddleware";
import projectRoutes from "./routes/projectRoutes";
import taskRoutes from "./routes/taskRoutes";
import timeRoutes from "./routes/timeRoutes";

const app = express();

connectDB();

app.use(cors({ origin: "*" }));
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/time", timeRoutes);

app.get("/", (req, res) => {
  res.send("DevFlow API running 🚀");
});

app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "You are authorized 🔐" });
});

app.listen(3001, () => {
  console.log("Server running on port 3001");
});