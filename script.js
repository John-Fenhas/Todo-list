// Get elements
const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const nameInput = document.getElementById("todoName");
const dateInput = document.getElementById("todoDate");

// Load todos from localStorage
let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

// Add new todo
addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const date = dateInput.value;

  if (!name) return; // Prevent empty todos

  const todo = {
    name,
    date,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  // Reset input fields
  nameInput.value = "";
  dateInput.value = "";
});

// Render todos
function renderTodos() {
  todoList.innerHTML = "";

  // Sort: incomplete first, then completed
  const sortedTodos = [
    ...todos.filter((t) => !t.completed),
    ...todos.filter((t) => t.completed),
  ];

  sortedTodos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <span>${todo.name} ${todo.date ? "(" + todo.date + ")" : ""}</span>
      <button class="delete">Delete</button>
    `;

    if (todo.completed) {
      li.classList.add("completed");
    }

    // Checkbox toggle
    const checkbox = li.querySelector("input[type='checkbox']");
    checkbox.addEventListener("change", () => {
      const realIndex = todos.findIndex(
        (t) => t.name === todo.name && t.date === todo.date
      );
      if (realIndex !== -1) {
        todos[realIndex].completed = checkbox.checked;
        saveTodos();
        renderTodos();
      }
    });

    // Delete button
    li.querySelector(".delete").addEventListener("click", () => {
      const realIndex = todos.findIndex(
        (t) => t.name === todo.name && t.date === todo.date
      );
      if (realIndex !== -1) {
        todos.splice(realIndex, 1);
        saveTodos();
        renderTodos();
      }
    });

    todoList.appendChild(li);
  });
}

// Save todos
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}
