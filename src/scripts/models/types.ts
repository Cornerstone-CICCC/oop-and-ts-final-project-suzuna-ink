/**
 * ============================================================
 *  Owner: Suzuna (Data & Logic Layer)
 *  File: Shared type definitions
 * ============================================================
 *
 *  ★ HIGHEST PRIORITY ★
 *  Taisei and Carlos depend on this file.
 *  Complete this first so the rest of the team can start working.
 *
 *  【What to do】
 *  1. Define the ITask interface
 *     - id: string           (unique ID, e.g. crypto.randomUUID())
 *     - title: string        (task name)
 *     - description: string  (task details)
 *     - status: ColumnType   (which column the task belongs to)
 *     - dueDate: string      (deadline, e.g. "2026-03-01")
 *     - createdAt: string    (creation timestamp)
 *
 *  2. Define the ColumnType type
 *     - "todo" | "in-progress" | "done"
 *
 *  【Example】
 *  export type ColumnType = "todo" | "in-progress" | "done";
 *
 *  export interface ITask {
 *    id: string;
 *    title: string;
 *    description: string;
 *    status: ColumnType;
 *    dueDate: string;
 *    createdAt: string;
 *  }
 * ============================================================
 */

// TODO: Suzuna - Define the ColumnType type here
export type ColumnType = "todo" | "in-progress" | "done";

// TODO: Suzuna - Define the ITask interface here
export interface ITask {
  id: string;
  title: string;
  description: string;
  status: ColumnType;
  dueDate: string;
  createdAt: string;
}
