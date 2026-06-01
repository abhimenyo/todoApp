const todoForm = document.querySelector('form')

const todoInput = document.getElementById('inputTodo')

const todolistUL = document.getElementById('todo-list')

let allTodos = getTodos()
updateTodoList()


todoForm.addEventListener('submit', function(e){
    e.preventDefault()
    addTodo();
})


function addTodo(){
    const todoText = todoInput.value.trim()

    if (todoText.length > 0) {

        const addBtn = document.getElementById("addTodo");

        addBtn.classList.add("clicked");

        setTimeout(() => {
            addBtn.classList.remove("clicked");
        }, 300);

        const todoObj = {
            text: todoText,
            completed: false
        }

        allTodos.push(todoObj)
        updateTodoList()
        saveTodos()
        todoInput.value = ""
    }
}



function updateTodoList(){
    todolistUL.innerHTML = ""
    allTodos.forEach((todo, todoIndex)=>{
        const todoItem = createTodoItem(todo, todoIndex)
        todolistUL.append(todoItem)
    })
}



function createTodoItem(todo, todoIndex) {
    const todoId = "todo-"+todoIndex
    const todoLi = document.createElement("li")
    const todoText = todo.text
    todoLi.className = "todo"
    todoLi.innerHTML = `
   
                <input type="checkbox" id="${todoId}" />
                <label for="${todoId}" class="custom-checkbox">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3">
                <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                </svg>
                </label>
                <label for="${todoId}" class="todo-text">
                    ${todoText}
                </label>
                <button class="deletebtn">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
                </button>
            `
    
    const deletebutt = todoLi.querySelector(".deletebtn")
    deletebutt.addEventListener('click', ()=>{
        deleteTodo(todoIndex)
    })
    const checkbox = todoLi.querySelector("input")
    checkbox.addEventListener("change", ()=>{
        allTodos[todoIndex].completed = checkbox.checked
        saveTodos()
    })
    checkbox.checked = todo.completed
    return todoLi
}



function deleteTodo(todoIndex){
    allTodos = allTodos.filter((_, i)=> i !== todoIndex)
    saveTodos()
    updateTodoList()
}



function saveTodos(){
    const todosJson = JSON.stringify(allTodos)
    localStorage.setItem("todos", todosJson)
}




function getTodos() {
    const todos = localStorage.getItem("todos") || "[]"
    return JSON.parse(todos)
}

const hexInput = document.getElementById("hexcode");

const defaultBtn = document.getElementById("defaultColor");

const DEFAULT_ACCENT = "#ff7700";

const savedColor = localStorage.getItem("accentColor");

if (savedColor) {
    document.documentElement.style.setProperty(
        "--accent-color",
        savedColor
    );
    hexInput.value = savedColor;
}

hexInput.addEventListener("input", () => {
    let color = hexInput.value;

    if (!color.startsWith("#")) {
        color = "#" + color.replace(/#/g, "");
        hexInput.value = color;
    }

    if (/^#[0-9A-Fa-f]{6}$/.test(color)) {
        document.documentElement.style.setProperty(
            "--accent-color",
            color
        );

        localStorage.setItem("accentColor", color);
    }
});

defaultBtn.addEventListener("click", () => {
    document.documentElement.style.setProperty(
        "--accent-color",
        DEFAULT_ACCENT
    );

    localStorage.setItem("accentColor", DEFAULT_ACCENT);
    hexInput.value = DEFAULT_ACCENT;
});

const signInBtn = document.getElementById("signin");

signInBtn.addEventListener("click", () => {
    window.location.href = "./login/login.html";
})