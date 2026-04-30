const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todos = document.querySelector(".todos");

const TODOS_KEY = "todos";
const SVG_NS = "http://www.w3.org/2000/svg";

let todoItems = [];

function saveTodos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(todoItems));
}

function createSvgIcon(pathD) {
  const svg = document.createElementNS(SVG_NS, "svg");
  svg.setAttribute("xmlns", SVG_NS);
  svg.setAttribute("fill", "none");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("stroke-width", "1.5");
  svg.setAttribute("stroke", "currentColor");

  const path = document.createElementNS(SVG_NS, "path");
  path.setAttribute("stroke-linecap", "round");
  path.setAttribute("stroke-linejoin", "round");
  path.setAttribute("d", pathD);

  svg.appendChild(path);

  return svg;
}

function createTodoButton({ className, ariaLabel, pathD }) {
  const button = document.createElement("button");
  button.type = "button";
  button.setAttribute("aria-label", ariaLabel);
  button.classList.add("todo-action", className);

  const icon = createSvgIcon(pathD);
  icon.classList.add("todo-action__icon");

  button.appendChild(icon);

  return button;
}

function createCheckbox() {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("todo-checkbox");
  checkbox.addEventListener("change", handleCheckTodo);

  return checkbox;
}

function createTodoContent(content) {
  const span = document.createElement("span");
  span.classList.add("todo-content");
  span.innerText = content;

  return span;
}

function createEditButton() {
  const editPath =
    "m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L8.582 18.07a4.5 4.5 0 0 1-1.897 1.13L3.75 20.25l1.05-2.935a4.5 4.5 0 0 1 1.13-1.897L16.862 4.487Z";

  const button = createTodoButton({
    className: "todo-action--edit",
    ariaLabel: "TODO 수정",
    pathD: editPath,
  });

  button.addEventListener("click", handleEditTodo);

  return button;
}

function createDeleteButton() {
  const deletePath =
    "m14.74 9-.346 9M9.606 18 9.26 9M19.5 6.75l-.867 12.142A2.25 2.25 0 0 1 16.389 21H7.611a2.25 2.25 0 0 1-2.244-2.108L4.5 6.75M9.75 6.75V4.5A1.5 1.5 0 0 1 11.25 3h1.5a1.5 1.5 0 0 1 1.5 1.5v2.25M3.75 6.75h16.5";

  return createTodoButton({
    className: "todo-action--delete",
    ariaLabel: "TODO 삭제",
    pathD: deletePath,
  });
}

function createTodoElement(todo) {
  const li = document.createElement("li");
  li.id = todo.id;
  li.classList.add("todo");

  const checkbox = createCheckbox();
  const content = createTodoContent(todo.content);
  const editButton = createEditButton();
  const deleteButton = createDeleteButton();

  li.append(checkbox, content, editButton, deleteButton);

  return li;
}

function paintTodo(todo) {
  const todoElement = createTodoElement(todo);
  todos.appendChild(todoElement);
}

function handleTodoSubmit(event) {
  event.preventDefault();

  const content = todoInput.value.trim();

  if (content === "") return;

  const newTodo = {
    id: Date.now(),
    content,
  };

  todoItems.push(newTodo);
  paintTodo(newTodo);
  saveTodos();

  todoInput.value = "";
}

function handleCheckTodo(event) {
  const currentTodoItem = event.target.closest(".todo");

  currentTodoItem.classList.toggle("todo--done", event.target.checked);
}

function handleEditTodo(event) {
  const currentTodoItem = event.target.closest(".todo");
  const currentSpan = currentTodoItem.querySelector(".todo-content");

  if (currentTodoItem.querySelector(".todo-edit-input")) return;

  const editInput = createEditInput(currentSpan.innerText);

  currentSpan.replaceWith(editInput);
  editInput.focus();

  function saveEdit() {
    const editedValue = editInput.value.trim();

    if (editedValue === "") {
      editInput.focus();
      return;
    }

    updateTodoContent(currentTodoItem, editedValue);
    replaceInputWithSpan(editInput, editedValue);
    saveTodos();
  }

  editInput.addEventListener("blur", saveEdit);

  editInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editInput.blur();
    }
  });
}

function createEditInput(value) {
  const input = document.createElement("input");
  input.type = "text";
  input.value = value;
  input.classList.add("todo-edit-input");

  return input;
}

function updateTodoContent(todoElement, content) {
  const id = Number(todoElement.id);
  const targetTodo = todoItems.find((todo) => todo.id === id);

  if (!targetTodo) return;

  targetTodo.content = content;
}

function replaceInputWithSpan(input, content) {
  const span = createTodoContent(content);
  input.replaceWith(span);
}

export function addTodo() {
  todoForm.addEventListener("submit", handleTodoSubmit);
}

export function loadSavedTodos() {
  const savedTodos = localStorage.getItem(TODOS_KEY);

  if (savedTodos === null) return;

  todoItems = JSON.parse(savedTodos);
  todoItems.forEach(paintTodo);
}
