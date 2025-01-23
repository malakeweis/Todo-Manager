 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"></link>
document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const todoList = document.getElementById('todoList');
    const deleteDoneTasks = document.getElementById('deleteDoneTasks');
    const deleteAllTasks = document.getElementById('deleteAllTasks');
  
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  
    const renderTasks = () => {
      todoList.innerHTML = '';
      tasks.forEach((task, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'task-item';
        listItem.innerHTML = `
          <span style="${task.done ? 'text-decoration: line-through;': ''}">${task.name}</span>
          <div class="action-buttons" >
          <div>
           
            <input type="checkbox" ${task.done ? 'checked' : ''} data-index="${index}" class="todo-checkbox" >
            <button data-index="${index}"  class="edit-btn"><i class="fa-solid fa-pen" style="color: #FFD43B;"></i></button>
            <button data-index="${index}" class="delete-btn"><i class="fa-solid fa-trash" style="color: #d70909;"></i></button>
          </div>
        `;
        todoList.appendChild(listItem);
      });
    };
  
    const saveTasks = () => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
      renderTasks();
      
    };
  
    addTaskButton.addEventListener('click', () => {
      const taskName = taskInput.value.trim();
      if (taskName.length < 5) {
        alert('Task must be at least 5 characters long.');
        return;
      }
      tasks.push({ name: taskName, done: false });
      saveTasks();
      taskInput.value = '';
    });
  
    todoList.addEventListener('click', (e) => {
      const index = e.target.dataset.index;
      if (e.target.classList.contains('toggle-task')) {
        tasks[index].done = !tasks[index].done;
      } else if (e.target.classList.contains('edit-task')) {
        const newName = prompt('Edit task name:', tasks[index].name);
        if (newName) tasks[index].name = newName.trim();
      } else if (e.target.classList.contains('delete-task')) {
        tasks.splice(index, 1);
      }
      saveTasks();
      
    });
  
    deleteDoneTasks.addEventListener('click', () => {
      const filteredTasks = tasks.filter((task) => !task.done);
      tasks.length = 0;
      tasks.push(...filteredTasks);
      const confirmation = confirm("Are you sure you want to delete all done tasks?");
  if (confirmation) {
      localStorage.removeItem('todos'); 
      renderTodos(); 
      alert("All tasks have been deleted.");
  } else {
      alert("Deletion canceled.");
  }
      saveTasks();
      
    });
  
    deleteAllTasks.addEventListener('click', () => {
      tasks.length = 0;
      const confirmation = confirm("Are you sure you want to delete all tasks?");
      if (confirmation) {
          localStorage.removeItem('todos'); 
          renderTodos(); 
          alert("All tasks have been deleted.");
      } else {
          alert("Deletion canceled.");
      }
      saveTasks();
    });
  
    renderTasks();
  });