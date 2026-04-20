// src/controllers/timeController.ts
import { Response } from "express";
import TimeEntry from "../models/TimeEntry";
import Task from "../models/Task";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/authMiddleware";

// ✅ Log time
export const logTime = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId, duration } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.userId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 Check access
    const project = await Project.findById(task.project);

    if (!project || !project.members.includes(userId as any)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const timeEntry = await TimeEntry.create({
      user: userId,
      task: taskId,
      duration,
    });

    res.status(201).json(timeEntry);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get total time per task
export const getTaskTime = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.userId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 Check access
    const project = await Project.findById(task.project);

    if (!project || !project.members.includes(userId as any)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // 🧮 Calculate total time
    const entries = await TimeEntry.find({ task: taskId });

    const totalTime = entries.reduce((sum, entry) => {
      return sum + entry.duration;
    }, 0);

    res.json({ totalTime });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};