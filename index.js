(function(){

    let tasks= [];
    const taskslist =document.getElementById("list");
    const addTaskinput =document.getElementById("add");
    const taskCounter =document.getElementById("task-counter");
    console.log("working");
    
    function addTaskToDom(task){
        
        const li = document.createElement('li');
        li.innerHTML=`
       <input type="checkbox" id="${task.id}" ${task.done ? 'checked':'' } class="custom-checkbox">
       <label for="${task.id}">${task.text}</label>
       <img src="./delete.jpg" class="delete" data-id="${task.id}">
       `; 
        taskslist.append(li);
    }
     
    function renderlist(){
    taskslist.innerHTML= '';
    for(let i=0; i<tasks.length; i++){
    addTaskToDom(tasks[i]);
    
    }
    taskCounter.innerHTML=tasks.length;
    
    }
    
    
    function addTask(task){
        if(task){
        tasks.push(task);
        renderlist()
        showNotification("task added succesfully");
        return;
        }
    
        showNotification("task can not be added");
    }
    
    function deleteTask(taskId){
    const newTask=tasks.filter(function(task){
       return task.id!==taskId;
    });
    
    tasks=newTask;
    renderlist();
    showNotification("task deleted succesfully");
    
    }
    
    function checkedtask(taskid){
        const task=tasks.filter(function(task){
            return task.id === taskid;
         });
    
         if(task.length>0){
            const currentTask = task[0];
    
            currentTask.done=!currentTask.done;
            renderlist();
            showNotification("list is marked sucessfully")
            return;
         }
        showNotification("list can not mark")
    }
    
    function showNotification(text){
    alert(text);
    }
    
    function pressKey(e){
        if(e.key==='Enter'){
            const text = e.target.value;
            console.log(text);
        
        if(!text){
            showNotification("task text cannot be empty");
            return;
        }
    const task={
        text:text,
        id:Date.now().toString(),
        done:false
    }
    e.target.value='';
     addTask(task);
    }
    }
    function handleClickPress(e){
        if(e.target.className==="delete"){
            const taskid=e.target.dataset.id;
            deleteTask(taskid);
            return;
    
        }else if (e.target.className==="custom-checkbox"){
            const taskid=e.target.id;
            checkedtask(taskid);
            return;
        }
    }
    
    function intialize(){
    addTaskinput.addEventListener("keyup",pressKey);
    document.addEventListener('click',handleClickPress);
    }
    
    intialize();
})();
