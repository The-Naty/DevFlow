// src/routes/analyticsRoutes.ts
import { Router } from "express";
import { getProjectAnalytics } from "../controllers/analyticsController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

// 📊 Project analytics
router.get("/:projectId", protect, getProjectAnalytics);

export default router;