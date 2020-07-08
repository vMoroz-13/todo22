'use strict';

class ToDo {
    constructor(form, input, todoList, todoCompleted, todoRemove, todoComplete, todoContainer) {
        this.form = document.querySelector(form);
        this.input = document.querySelector(input);
        this.todoList = document.querySelector(todoList);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoRemove = document.querySelector(todoRemove);
        this.todoComplete = document.querySelector(todoComplete);
        this.todoContainer = document.querySelectorAll(todoContainer);
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
        li.key = todo.key;
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
    deleteItem(event) {
        console.log(event);

    }
    completedItem() {

    }
    handler() {

        this.todoContainer.forEach(item => {
            console.log(item);
            item.addEventListener('click', event => {
                const target = event.target;

                for (let i = 0; i < this.todoContainer.length; i++) {
                    target.classList.contains('todo-remove');
                    console.log(i);
                    this.deleteItem();
                }
                target.classList.contains('todo-complete');
                this.completedItem();

            });
        });
    }

}
const todo = new ToDo('.todo-control', '.header-input', '.todo-list', '.todo-completed', 'todo-remove', 'todo-complete', 'todo-container');
todo.init();
todo.handler();



