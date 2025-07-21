const taskModel = {
    STORAGE_KEY: "tasksData",
    tasks: [],

    save() {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.tasks));
        console.log('Tarefas salvas no localStorage!');
    },
    load() {
        const storTasks = localStorage.getItem(this.STORAGE_KEY);

        if(storTasks) {
            this.tasks = JSON.parse(storTasks);
            console.log("Tarefas Salvas no localStorage", this.tasks);
        }else {
            this.tasks = [];
            console.log("Nenhuma tarefa encontrada no localStorage. Iniciando array vazio");
        }
    },
    addTask(content) {
        const newTask = {
            id: 'task-' + Date.now(),
            content: content,
            createdAt: new Date().toISOString(),
            completed: false
        };
        this.tasks.push(newTask);
        this.save();
        return newTask;
    },
    remove(idToRemove) {
        this.tasks = this.tasks.filter(task => task.id !== idToRemove);
        this.save();
        console.log(`Tarefa ${idToRemove} removida do modelo`);
    },
    edit(idToEdit, newContent) {
        const taskToUpdate = this.tasks.find(task => task.id === idToEdit);
        if(taskToUpdate) {
            taskToUpdate.content = newContent;
            this.save();
            console.log(`Tarefa salva com ID ${idToEdit} editada no modelo.`);
        }
    },
    check(id) {
        const taskToCheck = this.tasks.find(task => task.id === id)
        if(taskToCheck) {
            taskToCheck.completed = !taskToCheck.completed;
            this.save();
        }
    }
}