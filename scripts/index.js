'use strict';

import {store} from "./store.js";
import {domOperations} from "./domOperations.js";
import {data} from './dataAPI.js'

document.addEventListener('DOMContentLoaded', () => {

    store.setInitialLSState();

    if (localStorage.getItem('theme') !== store.theme) {
        domOperations.setTheme(store.theme);

    }

    domOperations.paintTodos(store.todos.getAllTodos())

})



const switchThemeBtn = document.querySelector(".theme-switcher");
switchThemeBtn.addEventListener("click", () => {
    domOperations.setTheme();
})

const findInput = document.querySelector('.find-input');
findInput.addEventListener('keydown', (e) => {
    store.todos.setFilteredValue(e.target.value);
    domOperations.paintTodos(store.todos.findTodos(e.target.value));

})

const buttonsWrapper = document.querySelector('.buttons-wrapper');
buttonsWrapper.addEventListener("click", (e) => {
    domOperations.toggleMode(store.todos.toggleMode(e.target.textContent));
    domOperations.paintTodos(store.todos.getAllTodos())
    findInput.value = '';
    store.todos.setFilteredValue('');
})

const createInput = document.querySelector('.create-input');
const createForm = document.querySelector('.create-form');
createForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get("create-input");

    if (name !== '') {
        store.todos.addTodo(data.prepareTodo(name.trim()))
        domOperations.paintTodos(store.todos.getMode() === 'all todos' ? store.todos.getAllTodos() : store.todos.getImportantTodos());
    } else {
        return
    }

    createForm.reset()
})



const todosUl = document.querySelector('.todos-list');






