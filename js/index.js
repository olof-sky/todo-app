const baseUrl = "https://api.jsonbin.io/v3/b/";
const ourTodoUrl = baseUrl + "6396ebd6811f2b20b0862117";
const masterKey =
  "$2b$10$0t9d9/qWupIy182JLJJOYONDLCpfRXImnsGkkrUJ6oGniF929oXsi";

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
  fetchTodos: function () {
    fetch(ourTodoUrl, {
      headers: {
        "X-Master-Key": masterKey,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then((data) => {
        data.record.forEach((item) => this.create(item.title, item.text));
      })
      .catch(function (err) {
        console.log("Error: " + err);
      });
  },
  create: function (title, text) {
    const inputTitle =
      title || document.querySelector("input[name='todo-title']").value;
    const inputText =
      text || document.querySelector("input[name='todo-text']").value;
    this.listOfTodos.push(createTodoItem(inputTitle, inputText));
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
App.fetchTodos();
App.render();

function logApp() {
  console.table(App.listOfTodos);
}
