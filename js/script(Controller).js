
const taskController = {
    
    init() {
        const frm = document.querySelector("form");
        const addTaskInput = frm.task;

        frm.addEventListener("submit", (e) => {
            e.preventDefault();

            const taskContent = addTaskInput.value.trim();
            this.addTask(taskContent);
            frm.reset();
        });

        window.addEventListener("load", () => {
           this.loadTasks();
        })
    },
    addTask(content) {
        const newTask = taskModel.addTask(content);
        taskView.render(newTask);
    },  
    loadTasks() {
       taskModel.load();
       taskView.clean();
       taskModel.tasks.forEach(task => {
        taskView.render(task);
       })
    },
    remove(idToRemove) {
       if(confirm('Tem certeza que deseja excluir essa tarefa?')){
            taskModel.remove(idToRemove);
            this.loadTasks();
       }
    },
    edit(idToEdit) {
        const taskToEdit = taskModel.tasks.find(task => task.id === idToEdit);
        if(taskToEdit){
            const newContent = prompt("Edite o conteúdo da tarefa:", taskToEdit.content);
            if(newContent !== null && newContent.trim() !== ''){
                taskModel.edit(idToEdit, newContent.trim());
                this.loadTasks();
            }else if(newContent !== null) {
                alert("O conteúdo da variável não pode ser vazio!");
            }
        }
    },
    checkAct(idToChecked) {
        taskModel.check(idToChecked);
        this.loadTasks();
    }

}

document.addEventListener("DOMContentLoaded", () => {
    taskController.init();
})