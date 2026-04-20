// src/routes/projectRoutes.ts
import { Router } from "express";
import { createProject, getProjects } from "../controllers/projectController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// 🔐 protected routes
router.post("/", protect, createProject);
router.get("/", protect, getProjects);

export default router;