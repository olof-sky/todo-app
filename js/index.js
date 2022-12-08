const App = {
  listOfTodos: [],
  elements: {
    container: document.getElementById("todo-container"),
  },
  addInitialTodos: function () {
    this.listOfTodos.push(
      createTodoItem("Köket", "Diska vår disk för hand", Date.now() + 1),
      createTodoItem(
        "Vardagsrum",
        "Städa under soffan (dammigt)",
        Date.now() + 2
      ),
      createTodoItem("Handla", "Glömde köpa ost på burk", Date.now() + 3)
    );
  },
  create: function () {
    const inputTitle = document.querySelector("input[name='todo-title']");
    const inputText = document.querySelector("input[name='todo-text']");
    this.listOfTodos.push(createTodoItem(inputTitle.value, inputText.value));
    this.render();
  },
  update: function (id) {
    let itemIndex = this.listOfTodos.findIndex((item) => item.id == id);
    this.listOfTodos[itemIndex].checked = !this.listOfTodos[itemIndex].checked;
    this.render();
  },
  remove: function (id) {},
  render: function () {
    this.elements.container.innerHTML = "";

    this.listOfTodos.forEach((item) => {
      const newTodoItem = document.createElement("div");
      const newTodoDate = document.createElement("span");
      const newTodoTitle = document.createElement("h2");
      const newTodoText = document.createElement("p");
      const newBtnRemove = document.createElement("button");
      const newBtnCheck = document.createElement("button");
      const newBtnRemoveIcon = document.createElement("img");

      newTodoTitle.innerText = item.title;
      newTodoDate.innerText = `${item.id}`;
      newTodoText.innerText = item.text;
      newBtnRemoveIcon.src = "../assets/ic_trash.svg";
      newBtnCheck.innerText = item.checked ? "Done" : "Mark Done";

      newBtnRemove.appendChild(newBtnRemoveIcon);

      item.checked ? newTodoItem.classList.add("todo-checked") : null;
      newTodoItem.classList.add("todo-item", `card-color-${item.colorIndex}`);
      newBtnRemove.classList.add("btn-remove-todo");

      newBtnRemove.addEventListener("click", function () {
        App.remove(item.id);
      });

      newBtnCheck.addEventListener("click", function () {
        App.update(item.id);
      });

      newTodoItem.append(
        newTodoTitle,
        newTodoDate,
        newTodoText,
        newBtnRemove,
        newBtnCheck
      );
      this.elements.container.appendChild(newTodoItem);
    });
  },
};

function createTodoItem(suppliedTitle, suppliedText, suppliedId) {
  const ranColIndex = Math.floor(Math.random() * 3 + 1);
  return {
    id: suppliedId ? suppliedId : Date.now(),
    title: suppliedTitle,
    text: suppliedText,
    colorIndex: ranColIndex,
    checked: false,
  };
}

function onFormSubmit() {
  App.create();
}

App.addInitialTodos();
App.render();

function logApp() {
  console.table(App.listOfTodos);
}
