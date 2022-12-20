const baseUrl = "https://api.jsonbin.io/v3/b/";
const ourTodoUrl = baseUrl + "639adccb15ab31599e1cc516";
const masterKey =
  "$2b$10$cxN/hylQoPtUsjGrPqAyi.jH5D32lHBXJrWcOCADNWkzQhnno35Uy";

console.log("BaseUrl:", baseUrl);
console.log("OurTodoUrl:", ourTodoUrl);
console.log("MasterKey:", masterKey);

const App = {
  listOfTodos: [],
  elements: {
    container: document.querySelector(".todo-container"),
  },
  fetchTodos: function () {
    fetch(ourTodoUrl, {
      headers: {
        "X-Master-Key": masterKey,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        let data = response;

        console.log("Data:", data.record);
        this.listOfTodos = [];
        data.record.forEach((obj) => {
          this.listOfTodos.push(obj);
        });

        this.render();
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  },
  create: function () {
    const inputTitle = document.querySelector("input[name='todo-title']");
    const inputText = document.querySelector("textarea[name='todo-text']");
    const backgroundColor = document.querySelector("input[type='color']");
    const newItem = createTodoItem(
      inputTitle.value,
      inputText.value,
      backgroundColor.value
    );
    this.listOfTodos.push(newItem);
    fetch(ourTodoUrl, {
      method: "PUT",
      headers: {
        "X-Master-Key": masterKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.listOfTodos),
    })
      .then(function (response) {
        return response.json();
      })
      .then((response) => {
        let data = response;
        console.log(data);
        this.fetchTodos();
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  },
  update: function (id) {
    let findItemIndex = this.listOfTodos.findIndex((item) => item.id == id);
    this.listOfTodos[findItemIndex].checked =
      !this.listOfTodos[findItemIndex].checked;
    fetch(ourTodoUrl, {
      method: "PUT",
      headers: {
        "X-Master-Key": masterKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.listOfTodos),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.fetchTodos();
      })
      .catch((err) => console.log(err));
  },
  remove: function (id) {
    let findItemIndex = this.listOfTodos.findIndex((item) => item.id == id);
    this.listOfTodos.splice(findItemIndex, 1);
    fetch(ourTodoUrl, {
      method: "PUT",
      headers: {
        "X-Master-Key": masterKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.listOfTodos),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data);
        this.fetchTodos();
      })
      .catch((err) => console.log(err));
  },
  render: function () {
    this.elements.container.innerHTML = "";
    resetForm();
    this.listOfTodos.forEach((item) => {
      const newTodoItem = document.createElement("div");
      const newTodoButtons = document.createElement("span");
      const newTodoTitle = document.createElement("h3");
      const newTodoText = document.createElement("p");
      const removeContainer = document.createElement("div");
      const newBtnRemoveText = document.createElement("p");
      const newBtnRemove = document.createElement("button");
      const checkContainer = document.createElement("div");
      const newBtnCheck = document.createElement("button");
      const newBtnRemoveIcon = document.createElement("img");
      const newBtnCheckIcon = document.createElement("img");
      const checkedText = document.createElement("p");
      const cardColor = document.querySelector("input[type='color']");

      newTodoTitle.textContent = item.title;
      newTodoText.textContent = item.text;
      newBtnRemoveText.textContent = "Delete";
      checkedText.textContent = item.checked ? "Done" : "Mark Done";
      newBtnRemoveIcon.src = "./assets/trashcan.svg";
      newBtnCheckIcon.src = "./assets/checkmark.svg";

      newBtnRemove.appendChild(newBtnRemoveIcon);
      newBtnCheck.appendChild(newBtnCheckIcon);

      checkContainer.append(checkedText, newBtnCheck);
      removeContainer.append(newBtnRemoveText, newBtnRemove);

      newTodoButtons.appendChild(removeContainer);
      newTodoButtons.appendChild(checkContainer);

      newTodoItem.classList.add("todo-item");
      newTodoItem.style.backgroundColor =
        item.colorIndex || `${cardColor.value}`;
      newBtnRemove.classList.add("btn-remove-todo");
      newBtnCheck.classList.add("btn-check-todo");
      checkContainer.classList.add("check-container");
      removeContainer.classList.add("remove-container");
      item.checked ? newTodoItem.classList.add("todo-checked") : null;

      newBtnRemove.addEventListener("click", function () {
        App.remove(item.id);
      });

      newBtnCheck.addEventListener("click", function () {
        App.update(item.id);
      });

      newTodoItem.append(newTodoTitle, newTodoText, newTodoButtons);

      this.elements.container.appendChild(newTodoItem);
    });
  },
};

function createTodoItem(
  suppliedTitle,
  suppliedText,
  backgroundColor,
  suppliedId
) {
  return {
    id: suppliedId ? suppliedId : Date.now(),
    title: suppliedTitle,
    text: suppliedText,
    colorIndex: backgroundColor,
    checked: false,
  };
}

function onFormSubmit() {
  App.create();
}

function resetForm() {
  document.querySelector("input[name='todo-title']").value = "";
  document.querySelector("textarea[name='todo-text']").value = "";
}

App.fetchTodos();
App.render();
