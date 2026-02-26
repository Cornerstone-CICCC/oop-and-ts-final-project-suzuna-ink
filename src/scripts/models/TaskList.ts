/**
 * ============================================================
 *  Owner: Suzuna (Data & Logic Layer)
 *  File: TaskList class
 * ============================================================
 *
 *  【What to do】
 *  Implement a class that manages a collection of tasks.
 *
 *  1. Import Task from Task.ts and types from types.ts
 *
 *  2. Create the TaskList class with:
 *     - Property: tasks: Task[] (array of Task instances)
 *
 *  3. Implement these methods:
 *     - add(title, description, dueDate): Task
 *       → Create a new Task and push it to the array. Return the new task.
 *     - update(id, fields): void
 *       → Find the task by id and call task.update(fields)
 *     - delete(id): void
 *       → Remove the task with the given id from the array
 *     - getById(id): Task | undefined
 *       → Find and return a task by its id
 *     - filterByStatus(status): Task[]
 *       → Return all tasks matching the given ColumnType
 *     - searchByName(query): Task[]
 *       → Return tasks whose title includes the query string
 *         (case-insensitive). Used by Carlos for the search feature.
 *
 *  【Usage Example】
 *  const list = new TaskList();
 *  const task = list.add("Write CSS", "Style the header", "2026-03-01");
 *  const results = list.searchByName("css"); // → [task]
 *  list.delete(task.id);
 * ============================================================
 */

// TODO: Suzuna - Import Task class and types
import { Task } from "./Task";
import type { ITask, ColumnType } from "./types";

// TODO: Suzuna - Implement the TaskList class here
export class TaskList {
  tasks: Task[] = [];

  add(
    title: string,
    description: string,
    dueDate: string,
    status: ColumnType = "todo",
  ) {
    const task = new Task(title, description, dueDate);
    task.status = status;
    this.tasks.push(task);
  }
  update(id: string, fields: any): void {
    const task = this.getById(id);
    if (task) {
      task.update(fields);
    }
  }

  delete(id: string): void {
    this.tasks = this.tasks.filter((t) => t.id !== id);
  }

  getById(id: string): Task | undefined {
    return this.tasks.find((t) => t.id === id);
  }

  filterByStatus(status: ColumnType): Task[] {
    return this.tasks.filter((t) => t.status === status);
  }

  searchByName(query: string): Task[] {
    const loweredQuery = query.toLowerCase();
    return this.tasks.filter((t) =>
      t.title.toLowerCase().includes(loweredQuery),
    );
  }
}
