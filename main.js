// getting the reference to the DOM elements
const todoInput = document.querySelector('.todo__input');
const todoButton = document.querySelector('.todo__button');
// const todoContainer = document.querySelector('.todo__container');
const todoList = document.querySelector('.todo__list');
const filterList = document.querySelector('.filter__todo');


// craeting the todo list item
const createTodo = ele => {
  // create a div tag
  const todoDiv = document.createElement('div');

  // add a classname to the div
  todoDiv.classList.add('todo');

  // create a list item tag
  const newTodo = document.createElement('li');

  // add a classname to the li
  newTodo.classList.add('todo__item');

  // insert the value from the input as the li content
  newTodo.innerText = ele;

  // insert the Li into the div as a child element
  todoDiv.appendChild(newTodo);

  // create a button tag
  const completedButton = document.createElement('button');

  // insert into the button element
  completedButton.innerHTML = `<i class="fas fa-check"><i/>`;

  // add class to the button
  completedButton.classList.add('completed__button');

  // insert the button into the div as a child element
  todoDiv.appendChild(completedButton);

  // create a button tag
  const deleteButton = document.createElement('button');

  // insert into the button element
  deleteButton.innerHTML = `<i class="fas fa-trash"><i/>`;

  // add class to the button
  deleteButton.classList.add('delete__button');

  // insert the button into the div as a child element
  todoDiv.appendChild(deleteButton);

  // insert the created div into the ul tag as a child
  todoList.appendChild(todoDiv);
}

// create and appent to the ul element in the Dom
const addTodo = event => {
  event.preventDefault()

  createTodo(todoInput.value);

  // save the input value to local storage
  saveToLocalStorage(todoInput.value)

  // reset the value of the input to an empty string
  todoInput.value = '';
}


// deleting and comlete effects
const deleteCheck = event => {
  event.preventDefault();  

  // get the clicked element i.e the created button
  const item = event.target;

  if(item.classList[0] === 'delete__button') {
    // if delete button get the parent element i.e the div
    const todo = item.parentElement;

    // adda a new class to the parent element
    todo.classList.add('fall');

    // remove the div
    removeLocalTodo(todo)

    // end the transition effect
    todo.addEventListener('transitionend', () => {
      todo.remove();
    })
  }

  // if it is the complete bytton get parent element and add a new class to it
  if(item.classList[0] === 'completed__button') {
    const todo = item.parentElement;
    todo.classList.toggle('completed')
  }

}


// filtering the div from the dropdown menu
const filterTodo = e => {
  // get all children of the ul i.e all the created divs
  const todos = todoList.childNodes;
console.log(e.target.value)

  // iterate through all the divs
  todos.forEach(ele => {
    switch(e.target.value) {

      // if value is all displace all the divs
      case "all":
        ele.style.display ='flex';
        break;
      
      // if value is completed displace all the divs that have completed in their class name else display nothing 
      case "completed":
        if(ele.classList.contains('completed')) {
          ele.style.display ='flex';
        }else {
          ele.style.display ='none';
        }
        break;

      // if value is uncompleted displace all the divs that don't have completed in their class name else display nothing 
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



const saveToLocalStorage = todo => {
  let todos;

  // if todos is null at it to an empty array else get the item of the todos
  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  // push the arg passed when function is called into the todos array
  todos.push(todo)

  // save the todos into localstorage
  localStorage.setItem('todos', JSON.stringify(todos));
}


// displaying the todos on the page
const getTodos = () => {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  // iterate through the todos and creating a div that has li and 2 buttons as children and appending it into the ul
  todos.forEach(ele => {
    createTodo(ele);
  })
}


// removing the todo from local storage upon deletion
const removeLocalTodo = todo => {
  let todos;

  if(localStorage.getItem('todos') === null) {
    todos = []
  }else{
    todos = JSON.parse(localStorage.getItem('todos'))
  }

  // get the deleted todo div first child === li, get the inner text
  const todoValue = todo.children[0].innerText;

  // get the index of the text
  const todoIndex = todos.indexOf(todoValue)

  // remove it from the array
  todos.splice(todoIndex, 1)

  localStorage.setItem('todos', JSON.stringify(todos));

}

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterList.addEventListener('click', filterTodo);
document.addEventListener('DOMContentLoaded', getTodos)
