const body = document.querySelector('body');
const inputval = document.querySelector('input');
let todos = [];

inputval.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        addTodo();
    }
});

function addTodo() {
    if (inputval.value === '') {
        return;
    }
    todos.push(inputval.value);
    inputval.value = '';
    render();
}

function removeTodo(index) {
    todos.splice(index, 1);
    render();
}

function render() {
    const todoList = document.getElementById('todos');
    todoList.innerHTML = '';
    if (todos.length === 0) {
        return;
    }
    todos.forEach((element, index) => {
        const todo = document.createElement('div');
        const text = document.createElement('span');
        text.innerText = element;
        inputval.value = '';

        const button = document.createElement('button');
        button.innerText = 'Remove';
        button.onclick = () => removeTodo(index);

        todo.appendChild(text);
        todo.appendChild(button);
        todoList.appendChild(todo);
    });
}
