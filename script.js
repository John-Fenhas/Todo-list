const addBtn = document.getElementById("addBtn");
const todoList = document.getElementById("todoList");
const nameInput = document.getElementById("todoName");
const dateInput = document.getElementById("todoDate");


let todos = JSON.parse(localStorage.getItem("todos")) || [];
renderTodos();

addBtn.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const date = dateInput.value;

  if (!name) return; 

  const todo = {
    name,
    date,
    completed: false,
  };

  todos.push(todo);
  saveTodos();
  renderTodos();

  nameInput.value = "";
  dateInput.value = "";
});

function renderTodos() {
  todoList.innerHTML = "";

  const sortedTodos = [
    ...todos.filter((t) => !t.completed),
    ...todos.filter((t) => t.completed),
  ];

  sortedTodos.forEach((todo) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? "checked" : ""}>
      <span>${todo.name} ${todo.date ? "(" + todo.date + ")" : ""}</span>
      <button class="delete">Delete</button>
    `;

    if (todo.completed) {
      li.classList.add("completed");
    }

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

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}


const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const switchBtn = document.getElementById('switchBtn')
const toggle = document.getElementById('input')
toggle.checked = prefersDark
if (!toggle.checked) {
  document.body.classList.add('light')
}

switchBtn.addEventListener('click', ()=>{
  document.body.classList.add('fading');
  setTimeout(() => {
    toggle.checked = !toggle.checked;
    document.body.classList.toggle('light', !toggle.checked);
    document.body.classList.remove('fading');
  }, 300); 

})

