const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

const todos = document.querySelector(".todos");

const TODOS_KEY = "todos";

let todoItems = [];

function paintTodo(newTodo) {
  const li = document.createElement("li");
  li.id = newTodo.id;
  li.classList.add("todo");

  const checkbox = document.createElement("input");
  checkbox.classList.add("todo-checkbox");
  checkbox.setAttribute("type", "checkbox");

  const span = document.createElement("span");
  span.innerText = newTodo.content;
  span.classList.add("todo-content");

  const SVG_NS = "http://www.w3.org/2000/svg";

  const editTodoButton = document.createElement("button");
  editTodoButton.classList.add("todo-action", "todo-action--edit");
  editTodoButton.setAttribute("type", "button");
  editTodoButton.setAttribute("aria-label", "TODO 수정");

  const editTodoButtonSvg = document.createElementNS(SVG_NS, "svg");
  editTodoButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  editTodoButtonSvg.setAttribute("fill", "none");
  editTodoButtonSvg.setAttribute("viewBox", "0 0 24 24");
  editTodoButtonSvg.setAttribute("stroke-width", "1.5");
  editTodoButtonSvg.setAttribute("stroke", "currentColor");
  editTodoButtonSvg.classList.add("todo-action__icon");

  const editTodoButtonIcon = document.createElementNS(SVG_NS, "path");
  editTodoButtonIcon.setAttribute("stroke-linecap", "round");
  editTodoButtonIcon.setAttribute("stroke-linejoin", "round");
  editTodoButtonIcon.setAttribute(
    "d",
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L8.582 18.07a4.5 4.5 0 0 1-1.897 1.13L3.75 20.25l1.05-2.935a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Z",
  );

  editTodoButtonSvg.appendChild(editTodoButtonIcon);
  editTodoButton.appendChild(editTodoButtonSvg);

  const deleteTodoButton = document.createElement("button");
  deleteTodoButton.classList.add("todo-action", "todo-action--delete");
  deleteTodoButton.setAttribute("type", "button");
  deleteTodoButton.setAttribute("aria-label", "TODO 삭제");

  const deleteTodoButtonSvg = document.createElementNS(SVG_NS, "svg");
  deleteTodoButtonSvg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  deleteTodoButtonSvg.setAttribute("fill", "none");
  deleteTodoButtonSvg.setAttribute("viewBox", "0 0 24 24");
  deleteTodoButtonSvg.setAttribute("stroke-width", "1.5");
  deleteTodoButtonSvg.setAttribute("stroke", "currentColor");
  deleteTodoButtonSvg.classList.add("todo-action__icon");

  const deleteTodoButtonIcon = document.createElementNS(SVG_NS, "path");
  deleteTodoButtonIcon.setAttribute("stroke-linecap", "round");
  deleteTodoButtonIcon.setAttribute("stroke-linejoin", "round");
  deleteTodoButtonIcon.setAttribute(
    "d",
    "m14.74 9-.346 9M9.606 18 9.26 9M19.5 6.75l-.867 12.142A2.25 2.25 0 0 1 16.389 21H7.611a2.25 2.25 0 0 1-2.244-2.108L4.5 6.75M9.75 6.75V4.5A1.5 1.5 0 0 1 11.25 3h1.5a1.5 1.5 0 0 1 1.5 1.5v2.25M3.75 6.75h16.5",
  );

  deleteTodoButtonSvg.appendChild(deleteTodoButtonIcon);
  deleteTodoButton.appendChild(deleteTodoButtonSvg);

  li.appendChild(checkbox);
  li.appendChild(span);
  li.appendChild(editTodoButton);
  li.appendChild(deleteTodoButton);

  todos.appendChild(li);

  checkbox.addEventListener("change", checkTodo);

  editTodoButton.addEventListener("click", editTodo);
  deleteTodoButton.addEventListener("click", deleteTodo);
}

function handleTodoSubmit(event) {
  event.preventDefault();
  const newTodo = todoInput.value;
  todoInput.value = "";
  const newTodoObject = {
    id: Date.now(),
    content: newTodo,
  };
  todoItems.push(newTodoObject);
  paintTodo(newTodoObject);

  localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
}

export function addTodo() {
  todoForm.addEventListener("submit", handleTodoSubmit);
}

function checkTodo(event) {
  const currentLi = event.target.closest(".todo");

  if (event.target.checked) {
    currentLi.classList.add("todo--done");
  } else {
    currentLi.classList.remove("todo--done");
  }
}

function editTodo(event) {
  const currentTodoItem = event.target.closest(".todo");
  const currentSpan = currentTodoItem.querySelector(".todo-content");

  if (currentTodoItem.querySelector("input[type='text']")) return;

  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = currentSpan.innerText;
  editInput.classList.add("todo-edit-input");

  currentSpan.replaceWith(editInput);

  editInput.focus();

  function saveEdit() {
    const editedValue = editInput.value.trim();

    if (editedValue === "") {
      editInput.focus();
      return;
    }

    const newSpan = document.createElement("span");
    newSpan.classList.add("todo-content");
    newSpan.innerText = editInput.value;

    editInput.replaceWith(newSpan);

    const id = Number(currentTodoItem.id);
    const targetTodo = todoItems.find((todo) => todo.id === id);
    targetTodo.content = editInput.value;

    localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
  }

  editInput.addEventListener("blur", saveEdit);

  editInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editInput.blur();
    }
  });
}

function deleteTodo(event) {
  const currentTodoItem = event.target.closest(".todo");
  console.log("currentTodoItem: ", currentTodoItem);
  currentTodoItem.remove();
  todoItems = todoItems.filter(
    (todoItem) => todoItem.id !== parseInt(currentTodoItem.id),
  );
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
}

export function loadSavedTodos() {
  const savedTodos = localStorage.getItem(TODOS_KEY);

  if (savedTodos !== null) {
    const parsedTodos = JSON.parse(savedTodos);
    todoItems = parsedTodos;
    parsedTodos.forEach(paintTodo);
  }
}
