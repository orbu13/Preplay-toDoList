const button = document.querySelector("#button")
const taskContainer = document.querySelector(".taskContainer")
let emptyArray = JSON.parse(localStorage.getItem("todos")) || []

button.addEventListener("click", addToList)

function addToList(){
    const inputElement = document.querySelector("#toDo")
    input = inputElement.value
    if(input === ""){
        alert("Please Add Your Task")
    }else{
        const newToDo = {text: input, completed: false, id: Math.ceil(Math.random()*10000)}
        emptyArray.push(newToDo)
        inputElement.value = ""
    }
    console.log(emptyArray);
    updateStorage()
    displayTask()
}

function displayTask(){
    taskContainer.innerHTML = ""
    emptyArray.forEach(element => {
        const taskDiv = document.createElement("div")
        taskDiv.classList.add("taskDiv")
        if(element.completed === true){
            taskDiv.classList.add("completed")
        }
        const deleteButton = document.createElement("button")
        deleteButton.innerHTML = '<i class="fa-solid fa-trash-arrow-up"></i>'
        deleteButton.id = element.id
        deleteButton.addEventListener("click", deleteTask)
        const editButton = document.createElement("button")
        editButton.innerHTML = '<i class="fa-regular fa-pen-to-square"></i>'
        editButton.id = element.id
        editButton.addEventListener("click", editTask)
        const updatingButton = document.createElement("button")
        updatingButton.innerHTML = "&check;"
        updatingButton.id = element.id
        updatingButton.addEventListener("click", updateToDo)
        const textElement = document.createElement("p")
        textElement.innerText = element.text
        taskDiv.appendChild(textElement)
        taskDiv.appendChild(updatingButton)
        taskDiv.appendChild(deleteButton)
        taskDiv.appendChild(editButton)
        taskContainer.appendChild(taskDiv)
    });
}
displayTask()

function deleteTask(e){
    console.log(e.target.id);
    for(let i = 0; i < emptyArray.length; i++){
        if(+e.target.parentElement.id === emptyArray[i].id){
            emptyArray.splice(i,1)
            break
        }
    }
    console.log(emptyArray);
    updateStorage()
    displayTask()
}

function updateToDo(e){
    for(let i = 0; i < emptyArray.length; i++){
        if(+e.target.id === emptyArray[i].id){
            emptyArray[i].completed = !emptyArray[i].completed 
            break
        }
    }
    updateStorage()
    displayTask()
}

function updateStorage(){
    localStorage.setItem("todos", JSON.stringify(emptyArray))
}

function editTask(e){
    const taskId = e.target.parentElement.id
    console.log(taskId);
    const currentText = e.target.parentElement.parentElement.firstChild.innerText
    console.log(currentText);
    const input = document.querySelector("#editTaskInput")
    input.value = currentText
    const model = document.querySelector(".editContainer")
    model.style.display = "block"
    const saveButton = document.querySelector("#save")
    const closeButton = document.querySelector("#close")
    closeButton.addEventListener("click", ()=>{
        model.style.display = "none"
    })
    saveButton.addEventListener("click", ()=>{
        if(input.value.length < 3){
            alert("New to do is too short")
        }else{
            for(let i = 0; i < emptyArray.length; i++){
                if(+taskId === emptyArray[i].id){
                    console.log("test");
                    console.log(input.value);
                    emptyArray[i].text = input.value
                    break
                }
            }
            model.style.display = "none"
            updateStorage()
            displayTask()
        }
    })
}



// const toDoListDiv = document.createElement("div")
// toDoListDiv.classList.add("toDoListDiv")
// const editButton = document.createElement("button")
// editButton.innerText = "Edit Task"
// editButton.classList.add("editButton")
// // editButton.addEventListener("click", editTask)

// const deleteButton = document.createElement("button")
// deleteButton.innerText = "Delete Task"
// deleteButton.classList.add("deleteButton")
// deleteButton.addEventListener("click", deleteTask)

// console.log(input);
// toDoListDiv.append(input, editButton, deleteButton)
// body.append(toDoListDiv)