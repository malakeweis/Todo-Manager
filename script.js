document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskButton = document.getElementById("addTaskButton");
  const todoList = document.getElementById("todoList");
  const deleteDoneTasks = document.getElementById("deleteDoneTasks");
  const deleteAllTasks = document.getElementById("deleteAllTasks");
  const allTasksButton = document.getElementById("allTasks");
  const doneTasksButton = document.getElementById("doneTasks");
  const todoTasksButton = document.getElementById("todoTasks");
  const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";
  const renderTasks = (filter = "all") => {
    todoList.innerHTML = "";

    tasks
      .filter((task) => {
        if (filter === "done") return task.done;
        if (filter === "todo") return !task.done;
        return true;
      })
      .forEach((task, index) => {
        const listItem = document.createElement("li");
        listItem.className = "task-item";
        listItem.innerHTML = `
        <span style="${task.done ? "text-decoration: line-through;" : ""}">${
          task.name
        }</span>
        <div>
          <input type="checkbox" ${
            task.done ? "checked" : ""
          } data-index="${index}" class="toggle-task">
          <button data-index="${index}" class="edit-task"><i data-index="${index}" class="fa-solid fa-pen edit-task" style="color: #FFD43B;"></i></button>
          <button data-index="${index}" class="delete-task">
            <i data-index="${index}" class="fa-solid fa-trash delete-task" style="color: #d70909;"></i>
          </button>
        </div>
      `;
        todoList.appendChild(listItem);
      });
  };

  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks(currentFilter);
  };

  addTaskButton.addEventListener("click", () => {
    const taskName = taskInput.value.trim();
    if (taskName.length < 5) {
      alert("Task must be at least 5 characters long.");
      return;
    }
    tasks.push({ name: taskName, done: false });
    saveTasks();
    taskInput.value = "";
  });

  todoList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("toggle-task")) {
      tasks[index].done = !tasks[index].done;
    } else if (e.target.classList.contains("edit-task")) {
      const newName = prompt("Edit task name:", tasks[index].name);
      if (newName) tasks[index].name = newName.trim();
    } else if (e.target.classList.contains("delete-task")) {
      tasks.splice(index, 1);
    }
    saveTasks();
  });
  allTasksButton.addEventListener("click", () => {
    currentFilter = "all";
    renderTasks("all");
  });

  doneTasksButton.addEventListener("click", () => {
    currentFilter = "done";
    renderTasks("done");
  });

  todoTasksButton.addEventListener("click", () => {
    currentFilter = "todo";
    renderTasks("todo");
  });
  deleteDoneTasks.addEventListener("click", () => {
    const filteredTasks = tasks.filter((task) => !task.done);
    tasks.length = 0;
    tasks.push(...filteredTasks);
    saveTasks();
  });

  deleteAllTasks.addEventListener("click", () => {
    tasks.length = 0;
    saveTasks();
  });

  renderTasks(currentFilter);
});
