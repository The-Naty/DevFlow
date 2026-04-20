// src/controllers/taskController.ts
import { Response } from "express";
import Task from "../models/Task";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/authMiddleware";

// ✅ Create Task
export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.userId;

    // 🔐 Check if user is part of project
    const project = await Project.findById(projectId);

    if (!project || !project.members.includes(userId as any)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const task = await Task.create({
      title,
      description,
      project: projectId,
      assignedTo,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get Tasks for a Project
export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { projectId } = req.params;

    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.userId;

    // 🔐 Check access
    const project = await Project.findById(projectId);

    if (!project || !project.members.includes(userId as any)) {
      return res.status(403).json({ message: "Access denied" });
    }

    const tasks = await Task.find({ project: projectId });

    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Update Task
export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status, assignedTo } = req.body;

    if (!req.userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const userId = req.userId;

    const task = await Task.findById(taskId);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // 🔐 Check project access
    const project = await Project.findById(task.project);

    if (!project || !project.members.includes(userId as any)) {
      return res.status(403).json({ message: "Access denied" });
    }

    // ✅ Update fields if provided
    if (status) task.status = status;
    if (assignedTo) task.assignedTo = assignedTo;

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};