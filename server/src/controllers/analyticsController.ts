import { Response } from "express";
import { AuthRequest } from "../middleware/authMiddleware";
import { getProjectAnalyticsService } from "../services/analyticsService";

export const getProjectAnalytics = async (
  req: AuthRequest,
  res: Response
) => {
  try {
    const projectId = req.params.projectId;

    if (Array.isArray(projectId)) {
    return res.status(400).json({ message: "Invalid projectId" });
    }
    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const data = await getProjectAnalyticsService(
      req.userId,
      projectId
    );

    res.json(data);
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};