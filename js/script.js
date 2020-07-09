'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoContainer, todoItem) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoContainer = document.querySelector(todoContainer);
        this.todoItem = document.querySelectorAll(todoItem);

        this.todoData = new Map(JSON.parse(localStorage.getItem('toDokey')));
    }
    addToStorage() {
        localStorage.setItem('toDokey', JSON.stringify([...this.todoData]));
    }
    render() {
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem, this);
        this.addToStorage();
    }
    createItem(todo) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.dataset.key = todo.key;
        li.insertAdjacentHTML('beforeend', `
        <span class="text-todo">${todo.value}</span>
        <div class="todo-buttons">
            <button class="todo-remove"></button>
            <button class="todo-complete"></button>
        </div>
        `);
        if (todo.completed) {
            this.todoCompleted.append(li);
        } else {
            this.todoList.append(li);
        }
    }
    addTodo(elem) {
        elem.preventDefault();
        if (this.input.value === '') {
            alert('Пустое дело добавить нельзя!');
        }

        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        }
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));

        this.handler();
        this.render();
    }
    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }
    deleteItem(id) {


        this.todoData.forEach(index => {
            if (index.key === id) {
                console.log(index);
                this.todoData.delete(index);
                console.log(this.todoData);

            }
        });


        this.render();




    }
    completedItem(id) {


    }
    handler() {
        this.todoContainer.addEventListener('click', e => {
            let id;
            if (e.target.closest('.todo-remove')) {
                id = e.target.closest('li').dataset.key;
                this.deleteItem(id);
            } else if (e.target.closest('.todo-complete')) {
                id = e.target.closest('li').dataset.key;
                this.completedItem(id);
            }
        });

    }

}
const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container', '.todo-item');
todo.init();




