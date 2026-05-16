//-- CONSTANT DEFINITION --
const input = document.querySelector("#input")
const select = document.querySelector("#select")
const btnAdd = document.querySelector("#btnAdd")
const taskContainer = document.querySelector("#tasksContainer")
const statsContainer = document.querySelector("#stats")

let taskArray = []
let idCounter = 0

//LOCAL STORAGE
const saved = localStorage.getItem("tasks")

if (saved) {
    taskArray = JSON.parse(saved)
    
    if (taskArray.length > 0) {
        idCounter = taskArray[taskArray.length - 1].id + 1
    } else {
        idCounter = 0
    }
    renderTask()
    getStats()
}

//-- FUNCTION TO ADD A TASK IN THE ARRAY --
function addTask() {

    const newTask = {
        id: idCounter++,
        name: input.value,
        category: select.value,
        completed: false
    }

    taskArray.push(newTask)

    renderTask()
    clearValues()
    getStats()
    saveOnStorage()
}

function delTask(id) {
    taskArray = taskArray.filter(task => task.id !== id)

    renderTask()
    getStats()
    saveOnStorage()
}

function toggleTask(id) {

    taskArray.forEach(task => {
        if (task.id == id) {
            task.completed = !task.completed
            return
        }
    })

    renderTask()
    getStats()
    saveOnStorage()
}

function renderTask() {
    taskContainer.innerHTML = ""
    taskArray.forEach(task =>  {
        const taskRender = document.createElement("div")
        taskRender.classList.add("task")
        if (task.completed) {
            taskRender.classList.add("taskCompleted")
        }
        const checkbox = document.createElement("input")
        checkbox.classList.add("checkbox")
        checkbox.type = "checkbox"
        const btnDel = document.createElement("button")
        btnDel.classList = "btnDel"
        btnDel.textContent = "🗑️"
        const textContent = document.createTextNode(` ${task.name} [${task.category.toUpperCase()}]`)
        
        checkbox.addEventListener("change", () => toggleTask(task.id))
        btnDel.addEventListener("click", () => delTask(task.id))
        checkbox.checked = task.completed
        taskRender.appendChild(checkbox)
        taskRender.appendChild(textContent)
        taskRender.appendChild(btnDel)
        // Aqui va el boton de borrar la tarea

        taskContainer.appendChild(taskRender)
    })
}


function getStats() {
    // CREATE COUNTERS
    const totalTasks = taskArray.length
    let workTasks = 0
    let homeTasks = 0
    let studiesTasks = 0
    let completed = 0
    let uncompleted = 0

    // COMPARE THE ARRAY WITH THE VALUES
    taskArray.forEach(task => {
        if (task.category === "work") workTasks++
        if (task.category === "home") homeTasks++
        if (task.category === "studies") studiesTasks++
        if (task.completed === true) completed++
        if (task.completed === false) uncompleted++
    })

    statsContainer.innerHTML = `
    <strong>Total:</strong> ${totalTasks} <br>
    <strong>Completed:</strong> ${completed} <br>
    <strong>Uncompleted:</strong> ${uncompleted} <br>
    <strong>Work:</strong> ${workTasks} <br>
    <strong>Home:</strong> ${homeTasks} <br>
    <strong>Studies:</strong> ${studiesTasks} <br>
    `
}
getStats()
function clearValues() {
    input.value = ""
}

//-- EVENTS --

btnAdd.addEventListener("click", addTask)

document.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask()
    }
})

function saveOnStorage(){
    const savedOnStorage = JSON.stringify(taskArray)
    localStorage.setItem("tasks", savedOnStorage)

}