// src/controllers/projectController.ts
import { Response } from "express";
import Project from "../models/Project";
import { AuthRequest } from "../middleware/authMiddleware";

// ✅ Create Project
export const createProject = async (req: AuthRequest, res: Response) => {
  try {
    const { name, description } = req.body;
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const project = await Project.create({
      name,
      description,
      owner: userId,
      members: [userId],
    });

    res.status(201).json(project);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ Get All Projects for Logged-in User
export const getProjects = async (req: AuthRequest, res: Response) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.status(401).json({ message: "Not authorized" });
    }

    const projects = await Project.find({
      members: userId,
    });

    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};