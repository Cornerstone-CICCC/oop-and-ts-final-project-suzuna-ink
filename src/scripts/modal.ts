/**
 * ============================================================
 *  Owner: Carlos (Interaction Layer)
 *  File: Modal logic (open, close, populate data)
 * ============================================================
 *
 *  【What to do】
 *  Implement the client-side logic for all modals.
 *  This file runs in the browser via a <script> tag in index.astro.
 *
 *  1. Modal open/close helpers:
 *     - openModal(id): show the modal overlay (set display to "flex" or "block")
 *     - closeModal(id): hide the modal overlay (set display to "none")
 *     - Attach click listeners to all ".modal-close" buttons
 *     - Close modal when clicking the overlay background
 *
 *  2. View Task Modal:
 *     - openViewTask(task): populate #view-task-title, #view-task-description, etc.
 *       with the task data, then call openModal("view-task-modal")
 *     - Attach click listeners to TaskCards (class="task-card")
 *       → Get task id from data-task-id attribute
 *       → Get the task from Suzuna's board.taskList.getById(id)
 *       → Call openViewTask(task)
 *
 *  3. Task Form Modal (Add / Edit):
 *     - openAddTask(status): clear the form, set title to "Add New Task",
 *       set submit button text to "Add Task", open the modal
 *     - openEditTask(task): fill the form with task data, set title to "Edit Task",
 *       set submit button text to "Save Changes", open the modal
 *     - Handle form submit:
 *       → If #form-task-id is empty → Add mode → board.taskList.add(...)
 *       → If #form-task-id has value → Edit mode → board.taskList.update(...)
 *       → Call board.save() and re-render the board
 *
 *  4. Delete Modal:
 *     - openDeleteModal(task): populate #delete-task-title and #delete-task-id
 *     - Handle confirm click:
 *       → board.taskList.delete(id)
 *       → board.save() and re-render
 *
 *  【How to access Suzuna's KanbanBoard】
 *  This file will be imported from main.ts where the board instance is created.
 *  Export an init function: export function initModals(board: KanbanBoard) { ... }
 *
 *  【Connections】
 *  - ".add-task-btn" click (from Taisei's Column.astro) → openAddTask(status)
 *  - ".task-card" click (from Taisei's TaskCard) → openViewTask(task)
 *  - "#edit-task-btn" click → openEditTask(task)
 *  - "#delete-task-btn" click → openDeleteModal(task)
 * ============================================================
 */

// TODO: Carlos - Import KanbanBoard from Suzuna's code
// import type { KanbanBoard } from "./KanbanBoard";

// TODO: Carlos - Implement modal functions here

// Example structure:
// export function initModals(board: KanbanBoard): void {
//   // Set up all event listeners for modals
// }

/**
 * ============================================================
 *  Owner: Carlos (Interaction Layer)
 *  File: Modal logic (open, close, populate data)
 * ============================================================
 *
 *  Modal handling for View, Add/Edit, and Delete tasks
 * ============================================================
 */

import type { KanbanBoard } from "./KanbanBoard";
import type { ColumnType } from "./models/types";

let openViewTaskGlobal: ((task: any) => void) | null = null;

function openModal(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "flex";
}

function closeModal(id: string) {
  const modal = document.getElementById(id);
  if (modal) modal.style.display = "none";
}

export function openViewTask(task: any) {
  openViewTaskGlobal?.(task);
}

export function initModals(board: KanbanBoard, renderBoard: () => void) {
  // ================= CLOSE BUTTONS =================
  document.querySelectorAll(".modal-close").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const modal = (e.target as HTMLElement).closest(".modal-overlay");
      if (modal) closeModal(modal.id);
    });
  });

  document.querySelectorAll(".modal-overlay").forEach((overlay) => {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeModal(overlay.id);
    });
  });

  // ================= VIEW TASK =================
  function _openViewTask(task: any) {
    (document.getElementById("view-task-title") as HTMLElement).textContent =
      task.title;
    (
      document.getElementById("view-task-description") as HTMLElement
    ).textContent = task.description;
    (document.getElementById("view-task-status") as HTMLElement).textContent =
      `Status: ${task.status}`;
    (document.getElementById("view-task-due-date") as HTMLElement).textContent =
      `Due: ${task.dueDate}`;

    (
      document.getElementById("edit-task-btn") as HTMLButtonElement
    ).dataset.taskId = task.id;
    (
      document.getElementById("delete-task-btn") as HTMLButtonElement
    ).dataset.taskId = task.id;

    openModal("view-task-modal");
  }

  openViewTaskGlobal = _openViewTask;

  // Click task card
  document.addEventListener("click", (e) => {
    const card = (e.target as HTMLElement).closest(".task-card");
    if (!card) return;

    const taskId = card.getAttribute("data-task-id");
    if (!taskId) return;

    const task = board.taskList.getById(taskId);
    if (task) _openViewTask(task);
  });

  // ================= ADD TASK =================
  function openAddTask(status: ColumnType) {
    (document.getElementById("form-modal-title") as HTMLElement).textContent =
      "Add New Task";
    (
      document.getElementById("form-submit-btn") as HTMLButtonElement
    ).textContent = "Add Task";

    (document.getElementById("form-task-id") as HTMLInputElement).value = "";
    (document.getElementById("form-task-title") as HTMLInputElement).value = "";
    (
      document.getElementById("form-task-description") as HTMLTextAreaElement
    ).value = "";
    (document.getElementById("form-task-due-date") as HTMLInputElement).value =
      "";

    const form = document.getElementById("task-form") as HTMLFormElement;
    form.dataset.status = status;

    openModal("task-form-modal");
  }

  document.querySelectorAll(".add-task-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const statusAttr = btn.getAttribute("data-status") as ColumnType | null;
      openAddTask(statusAttr || "todo");
    });
  });

  // ================= EDIT TASK =================
  function openEditTask(task: any) {
    (document.getElementById("form-modal-title") as HTMLElement).textContent =
      "Edit Task";
    (
      document.getElementById("form-submit-btn") as HTMLButtonElement
    ).textContent = "Save Changes";

    (document.getElementById("form-task-id") as HTMLInputElement).value =
      task.id;
    (document.getElementById("form-task-title") as HTMLInputElement).value =
      task.title;
    (
      document.getElementById("form-task-description") as HTMLTextAreaElement
    ).value = task.description;
    (document.getElementById("form-task-due-date") as HTMLInputElement).value =
      task.dueDate;

    openModal("task-form-modal");
  }

  document.getElementById("edit-task-btn")?.addEventListener("click", (e) => {
    const taskId = (e.currentTarget as HTMLButtonElement).dataset.taskId;
    if (!taskId) return;

    const task = board.taskList.getById(taskId);
    if (task) {
      closeModal("view-task-modal");
      openEditTask(task);
    }
  });

  // ================= DELETE TASK =================
  function openDeleteModal(task: any) {
    (document.getElementById("delete-task-title") as HTMLElement).textContent =
      task.title;
    (document.getElementById("delete-task-id") as HTMLInputElement).value =
      task.id;
    openModal("delete-modal");
  }

  document.getElementById("delete-task-btn")?.addEventListener("click", (e) => {
    const taskId = (e.currentTarget as HTMLButtonElement).dataset.taskId;
    if (!taskId) return;

    const task = board.taskList.getById(taskId);
    if (task) {
      closeModal("view-task-modal");
      openDeleteModal(task);
    }
  });

  document
    .getElementById("confirm-delete-btn")
    ?.addEventListener("click", () => {
      const id = (document.getElementById("delete-task-id") as HTMLInputElement)
        .value;
      if (!id) return;

      board.taskList.delete(id);
      board.save();
      closeModal("delete-modal");
      renderBoard();
    });

  // ================= FORM SUBMIT =================
  const form = document.getElementById("task-form") as HTMLFormElement;
  form?.addEventListener("submit", (e) => {
    e.preventDefault();

    const id = (document.getElementById("form-task-id") as HTMLInputElement)
      .value;
    const title = (
      document.getElementById("form-task-title") as HTMLInputElement
    ).value;
    const desc = (
      document.getElementById("form-task-description") as HTMLTextAreaElement
    ).value;
    const due = (
      document.getElementById("form-task-due-date") as HTMLInputElement
    ).value;
    const status = (form.dataset.status as ColumnType) || "todo";

    if (!title) return;

    if (id) {
      board.taskList.update(id, { title, description: desc, dueDate: due });
    } else {
      board.taskList.add(title, desc, due, status);
    }

    board.save();
    closeModal("task-form-modal");
    renderBoard();
  });
}
