let TodoList = JSON.parse(localStorage.getItem('list')) || []
renderTodoList();
function addTodo () {
  nameElem = document.querySelector('.js-name-input');
  dueDateElem = document.querySelector('.js-due-date-input');
  todoName = nameElem.value;
  dueDate = dueDateElem.value;
  TodoList.push({
    todoName,
    dueDate
  })
  nameElem.value='';
  dueDateElem.value='';
  renderTodoList();
}
function renderTodoList () {
  let listHtml ='';
  TodoList.forEach((listItem, index) => {
  let {todoName, dueDate} = listItem;
  newTaskHtml =
  `
  <div class ="name-cont">
  <img class = "checkmark" src = "Images/unchecked.png"> 
  ${todoName}</div>
  <div class ="duedate-cont">${dueDate}</div>
  <div class="delete-button-cont"><button class="js-delete-button delete-todo-button">Delete</button></div>
  `  ;
  listHtml += newTaskHtml;
})
document.querySelector('.js-todo-list').innerHTML = listHtml;
localStorage.setItem('list',JSON.stringify(TodoList))
document.querySelectorAll('.js-delete-button').forEach((delButton, index) => {
  delButton.addEventListener('click', () => {
    TodoList.splice(index, 1)
    renderTodoList();
  })
});

document.querySelectorAll('.checkmark')
  .forEach((img, index) => {
    let checked =  null;
    img.addEventListener('click', () => {
      if (checked === null) {
        img.src = 'images/checked.png'
        checked = 1;
      }
      else if (checked != null){
        img.src= 'Images/unchecked.png'
        checked = null;
      };
    })
  })
}