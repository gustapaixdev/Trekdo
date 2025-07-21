const area = document.getElementById("taskList");

const taskView = {
    render(task) {
        const taskCard = document.createElement("div");
        taskCard.className = "task-card";
        taskCard.dataset.taskId = task.id;

            //checkBox

            const taskCheck = document.createElement("div");
            taskCheck.className = "task-checkbox";
            
            //input

            const taskInput = document.createElement("input");
            taskInput.type = "checkbox";
            taskInput.checked = task.completed;
            taskInput.addEventListener("change", () => {
                taskController.checkAct(task.id);

                taskController.loadTasks();
            })
            taskCheck.appendChild(taskInput);
            taskCard.appendChild(taskCheck);

            //content

            const taskContent = document.createElement("div");
            taskContent.className = "task-content";
            
            //title

            const taskTitle = document.createElement("div");
            taskTitle.className = "task-title";
            taskTitle.textContent = task.content;
            if(task.completed){
                taskTitle.classList.add("checked");
            }

            //task-description

            const taskDesc = document.createElement("div");
            taskDesc.className = "task-description";
            const createDate = task.createAt ? new Date(task.createAt) : new Date();
            taskDesc.textContent = `Tarefa criada em ${createDate.toLocaleDateString('pt-BR')}`
            taskContent.appendChild(taskTitle);
            taskContent.appendChild(taskDesc);
            taskCard.appendChild(taskContent);

            //Actions

            const taskActions = document.createElement("div");
            taskActions.className = "task-actions"

            //taskbtn1

            const btn1 = document.createElement("button");
            btn1.className = "task-action-btn";
            btn1.textContent = "✏️";
            btn1.setAttribute("title", "Editar Tarefa");
            btn1.addEventListener("click", () => {
                taskController.edit(task.id);
            })

            //taskbtn2
            
            const btn2 = document.createElement("button");
            btn2.className = "task-action-btn";
            btn2.textContent = "🗑️";
            btn2.setAttribute("title", "Excluir Tarefa");
            btn2.addEventListener("click", () => {
                taskController.remove(task.id);
            })
            taskActions.appendChild(btn1);
            taskActions.appendChild(btn2);
            taskCard.appendChild(taskActions);

        area.appendChild(taskCard);

    },
    clean() {
        document.getElementById("taskList").innerHTML = "";
    }
}