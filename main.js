const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
// const todoContainer = document.querySelector('.todo__container');
const todoList = document.querySelector('.todo__list');
const filterList = document.querySelector('.filter__todo');

const addTodo = (event) => {
  event.preventDefault()

  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');
  const newTodo = document.createElement('li');
  newTodo.classList.add('todo__item');
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  saveToLocalStorage(todoInput.value)

  const completedButton = document.createElement('button');
  completedButton.innerHTML = `<i class="fas fa-check"><i/>`;
  completedButton.classList.add('completed__button');
  todoDiv.appendChild(completedButton);

  const deleteButton = document.createElement('button');
  deleteButton.innerHTML = `<i class="fas fa-trash"><i/>`;
  deleteButton.classList.add('delete__button');
  todoDiv.appendChild(deleteButton);

  todoList.appendChild(todoDiv);

  todoInput.value = '';
}

const deleteCheck = (event) => {
  event.preventDefault();  
  const item = event.target;

  if(item.classList[0] === 'delete__button') {
    const todo = item.parentElement;
    todo.classList.add('fall');
    removeLocalTodo(todo)
    todo.addEventListener('transitionend', () => {
      todo.remove();
    })
  }

  if(item.classList[0] === 'completed__button') {
    const todo = item.parentElement;
    todo.classList.toggle('completed')
  }

}

const filterTodo = (e) => {
  const todos = todoList.childNodes;
console.log(e.target.value)
  todos.forEach(ele => {
    switch(e.target.value) {
      case "all":
        ele.style.display ='flex';
        break;
      case "completed":
        if(ele.classList.contains('completed')) {
          ele.style.display ='flex';
        }else {
          ele.style.display ='none';
        }
        break;
      case 'uncompleted':
        if(!ele.classList.contains('completed')) {
          ele.style.display ='flex';
        }else {
          ele.style.display ='none';
        }
        break;
    }
  })

}

const saveToLocalStorage = (todo) => {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.push(todo)

  localStorage.setItem('todos', JSON.stringify(todos));
}

const getTodos = () => {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  todos.forEach(ele => {
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.classList.add('todo__item');
    newTodo.innerText = ele;
    todoDiv.appendChild(newTodo);

    const completedButton = document.createElement('button');
    completedButton.innerHTML = `<i class="fas fa-check"><i/>`;
    completedButton.classList.add('completed__button');
    todoDiv.appendChild(completedButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerHTML = `<i class="fas fa-trash"><i/>`;
    deleteButton.classList.add('delete__button');
    todoDiv.appendChild(deleteButton);

    todoList.appendChild(todoDiv);
  })
}

const removeLocalTodo = (todo) => {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  const todoValue = todo.children[0].innerText;
  const todoIndex = todos.indexOf(todoValue)
  todos.splice(todoIndex, 1)

  localStorage.setItem('todos', JSON.stringify(todos));

}

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterList.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)
