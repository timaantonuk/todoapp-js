'use strict';
import {store} from "./store.js";

export const domOperations = {

    paintTodos(data) {

        if (store.todos.getMode() === 'important') {
            data = store.todos.getImportantTodos()
        }


        window.deleteTodo =  function deleteTodo (id)  {

                store.todos.removeTodo(id);
                domOperations.paintTodos(store.todos.getMode() === 'all todos' ? store.todos.getAllTodos() : store.todos.getImportantTodos());

        }

        window.toggleDone = function toggleDone (id) {
            store.todos.toggleDone(id)
            domOperations.paintTodos(store.todos.getMode() === 'all todos' ? store.todos.getAllTodos() : store.todos.getImportantTodos());


        }

        window.toggleImportant = function toggleImportant (id) {
            store.todos.toggleImportant(id);
            domOperations.paintTodos(store.todos.getMode() === 'all todos' ? store.todos.getAllTodos() : store.todos.getImportantTodos());
        }

        const noTodos = document.querySelector('.no-todos');
        const todosUl = document.querySelector('.todos-list');
        const images = document.querySelectorAll('img');


        if (data.length === 0) {
            noTodos.style.display = 'block';
        } else if (data.length > 0) {
            noTodos.style.display = 'none';
        }

        todosUl.innerHTML = '';

        data.forEach(item => {



            todosUl.innerHTML += `<li class="todo-item" data-id="${item.id}">
    <p class="${item.done ? 'done' : ''} ${item.important ? 'important' : ''}">${item.title}</p>
    <div class="icons-wrapper" data-id="${item.id}">

<svg onclick="deleteTodo('${item.id}')" width="25px" height="25px" class="trash-btn" viewBox="-3 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg"
     xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">

    <title>trash</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

    </defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icon-Set-Filled" transform="translate(-261.000000, -205.000000)"
           fill="${store.theme === 'dark' ? '#FFF' : '#000'}">
            <path class="trash-btn" d="M268,220 C268,219.448 268.448,219 269,219 C269.552,219 270,219.448 270,220 L270,232 C270,232.553 269.552,233 269,233 C268.448,233 268,232.553 268,232 L268,220 L268,220 Z M273,220 C273,219.448 273.448,219 274,219 C274.552,219 275,219.448 275,220 L275,232 C275,232.553 274.552,233 274,233 C273.448,233 273,232.553 273,232 L273,220 L273,220 Z M278,220 C278,219.448 278.448,219 279,219 C279.552,219 280,219.448 280,220 L280,232 C280,232.553 279.552,233 279,233 C278.448,233 278,232.553 278,232 L278,220 L278,220 Z M263,233 C263,235.209 264.791,237 267,237 L281,237 C283.209,237 285,235.209 285,233 L285,217 L263,217 L263,233 L263,233 Z M277,209 L271,209 L271,208 C271,207.447 271.448,207 272,207 L276,207 C276.552,207 277,207.447 277,208 L277,209 L277,209 Z M285,209 L279,209 L279,207 C279,205.896 278.104,205 277,205 L271,205 C269.896,205 269,205.896 269,207 L269,209 L263,209 C261.896,209 261,209.896 261,211 L261,213 C261,214.104 261.895,214.999 262.999,215 L285.002,215 C286.105,214.999 287,214.104 287,213 L287,211 C287,209.896 286.104,209 285,209 L285,209 Z"
                  id="trash">

            </path>
        </g>
    </g>
</svg>

      <svg onclick="toggleDone('${item.id}')" width="25px" height="25px" class="check-btn" viewBox="0 -3 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>checkmark</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="Icon-Set-Filled" transform="translate(-518.000000, -1039.000000)" fill="${store.theme === 'dark' ? '#FFF' : '#000'}">
            <path class="check-btn" d="M548.783,1040.2 C547.188,1038.57 544.603,1038.57 543.008,1040.2 L528.569,1054.92 L524.96,1051.24 C523.365,1049.62 520.779,1049.62 519.185,1051.24 C517.59,1052.87 517.59,1055.51 519.185,1057.13 L525.682,1063.76 C527.277,1065.39 529.862,1065.39 531.457,1063.76 L548.783,1046.09 C550.378,1044.46 550.378,1041.82 548.783,1040.2" id="checkmark">

</path>
        </g>
    </g>
</svg>
        
<svg onclick="toggleImportant('${item.id}')" width="25px" height="25px" class="star-btn" viewBox="0 -0.5 21 21" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    
    <title>star_favorite [#1499]</title>
    <desc>Created with Sketch.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="#fff" fill-rule="evenodd">
        <g id="Dribbble-Light-Preview" transform="translate(-99.000000, -320.000000)" fill="${store.theme === 'dark' ? '#FFF' : '#000'}">
            <g id="icons" transform="translate(56.000000, 160.000000)">
                <path class="star-btn" d="M60.556381,172.206 C60.1080307,172.639 59.9043306,173.263 60.0093306,173.875 L60.6865811,177.791 C60.8976313,179.01 59.9211306,180 58.8133798,180 C58.5214796,180 58.2201294,179.931 57.9282291,179.779 L54.3844766,177.93 C54.1072764,177.786 53.8038262,177.714 53.499326,177.714 C53.1958758,177.714 52.8924256,177.786 52.6152254,177.93 L49.0714729,179.779 C48.7795727,179.931 48.4782224,180 48.1863222,180 C47.0785715,180 46.1020708,179.01 46.3131209,177.791 L46.9903714,173.875 C47.0953715,173.263 46.8916713,172.639 46.443321,172.206 L43.575769,169.433 C42.4480682,168.342 43.0707186,166.441 44.6289197,166.216 L48.5916225,165.645 C49.211123,165.556 49.7466233,165.17 50.0227735,164.613 L51.7951748,161.051 C52.143775,160.35 52.8220755,160 53.499326,160 C54.1776265,160 54.855927,160.35 55.2045272,161.051 L56.9769285,164.613 C57.2530787,165.17 57.7885791,165.556 58.4080795,165.645 L62.3707823,166.216 C63.9289834,166.441 64.5516338,168.342 63.423933,169.433 L60.556381,172.206 Z" id="star_favorite-[#1499]">

</path>
            </g>
        </g>
    </g>
</svg>
`
        })


        this.updateQuantity();
    },

    updateQuantity() {
        const todosQuantity = document.querySelector('.todos-quantity');
        todosQuantity.textContent = `Todos Quantity: ${store.todos.getQuantity()}`
    },

    toggleMode(mode) {

        if (!mode) {
            return
        }

        const allTodosBtn = document.querySelector('.all-todos-button')
        const importantTodosBtn = document.querySelector('.important-todos-button')

        if (mode === 'all todos') {
            importantTodosBtn.classList.remove('selected')
            allTodosBtn.classList.add('selected')
        } else {
            importantTodosBtn.classList.add('selected')
            allTodosBtn.classList.remove('selected')
        }
    },

    setTheme() {

        const theme =  store.toggleTheme();
        const root = document.documentElement;
        const fill = document.querySelectorAll('g');

        if (theme === 'dark') {
            root.style.setProperty('--text-color', '#FFF');
            root.style.setProperty('--app-bg-color', 'rgba(9,9,26,0.89)');
            root.style.setProperty( '--body-bg-color', 'rgba(9,9,26,0.89)')
            root.style.setProperty( '--placeholder-color', 'var(--app-bg-color)')
            fill.forEach((g) => {
                g.setAttribute('fill', '#fff');
            })

        } else {
            root.style.setProperty('--text-color', '#000');
            root.style.setProperty('--app-bg-color', '#FFF');
            root.style.setProperty( '--body-bg-color', 'hsla(0,0%,55%,.28)')
            root.style.setProperty( '--placeholder-color', 'hsla(0, 0%, 23%, 0.62)')
            fill.forEach((g) => {
                g.setAttribute('fill', '#000');
            })

        }



    },


}