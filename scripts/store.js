'use strict';
import {data} from "./dataAPI.js";

export const store = {
    theme: 'light',
    todos: {
        mode: 'all todos',
        data: [],
        filteredValue: '',

        getFilteredValue () {
          return this.filteredValue
        },

        setFilteredValue(str)  {
            this.filteredValue = str;
        },

        getImportantTodos() {
            return this.getLSState().todos.filter((todo) => todo.important);
        },

        getAllTodos() {
            return this.getLSState().todos;
        },

        getMode() {
            return this.mode
        },

        getQuantity() {
            return this.getLSState().todos.length
        },

        addTodo(todo) {
          const newArr= [...this.getLSState().todos, todo];
          this.quantity = this.data.length;
          this.updateLSSTodos(newArr);

        },

        removeTodo(id) {
          const newArr = this.getLSState().todos.filter((item) => item.id !== id);
          this.quantity = this.getAllTodos().length;
          this.updateLSSTodos(newArr);

        },

        toggleDone(id) {
            const newArr = this.getLSState().todos.map((item) => {
                if (item.id === id) {
                    item.done = !item.done;
                    return item;
                }
                return item;
            })
            this.updateLSSTodos(newArr);
        },

        toggleImportant(id) {
           const newArr = this.getLSState().todos.map((item) => {
                if (item.id === id) {
                    item.important = !item.important;
                    return item;
                }
                return item;
            })
            this.updateLSSTodos(newArr);
        },

        findTodos(str) {
            const operatedData = this.getMode() === 'all todos' ? this.getAllTodos() : this.getImportantTodos();

            return operatedData.filter((todo) => todo.title.toLowerCase().includes(String(str).trim().toLowerCase()))
        },

        toggleMode(buttonTitleMode) {
            if (buttonTitleMode.toLowerCase() === this.mode) {
                return
            }
            this.mode = buttonTitleMode.toLowerCase();
            return this.mode

        },

        updateLSSTodos(arr) {
            localStorage.setItem('todos', JSON.stringify(arr));
            return arr;
        },

        getLSState() {
            const todos = JSON.parse(localStorage.getItem('todos'));
            const theme = localStorage.getItem('theme');

            return {todos, theme};
        },
    },

    toggleTheme() {
        this.theme = this.theme === 'light' ? 'dark' : 'light'
        this.updateLSTheme(this.theme);
        return this.theme;
    },


    updateLSTheme(theme) {
        localStorage.setItem('theme', theme);
        return theme;
    },


    clearLSState() {
        localStorage.clear();
    },

    setInitialLSState() {

        if (!localStorage.getItem('todos')) {
            localStorage.setItem('todos', JSON.stringify(data.generateMockedData()));
        }

        if (!localStorage.getItem('theme')) {
            localStorage.setItem('theme', 'light');
        }
    }

}
