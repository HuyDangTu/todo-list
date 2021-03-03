// selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo ');

// Event Listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click', filterTodo);

//Functions
function addTodo(event) {
    //prevent from form submitting and reload the page
    event.preventDefault();
    const todoDiv = document.createElement("div"); 
    todoDiv.classList.add('todo');
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; 
    //add class 
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //Add to local storage
    saveLocal(todoInput.value);
    //CHECK MARK BUTTON
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class="fas fa-check"></i>'
    completeButton.classList.add("complete-btn");
    todoDiv.appendChild(completeButton);
    //Trash BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>'
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    //APPEND TO UL TAG
    todoList.appendChild(todoDiv);
    //Clear todo input value
    todoInput.value ="";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement;
        console.log(todo);
        todo.classList.add("fall");
        removeLocal(todo);
        todo.addEventListener('transitionend',function(){
            todo.remove();
        });
    }
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes;
   todos.forEach(function(todo){
    switch(e.target.value){
        case "all" :
            todo.style.display = 'flex'; 
            break;
        case "completed":
            if(todo.classList.contains('completed')){
                todo.style.display = 'flex'; 
            }
            else{
                todo.style.display="none";
            }
            break;
        case "uncompleted":
            if (todo.classList.contains('completed')) {
                todo.style.display = 'none';
            }
            else {
                todo.style.display = "flex";
            }
            break;
    }
   });
}

function saveLocal(todo){
    //CHECK DO I HAVE ANYTHING
    let todos;
    //Get todo from localStorage
    if(localStorage.getItem('todos') === null){
        todos = [];
    }else{
        todos = JSON.parse(localStorage.getItem('todos'));  
    }
    //Push the new todo to todos
    todos.push(todo);
    //Save the new todos to storage 
    localStorage.setItem("todos",JSON.stringify(todos));
}

function getTodos(){
    let todos;
    //Get todo from localStorage
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add('todo');
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        //Add class 
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completeButton = document.createElement('button');
        completeButton.innerHTML = '<i class="fas fa-check"></i>'
        completeButton.classList.add("complete-btn");
        todoDiv.appendChild(completeButton);
        //Trash BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>'
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);
        //APPEND TO UL TAG
        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo){
    let todos;
    //Get todo from localStorage
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    const index = todos.indexOf(todo.children[0].innerText);
    todos.splice(index,1);
    localStorage.setItem("todos", JSON.stringify(todos));
}