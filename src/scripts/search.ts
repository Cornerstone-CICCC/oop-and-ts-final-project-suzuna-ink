/**
 * ============================================================
 *  Owner: Carlos (Interaction Layer)
 *  File: Search bar logic with auto-complete
 * ============================================================
 *
 *  【What to do】
 *  Implement the search functionality that filters tasks as the user types.
 *
 *  1. Get references to:
 *     - #search-input (the text input)
 *     - #search-results (the dropdown <ul>)
 *
 *  2. On "input" event:
 *     - Get the current query string
 *     - If empty, hide the dropdown and return
 *     - Call Suzuna's board.taskList.searchByName(query)
 *     - Render results as <li> elements inside #search-results
 *     - Show the dropdown
 *
 *  3. On result click:
 *     - Get the task id from the clicked <li> (use data-task-id attribute)
 *     - Get the task from board.taskList.getById(id)
 *     - Open the View Task modal using openViewTask(task) from modal.ts
 *     - Clear the search input and hide the dropdown
 *
 *  4. Hide dropdown when:
 *     - Input is cleared
 *     - User clicks outside the search bar (use "focusout" or document click)
 *
 *  【How to access Suzuna's KanbanBoard】
 *  Export an init function: export function initSearch(board: KanbanBoard) { ... }
 *  This will be called from main.ts.
 *
 *  【Example auto-complete behavior】
 *  User types: "CSS"
 *  → searchByName("CSS") returns [{ title: "Write CSS" }, { title: "Fix CSS bug" }]
 *  → Dropdown shows:
 *     ┌─────────────┐
 *     │ Write CSS    │
 *     │ Fix CSS bug  │
 *     └─────────────┘
 *  → Clicking "Write CSS" opens its View Task modal
 * ============================================================
 */

// TODO: Carlos - Import KanbanBoard type
// import type { KanbanBoard } from "./KanbanBoard";

// TODO: Carlos - Implement search functions here

// Example structure:
// export function initSearch(board: KanbanBoard): void {
//   const input = document.getElementById("search-input") as HTMLInputElement;
//   const results = document.getElementById("search-results") as HTMLUListElement;
//   // ... set up event listeners
// }
import type { KanbanBoard } from "./KanbanBoard";
import { openViewTask } from "./modal.ts";

export function initSearch(board: KanbanBoard): void {
  const input = document.getElementById("search-input") as HTMLInputElement;
  const results = document.getElementById("search-results") as HTMLUListElement;

  if (!input || !results) return;

  // INPUT EVENT
  input.addEventListener("input", () => {
    const query = input.value.trim();

    // If empty → hide dropdown

    if (query === "") {
      results.style.display = "none";
      results.innerHTML = "";
      return;
    }

    const matchedTasks = board.taskList.searchByName(query);

    results.innerHTML = "";

    if (matchedTasks.length === 0) {
      results.style.display = "none";
      return;
    }

    // Render results

    matchedTasks.forEach((task) => {
      const li = document.createElement("li");
      li.textContent = task.title;
      li.dataset.taskId = task.id;
      li.classList.add("search-item");

      li.addEventListener("click", () => {
        const selectedTask = board.taskList.getById(task.id);
        if (!selectedTask) return;

        openViewTask(selectedTask);

        // Clear input + hide dropdown

        input.value = "";
        results.innerHTML = "";
        results.style.display = "none";
      });

      results.appendChild(li);
    });

    results.style.display = "block";
  });

  // CLICK OUTSIDE → HIDE DROPDOWN

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (!input.contains(target) && !results.contains(target)) {
      results.style.display = "none";
    }
  });
}
