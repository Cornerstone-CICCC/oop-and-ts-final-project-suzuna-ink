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

// import type { KanbanBoard } from "./KanbanBoard";

// /** Abre un modal por id */
// function openModal(id: string) {
//   const modal = document.getElementById(id);
//   if (modal) modal.style.display = "flex";
// }

// /** Cierra un modal por id */
// function closeModal(id: string) {
//   const modal = document.getElementById(id);
//   if (modal) modal.style.display = "none";
// }

// /** Inicializa todos los modales y eventos */
// export function initModals(board: KanbanBoard) {
//   // ====== Cerrar modales al hacer click en la X o fondo ======
//   document.querySelectorAll(".modal-close").forEach((btn) => {
//     btn.addEventListener("click", (e) => {
//       const modal = (e.target as HTMLElement).closest(".modal-overlay");
//       if (modal) closeModal(modal.id);
//     });
//   });

//   document.querySelectorAll(".modal-overlay").forEach((overlay) => {
//     overlay.addEventListener("click", (e) => {
//       if (e.target === overlay) closeModal(overlay.id);
//     });
//   });

//   // ====== Abrir View Task Modal ======
//   function openViewTask(task: any) {
//     const { id, title, description, status, dueDate } = task;
//     (document.getElementById("view-task-title") as HTMLElement).textContent =
//       title;
//     (
//       document.getElementById("view-task-description") as HTMLElement
//     ).textContent = description;
//     (document.getElementById("view-task-status") as HTMLElement).textContent =
//       `Status: ${status}`;
//     (document.getElementById("view-task-due-date") as HTMLElement).textContent =
//       `Due: ${dueDate}`;
//     (
//       document.getElementById("edit-task-btn") as HTMLButtonElement
//     ).dataset.taskId = id;
//     (
//       document.getElementById("delete-task-btn") as HTMLButtonElement
//     ).dataset.taskId = id;
//     openModal("view-task-modal");
//   }

//   // Click en cada tarjeta para abrir View Task
//   function attachTaskCardListeners() {
//     document.querySelectorAll(".task-card").forEach((card) => {
//       card.addEventListener("click", () => {
//         const taskId = card.getAttribute("data-task-id");
//         if (!taskId) return;
//         const task = board.taskList.getById(taskId);
//         if (task) openViewTask(task);
//       });
//     });
//   }

//   attachTaskCardListeners();

//   // ====== Abrir Add Task Modal ======
//   function openAddTask(status: string) {
//     (document.getElementById("form-modal-title") as HTMLElement).textContent =
//       "Add New Task";
//     (
//       document.getElementById("form-submit-btn") as HTMLButtonElement
//     ).textContent = "Add Task";
//     (document.getElementById("form-task-id") as HTMLInputElement).value = "";
//     (document.getElementById("form-task-title") as HTMLInputElement).value = "";
//     (
//       document.getElementById("form-task-description") as HTMLTextAreaElement
//     ).value = "";
//     (document.getElementById("form-task-due-date") as HTMLInputElement).value =
//       "";
//     (document.getElementById("task-form") as HTMLFormElement).dataset.status =
//       status;
//     openModal("task-form-modal");
//   }

//   // ====== Abrir Edit Task Modal ======
//   function openEditTask(task: any) {
//     (document.getElementById("form-modal-title") as HTMLElement).textContent =
//       "Edit Task";
//     (
//       document.getElementById("form-submit-btn") as HTMLButtonElement
//     ).textContent = "Save Changes";
//     (document.getElementById("form-task-id") as HTMLInputElement).value =
//       task.id;
//     (document.getElementById("form-task-title") as HTMLInputElement).value =
//       task.title;
//     (
//       document.getElementById("form-task-description") as HTMLTextAreaElement
//     ).value = task.description;
//     (document.getElementById("form-task-due-date") as HTMLInputElement).value =
//       task.dueDate;
//     openModal("task-form-modal");
//   }

//   // ====== Abrir Delete Modal ======
//   function openDeleteModal(task: any) {
//     (document.getElementById("delete-task-title") as HTMLElement).textContent =
//       task.title;
//     (document.getElementById("delete-task-id") as HTMLInputElement).value =
//       task.id;
//     openModal("delete-modal");
//   }

//   // ====== Click en Add Task Buttons ======
//   document.querySelectorAll(".add-task-btn").forEach((btn) => {
//     btn.addEventListener("click", () => {
//       const status = btn.getAttribute("data-status") || "todo";
//       openAddTask(status);
//     });
//   });

//   // ====== Click en Edit Button (View Task Modal) ======
//   document.getElementById("edit-task-btn")?.addEventListener("click", (e) => {
//     const btn = e.currentTarget as HTMLButtonElement;
//     const taskId = btn.dataset.taskId;
//     if (!taskId) return;
//     const task = board.taskList.getById(taskId);
//     if (task) {
//       closeModal("view-task-modal");
//       openEditTask(task);
//     }
//   });

//   // ====== Click en Delete Button (View Task Modal) ======
//   document.getElementById("delete-task-btn")?.addEventListener("click", (e) => {
//     const btn = e.currentTarget as HTMLButtonElement;
//     const taskId = btn.dataset.taskId;
//     if (!taskId) return;
//     const task = board.taskList.getById(taskId);
//     if (task) {
//       closeModal("view-task-modal");
//       openDeleteModal(task);
//     }
//   });

//   // ====== Confirm Delete Button ======
//   document
//     .getElementById("confirm-delete-btn")
//     ?.addEventListener("click", () => {
//       const idInput = document.getElementById(
//         "delete-task-id",
//       ) as HTMLInputElement;
//       const taskId = idInput.value;
//       if (!taskId) return;
//       board.taskList.delete(taskId);
//       board.save();
//       closeModal("delete-modal");
//       renderBoard(board);
//     });

//   // ====== Task Form Submit ======
//   const taskForm = document.getElementById("task-form") as HTMLFormElement;
//   taskForm.addEventListener("submit", (e) => {
//     e.preventDefault();
//     const idInput = document.getElementById("form-task-id") as HTMLInputElement;
//     const titleInput = document.getElementById(
//       "form-task-title",
//     ) as HTMLInputElement;
//     const descInput = document.getElementById(
//       "form-task-description",
//     ) as HTMLTextAreaElement;
//     const dueInput = document.getElementById(
//       "form-task-due-date",
//     ) as HTMLInputElement;
//     const status = taskForm.dataset.status || "todo";

//     if (!titleInput.value) return;

//     if (idInput.value) {
//       // Edit mode
//       board.taskList.update(idInput.value, {
//         title: titleInput.value,
//         description: descInput.value,
//         dueDate: dueInput.value,
//       });
//     } else {
//       // Add mode
//       board.taskList.add(
//         titleInput.value,
//         descInput.value,
//         dueInput.value,
//       ).status = status;
//     }

//     board.save();
//     closeModal("task-form-modal");
//     renderBoard(board);
//   });

//   // ====== Reattach task card listeners after board re-render ======
//   function renderBoard(board: KanbanBoard) {
//     const event = new CustomEvent("renderBoard", { detail: board });
//     document.dispatchEvent(event);
//   }
// }
