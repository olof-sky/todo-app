function addTodoItem() {
  const targetElement = document.getElementById("todo-container");
  const newTodoItem = document.createElement("div");
  const newTodoTitle = document.createElement("h2");
  const newTodoText = document.createElement("p");
  const newBtnRemove = document.createElement("button");

  newTodoTitle.innerText = "Todo Title";
  newBtnRemove.innerText = "Remove";
  newTodoText.innerText = "Something";

  newBtnRemove.classList.add("btn-remove-todo");
  newTodoItem.classList.add("todo-item");

  newTodoItem.appendChild(newTodoTitle);
  newTodoItem.appendChild(newTodoText);
  newTodoItem.appendChild(newBtnRemove);

  targetElement.appendChild(newTodoItem);
}
