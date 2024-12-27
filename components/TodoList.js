import {createElement} from "../functions/dom.js";

/**
 * @typedef {object} todo
 * @property {number} id
 * @property {number} title
 * @property {number} completed
 */

export class Todolist {

    /** @type {Todo[]} */
    #todos = []

    /** @type {HTMLUListElement} */
    #listElement = []

    /**
     *
     * @param {Todo[]} todos
     */

    constructor(todos) {
        this.#todos = todos
    }

    /**
     * @param {HTMLElement} element
     */

    appendTo(element) {
        element.innerHTML = `<form class="d-flex pb-4">
        <input required="" class="form-control me-2" type="search" placeholder="What do you need to do?"
               aria-label="Search" name='title'>
        <button class="btn btn-primary">Add</button>
    </form>
    <main>
        <div class="btn-group mb-4 filter" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-outline-primary active" data-filter="all">All</button>
            <button type="button" class="btn btn-outline-primary" data-filter="todo">To do</button>
            <button type="button" class="btn btn-outline-primary" data-filter="done">Done</button>
        </div>

        <ul class="list-group">
        </ul>
    </main>`

        this.#listElement = element.querySelector('.list-group');
        for (let todo of this.#todos) {
            const t = new TodoListItem(todo)
            this.#listElement.append(t.element)
        }
        element.querySelector('form').addEventListener('submit', e => this.onSubmit(e))
    }

    /**
     *
     * @param {SubmitEvent} e
     */
    onSubmit (e) {
        e.preventDefault()
        const form = e.currentTarget
        const title = new FormData(e.currentTarget).get('title').toString().trim()
        if (title === '') {
            return
        }
        const todo = {
            id: Date.now(),
            title,
            completed: false
        }
        const item = new TodoListItem(todo)
        this.#listElement.prepend(item.element)
        form.reset()
    }
}

class TodoListItem {

    #element


    /** @type {Todo}*/
    constructor(todo) {
        const id = `todo-${todo.id}`
        const li = createElement('li', {
            class: 'todo list-group-item d-flex align-items-center'
        })
        this.#element = li
        const checkbox = createElement('input', {
            type: 'checkbox',
            class: 'form-check-input',
            id,
            checked: todo.completed ? '' : null
        })

        const label = createElement('label', {
            class: 'ms-2 form-check-label',
            for: id
        })
        label.innerText = todo.title
        const button = createElement('button', {
            class: 'ms-auto btn btn-danger btn-sm',
        })
        button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">\n' +
            '  <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5m-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5M4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06m6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528M8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5"/>\n' +
            '</svg>'

        li.append(checkbox)
        li.append(label)
        li.append(button)

        button.addEventListener("click", e => this.remove(e))

        this.#element = li
    }

    /**
     *
     * @param {HTMLElement} element
     */
    get element() {
        return this.#element
    }


    /**
     * @param {PointEvent} e
     */
    remove(e) {
        e.preventDefault()
        this.#element.remove()
    }
}

