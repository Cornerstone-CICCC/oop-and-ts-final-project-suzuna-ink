/**
 * ============================================================
 *  Owner: Everyone (Integration)
 *  File: Entry point — initializes all modules
 * ============================================================
 *
 *  This file is the bridge between all members' code.
 *  It runs in the browser and wires everything together.
 *
 *  【What to do (during Phase 2 integration)】
 *
 *  1. Import Suzuna's KanbanBoard
 *     → import { KanbanBoard } from "./KanbanBoard";
 *
 *  2. Import Carlos's init functions
 *     → import { initModals } from "./modal";
 *     → import { initSearch } from "./search";
 *     → import { initDragAndDrop } from "./dragAndDrop";
 *
 *  3. Create the board instance
 *     → const board = new KanbanBoard();
 *
 *  4. Render the initial board state
 *     → Loop through each column, get tasks, create card HTML
 *     → Taisei's TaskCard.astro shows the HTML structure to follow
 *
 *  5. Initialize Carlos's interaction modules
 *     → initModals(board);
 *     → initSearch(board);
 *     → initDragAndDrop(board);
 *
 *  【Render function suggestion】
 *  Create a renderBoard(board) function that:
 *  - Clears all .task-list containers
 *  - For each column status ("todo", "in-progress", "done"):
 *    - Gets tasks via board.getTasksByColumn(status)
 *    - Creates card elements following Taisei's TaskCard HTML structure
 *    - Appends them to the matching .task-list container
 *  - Re-attaches drag & drop listeners (since cards are recreated)
 *
 *  Export this function so Carlos can call it after add/edit/delete/drop.
 * ============================================================
 */

// TODO: Everyone - Wire up imports and initialization during Phase 2

// Example:
// import { KanbanBoard } from "./KanbanBoard";
// import { initModals } from "./modal";
// import { initSearch } from "./search";
// import { initDragAndDrop } from "./dragAndDrop";
//
// const board = new KanbanBoard();
// renderBoard(board);
// initModals(board);
// initSearch(board);
// initDragAndDrop(board);
//
// export function renderBoard(board: KanbanBoard): void {
//   // Render all task cards into their columns
// }
import { KanbanBoard } from "./KanbanBoard";
import { initModals } from "./modal";
import { initDragAndDrop } from "./dragAndDrop";
import { initSearch } from "./search";

const board = new KanbanBoard();

export function renderBoard() {
  const taskLists = document.querySelectorAll(".task-list[data-status]");

  taskLists.forEach((taskContainer) => {
    const status = taskContainer.getAttribute("data-status");
    if (!status) return;

    taskContainer.innerHTML = "";

    const tasks = board.getTasksByColumn(status as any);

    tasks.forEach((task) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.setAttribute("data-task-id", task.id);
      card.setAttribute("draggable", "true");
      card.innerHTML = `
        <h4>${task.title}</h4>
        <p>${task.description}</p>
      `;
      taskContainer.appendChild(card);
    });
  });
}

renderBoard();
initSearch(board);
initModals(board, renderBoard);
initDragAndDrop(board, renderBoard);
