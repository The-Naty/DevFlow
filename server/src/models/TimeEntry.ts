// src/models/TimeEntry.ts
import mongoose, { Schema, Document } from "mongoose";

export interface ITimeEntry extends Document {
  user: mongoose.Types.ObjectId;
  task: mongoose.Types.ObjectId;
  duration: number;
  createdAt: Date;
  updatedAt: Date;
}

const timeEntrySchema = new Schema<ITimeEntry>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<ITimeEntry>("TimeEntry", timeEntrySchema);