/**
 * ============================================================
 *  Owner: Suzuna (Data & Logic Layer)
 *  File: KanbanBoard class
 * ============================================================
 *
 *  【What to do】
 *  Implement the main board class that ties everything together.
 *
 *  1. Import TaskList from models/TaskList.ts and types from models/types.ts
 *
 *  2. Create the KanbanBoard class with:
 *     - Property: taskList: TaskList
 *
 *  3. Implement these methods:
 *     - constructor()
 *       → Create a new TaskList and call this.load() to restore saved data
 *     - moveTask(taskId, newStatus): void
 *       → Update the task's status to move it between columns
 *         (called by Carlos's DragAndDrop class)
 *     - getTasksByColumn(status): Task[]
 *       → Return tasks for a specific column (delegates to taskList.filterByStatus)
 *     - save(): void
 *       → Save all tasks to localStorage as JSON
 *         Key suggestion: "kanban-tasks"
 *     - load(): void
 *       → Load tasks from localStorage and reconstruct Task instances
 *
 *  【Important】
 *  - Call save() after every add/update/delete/move operation
 *  - The save/load methods ensure data persists across page reloads
 *
 *  【Usage Example】
 *  const board = new KanbanBoard(); // auto-loads from localStorage
 *  board.taskList.add("New task", "Description", "2026-03-01");
 *  board.moveTask("task-id-123", "done");
 *  board.save();
 * ============================================================
 */

// TODO: Suzuna - Import TaskList and types

// TODO: Suzuna - Implement the KanbanBoard class here
