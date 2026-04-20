// src/routes/taskRoutes.ts
import { Router } from "express";
import { createTask, getTasks, updateTask } from "../controllers/taskController";
import { protect } from "../middleware/authMiddleware";


const router = Router();

router.post("/", protect, createTask);
router.get("/:projectId", protect, getTasks);
router.put("/:taskId", protect, updateTask);

export default router;