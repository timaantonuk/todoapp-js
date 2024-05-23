'use strict';
const createInput = document.querySelector(".create-input");
const createButton = document.querySelector(".create-button");
const todosUl = document.querySelector(".todos-list");
let counter = 0;
let counterForImportant = 0;
const todosQuantity = document.querySelector(".todos-quantity");
const noTodosText = document.querySelector(".no-todos");
const noImportantTodos = document.querySelector(".no-important-todos");
const importantTodosBtn = document.querySelector(".important-todos-button");
const allTodosBtn = document.querySelector(".all-todos-button");
const findInput = document.querySelector(".find-input");
const themeSwitcher = document.querySelector(".theme-switcher");
let isDarkTheme = false;

setInterval(()=>{
    if (JSON.parse(localStorage.getItem('todos')).length === 0) {
        noTodosText.style.display = 'block';
    }
}, '20')

createInput.addEventListener("keydown", e => {
    if (e.key === 'Enter') {
        createTodo()
    }
})

createButton.addEventListener("click", (e) => {
    createTodo();
});

function createTodo() {
    const inputValue = createInput.value.trim();
    if (inputValue === "") {
        return;
    }

    if (importantTodosBtn.classList.contains('active')) {
        return;
    }

    const newTodo = {
        value: inputValue,
        id: Date.now(),
        important: false,
        done: false,
    };

    printTodo(newTodo);
    localStorage.setItem('todos', JSON.stringify([...JSON.parse(localStorage.getItem('todos')), newTodo]));
    updateCounter();

    if (JSON.parse(localStorage.getItem('todos')).length > 0) {
        noTodosText.style.display = 'none';
    }

    createInput.value = '';
}

todosUl.addEventListener("click", (event) => {
    if (event.target.classList.contains("trash-btn")) {
        const todoItem = event.target.closest(".todo-item");
        const todoId = todoItem.dataset.id;
        deleteTodo(todoId);
    }
});

todosUl.addEventListener('click', (event) => {
    if (event.target.classList.contains("check-btn")) {
        const todoItem = event.target.closest(".todo-item");
        const todoId = todoItem.dataset.id;
        doneTodo(todoItem, todoId)
    }
})

todosUl.addEventListener('click', (event) => {
    if (event.target.classList.contains("star-btn")) {
        const todoItem = event.target.closest(".todo-item");
        const todoItemParagraph = todoItem.querySelector("p");
        const todoId = todoItem.dataset.id;
        makeImportantTodo(todoItem, todoId, todoItemParagraph);
    }
})

document.addEventListener('DOMContentLoaded', () => {
    paintInitial()
})

importantTodosBtn.addEventListener("click", (event) => {

    const importantBtn = event.target;
    allTodosBtn.classList.add("btn-not-selected");
    event.target.classList.add("btn-selected");
    event.target.classList.add('active')
    filterImportantTodo(event.target);
    updateImportantCounter();
    createInput.placeholder = 'Switch to all todos to create new task';

    if (event.target.classList.contains('active') && JSON.parse(localStorage.getItem('todos')).filter(todo=>todo.important).length === 0) {

                noTodosText.style.display = 'block';
            }


    if (importantTodosBtn.classList.contains('night')) {
        importantTodosBtn.classList.remove('night');
        console.log(importantTodosBtn);
    }

})

allTodosBtn.addEventListener("click", (event) => {
    const allTodoBtn = event.target;
    importantTodosBtn.classList.remove("btn-selected");
    importantTodosBtn.classList.remove("active");
    noTodosText.style.display = 'none';
    allTodoBtn.classList.remove("btn-not-selected");
    showAllTodo(allTodoBtn);
    updateCounter();
    createInput.placeholder = 'Create your task...'

    if (isDarkTheme) {
        importantTodosBtn.classList.add('night');
    }



})

themeSwitcher.addEventListener("click", (event) => {
    changeTheme();
})

function paintInitial() {
    const arr = JSON.parse(localStorage.getItem('todos'));
    const todoItem = document.querySelectorAll(".todo-item");
    todoItem.forEach((todo, index) => {

        if (todo.textContent.trim() === arr[index].value.trim() && arr[index].done === true) {
        todo.classList.add('done')
        }

        if (todo.textContent.trim() === arr[index].value.trim() && arr[index].important === true) {
            todo.querySelector('p').classList.add('important');
            todo.classList.add('important');
        }
    })
}

function filterImportantTodo(importantBtn) {

   let li = todosUl.querySelectorAll(".todo-item");

   li.forEach(todo => {
       if (!todo.classList.contains('important')) {
           todo.style.display = 'none';
       }
   })

}

function updateImportantCounter() {
    counterForImportant = JSON.parse(localStorage.getItem('todos')).filter(todo => todo.important).length;
    todosQuantity.innerHTML = `Todos Quantity: ${counterForImportant}`;


}

function showAllTodo(allTodoBtn) {
    let li = todosUl.querySelectorAll(".todo-item");

    li.forEach(todo => {
        todo.style.display = 'flex';
    })
}

function makeImportantTodo(todoItem, todoId, todoItemParagraph) {

    const modifiedArr = JSON.parse(localStorage.getItem('todos')).map((todo) => {
        if (+todo.id === +todoId) {
            return {...todo, important: !todo.important};
        }
        return todo;
    });

    localStorage.setItem('todos', JSON.stringify(modifiedArr));

    todoItem.classList.toggle('important')
    todoItem.querySelector('p').classList.toggle('important')

}

function doneTodo(todoItem, todoId) {
    const modifiedArr = JSON.parse(localStorage.getItem('todos')).map((todo) => {
        if (+todo.id === +todoId) {
            return {...todo, done: !todo.done};
        }
        return todo;
    });

    localStorage.setItem('todos', JSON.stringify(modifiedArr));
    todoItem.classList.toggle('done')
}

function deleteTodo(todoId) {

    const filteredArr = JSON.parse(localStorage.getItem('todos')).filter(todo => +todo.id !== +todoId);

    localStorage.setItem('todos',  JSON.stringify(filteredArr))

    document.querySelector(`.todo-item[data-id="${todoId}"]`).remove();
    updateCounter();




}

function updateCounter() {
    counter = JSON.parse(localStorage.getItem('todos')).length;
    todosQuantity.innerHTML = `Todos Quantity: ${counter}`;
}

function changeTheme() {
    const rootElement = document.documentElement;
    const todoBtns = document.querySelectorAll('img');

    if (isDarkTheme) {

        rootElement.style.setProperty('--body-bg-color', '#f0f0f0');
        rootElement.style.setProperty('--text-color', '#000000');
        rootElement.style.setProperty('--app-bg-color', '#ffffff');
        createInput.style.color = '#000'
        todoBtns.forEach(todo => {
            todo.style.filter = 'invert(1%)'
        });
    } else {

        rootElement.style.setProperty('--body-bg-color', '#0c0e11');
        rootElement.style.setProperty('--text-color', '#ffffff');
        rootElement.style.setProperty('--app-bg-color', '#0c0e11');
        createInput.style.color = '#000'
        findInput.style.color = '#000'
        importantTodosBtn.classList.add('night');
        todoBtns.forEach(todo => {
            todo.style.filter = 'invert(100%)'
        });
    }

    isDarkTheme = !isDarkTheme;
}

if (localStorage.getItem('todos') === null) {

    localStorage.setItem('todos', JSON.stringify([
        {
            value: 'Learn JavaScript',
            id: Date.now(),
            important: false,
            done: false,
        },
        {
            value: 'Walk with a dog',
            id: Date.now() + 1,
            important: false,
            done: false,
        }
    ]));
}

printStandartTodos(JSON.parse(localStorage.getItem('todos')));

function printStandartTodos(arrOfTodos) {
    arrOfTodos.forEach(todo => {
        printTodo(todo);
    });
    updateCounter();

}

function printTodo(todo) {
    todosUl.innerHTML += `<li class="todo-item" data-id="${todo.id}">
        <p>${todo.value}</p>
        <div class="icons-wrapper">
            <img src="./images/delete.png" class="trash-btn" alt="delete todo">
            <img src="./images/check.png" class="check-btn" alt="complete todo">
            <img src="./images/star.png" class="star-btn" alt="make important todo">
        </div>
    </li>`;
}

document.querySelectorAll(".todo-item").forEach(todo => {

})

findInput.addEventListener("keydown", (event) => {
    document.querySelectorAll(".todo-item").forEach(todo => {
        if (todo.textContent.trim().toUpperCase().includes(event.target.value.toUpperCase())) {
            todo.style.display = 'flex';
        } else {
            todo.style.display = 'none';
        }

        if (event.target.value.toUpperCase() === '') {
            todo.style.display = 'flex';
        }
    })
})

