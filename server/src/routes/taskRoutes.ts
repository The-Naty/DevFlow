// src/routes/taskRoutes.ts
import { Router } from "express";
import { createTask, getTasks } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// ✅ Create task
router.post("/", protect, createTask);

// ✅ Get tasks by project
router.get("/:projectId", protect, getTasks);

export default router;