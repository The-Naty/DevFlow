import Project from "../models/Project";
import Task from "../models/Task";
import TimeEntry from "../models/TimeEntry";

export const getProjectAnalyticsService = async (
  userId: string,
  projectId: string
) => {
  const project = await Project.findById(projectId);
  if (!project || !project.members.includes(userId as any)) {
    throw new Error("Access denied");
  }

  const tasks = await Task.find({ project: projectId });

  const totalTasks = tasks.length;

  const statusCount = {
    todo: 0,
    "in-progress": 0,
    done: 0,
  };

  tasks.forEach((task) => {
    statusCount[task.status]++;
  });

  const completedTasks = statusCount["done"];

  const completionRate =
    totalTasks === 0 ? 0 : (completedTasks / totalTasks) * 100;

  const taskIds = tasks.map((t) => t._id);

  const timeEntries = await TimeEntry.find({
    task: { $in: taskIds },
  });

  let totalTime = 0;
  const timePerDay: Record<string, number> = {};

  timeEntries.forEach((entry) => {
    totalTime += entry.duration;

    const day = entry.createdAt.toISOString().split("T")[0];

    timePerDay[day] = (timePerDay[day] || 0) + entry.duration;
  });

  return {
    totalTasks,
    completedTasks,
    completionRate,
    statusCount,
    totalTime,
    timePerDay,
  };
};