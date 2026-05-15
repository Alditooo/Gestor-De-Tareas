//-- CONSTANT DEFINITION --
const input = document.querySelector("#input")
const select = document.querySelector("#select")
const btnAdd = document.querySelector("#btnAdd")
const taskContainer = document.querySelector("#tasksContainer")
const statsContainer = document.querySelector("#stats")


let taskArray = []

//-- FUNCTION TO ADD A TASK IN THE ARRAY --
function addTask() {

    const newTask = {
        id: taskArray.length,
        name: input.value,
        category: select.value,
        completed: false
    }

    taskArray.push(newTask)

    renderTask()
    clearValues()
    getStats()
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
}

function renderTask() {
    taskContainer.innerHTML = ""
    taskArray.forEach(task =>  {
        const taskRender = document.createElement("div")
        const checkbox = document.createElement("input")
        checkbox.type = "checkbox"

        const textContent = document.createTextNode(` ${task.name} ${task.category.toUpperCase()}`)
        
        checkbox.addEventListener("change", () => toggleTask(task.id))
        checkbox.checked = task.completed
        taskRender.appendChild(checkbox)
        taskRender.appendChild(textContent)

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
        statsContainer.classList = "stats"
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

function clearValues() {
    input.value = ""
    select.value = "work"
}

//-- EVENTS --

btnAdd.addEventListener("click", addTask)
