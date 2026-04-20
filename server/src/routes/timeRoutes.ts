
import { Router } from "express";
import { logTime, getTaskTime } from "../controllers/timeController";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.post("/", protect, logTime);

router.get("/:taskId", protect, getTaskTime);

export default router;