/**
 * ============================================================
 *  Owner: Carlos (Interaction Layer)
 *  File: Drag and Drop functionality
 * ============================================================
 *
 *  【What to do】
 *  Implement drag-and-drop using the HTML5 Drag and Drop API.
 *  Reference: https://www.w3schools.com/html/html5_draganddrop.asp
 *
 *  1. Attach "dragstart" event to all task cards (class="task-card"):
 *     - Store the task id using event.dataTransfer.setData("text/plain", taskId)
 *     - Add a CSS class for visual feedback (e.g. "dragging")
 *     - Get taskId from the card's data-task-id attribute
 *
 *  2. Attach "dragend" event to all task cards:
 *     - Remove the "dragging" CSS class
 *
 *  3. Attach "dragover" event to all columns (class="task-list"):
 *     - Call event.preventDefault() to allow dropping
 *     - Optionally add a "drag-over" CSS class for visual highlight
 *
 *  4. Attach "dragleave" event to all columns:
 *     - Remove the "drag-over" CSS class
 *
 *  5. Attach "drop" event to all columns:
 *     - Call event.preventDefault()
 *     - Get the task id from event.dataTransfer.getData("text/plain")
 *     - Get the target column status from the column's data-status attribute
 *     - Call Suzuna's board.moveTask(taskId, newStatus)
 *     - Call board.save() and re-render the board
 *     - Remove the "drag-over" CSS class
 *
 *  【Important】
 *  - Taisei's Column.astro sets data-status on each .task-list container
 *  - Taisei's TaskCard.astro sets draggable="true" and data-task-id on each card
 *  - Since cards are created dynamically, you may need to re-attach listeners
 *    after the board re-renders. Consider using event delegation on .task-list
 *
 *  【How to access Suzuna's KanbanBoard】
 *  Export an init function: export function initDragAndDrop(board: KanbanBoard) { ... }
 *  This will be called from main.ts.
 *
 *  【CSS classes to coordinate with Taisei】
 *  - .dragging   → applied to a card while being dragged (reduce opacity)
 *  - .drag-over  → applied to a column when a card is hovering over it
 * ============================================================
 */

// TODO: Carlos - Import KanbanBoard type
// import type { KanbanBoard } from "./KanbanBoard";

// TODO: Carlos - Implement drag and drop functions here

// Example structure:
// export function initDragAndDrop(board: KanbanBoard): void {
//   const taskLists = document.querySelectorAll(".task-list");
//   // ... set up drag and drop event listeners
// }

import type { KanbanBoard } from "./KanbanBoard";
import type { ColumnType } from "./models/types";

export function initDragAndDrop(
  board: KanbanBoard,
  renderBoard: () => void,
): void {
  function attachDragListeners() {
    document.querySelectorAll<HTMLElement>(".task-card").forEach((card) => {
      card.addEventListener("dragstart", (ev) => {
        if (!ev.dataTransfer) return;

        ev.dataTransfer.setData(
          "text/plain",
          card.getAttribute("data-task-id")!,
        );

        card.classList.add("dragging");
      });

      card.addEventListener("dragend", () => {
        card.classList.remove("dragging");
      });
    });

    document.querySelectorAll<HTMLElement>(".task-list").forEach((column) => {
      column.addEventListener("dragover", (ev) => {
        ev.preventDefault();
        column.classList.add("drag-over");
      });

      column.addEventListener("dragleave", () => {
        column.classList.remove("drag-over");
      });

      column.addEventListener("drop", (ev) => {
        ev.preventDefault();
        if (!ev.dataTransfer) return;

        const taskId = ev.dataTransfer.getData("text/plain");
        const newStatus = column.dataset.status as ColumnType;

        if (!taskId || !newStatus) return;

        board.moveTask(taskId, newStatus);
        renderBoard();
        attachDragListeners();

        column.classList.remove("drag-over");
      });
    });
  }
  attachDragListeners();

  document.addEventListener("renderBoard", () => {
    attachDragListeners();
  });
}
