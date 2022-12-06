function addInitialTodos() {
  addTodoItem("Köket", "Diska vår disk för hand");
  addTodoItem("Vardagsrum", "Städa under soffan (dammigt)");
  addTodoItem("Handla", "Glömde köpa ost på burk");
}

document.addEventListener("load", addInitialTodos());

function onFormSubmit() {
  const inputTitle = document.querySelector("input[name='todo-title']");
  const inputText = document.querySelector("input[name='todo-text']");
  addTodoItem(inputTitle.value, inputText.value);
}

function addTodoItem(title, text) {
  const targetElement = document.getElementById("todo-container");
  const newTodoItem = document.createElement("div");
  const newTodoDate = document.createElement("span");
  const newTodoTitle = document.createElement("h2");
  const newTodoText = document.createElement("p");
  const newBtnRemove = document.createElement("button");
  const newBtnRemoveIcon = document.createElement("img");

  newTodoTitle.innerText = title;
  newTodoDate.innerText = `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;
  newTodoText.innerText = text;
  newBtnRemoveIcon.src = "../assets/ic_trash.svg";

  newBtnRemove.appendChild(newBtnRemoveIcon);

  const determineCardColor = `card-color-${Math.floor(Math.random() * 3 + 1)}`;
  newTodoItem.classList.add("todo-item", determineCardColor);
  newBtnRemove.classList.add("btn-remove-todo");

  newBtnRemove.addEventListener("click", function () {
    newTodoItem.remove();
  });
  newTodoItem.append(newTodoTitle, newTodoDate, newTodoText, newBtnRemove);

  targetElement.appendChild(newTodoItem);
}
