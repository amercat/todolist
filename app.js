import { Todolist } from "./components/TodoList.js";
import { fetchJSON } from  "./functions/api.js";
import { createElement } from "./functions/dom.js";

try {
    const todos = await fetchJSON('https://jsonplaceholder.typicode.com/todos?_limit=5')
    const list = new Todolist(todos)
    list.appendTo(document.querySelector('#todolist'))
} catch (e) {
    const alertElement =  createElement('div', {
        class: 'alert alert-danger m-2',
        role: 'alert'
    })
    alertElement.innerText = 'Unable to load elements';
    document.body.prepend(alertElement);
}
