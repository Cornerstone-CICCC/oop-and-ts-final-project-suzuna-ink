/**
 * ============================================================
 *  Owner: Suzuna (Data & Logic Layer)
 *  File: Task class
 * ============================================================
 *
 *  【What to do】
 *  Implement a class that represents a single task.
 *
 *  1. Import ITask and ColumnType from types.ts
 *
 *  2. Create the Task class with these properties:
 *     - id: string
 *     - title: string
 *     - description: string
 *     - status: ColumnType
 *     - dueDate: string
 *     - createdAt: string
 *
 *  3. Constructor should accept (title, description, dueDate) and:
 *     - Auto-generate id using crypto.randomUUID()
 *     - Default status to "todo"
 *     - Default createdAt to new Date().toISOString()
 *
 *  4. Implement these methods:
 *     - update(fields: Partial<ITask>): void
 *       → Partially update title, description, status, dueDate
 *     - toJSON(): ITask
 *       → Return a plain object (used for localStorage)
 *
 *  【Usage Example】
 *  const task = new Task("Write CSS", "Style the header", "2026-03-01");
 *  task.update({ status: "in-progress" });
 *  const json = task.toJSON();
 * ============================================================
 */

// TODO: Suzuna - Import types from types.ts

// TODO: Suzuna - Implement the Task class here
import type { ITask, ColumnType } from "./types";

export class Task {
  id: string;
  title: string;
  description: string;
  status: ColumnType;
  dueDate: string;
  createdAt: string;

  constructor(title: string, description: string, dueDate: string) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.status = "todo";
    this.createdAt = new Date().toISOString();
  }

  update(fields: Partial<ITask>) {
    Object.assign(this, fields);
  }

  toJSON(): ITask {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      status: this.status,
      dueDate: this.dueDate,
      createdAt: this.createdAt,
    };
  }
}
