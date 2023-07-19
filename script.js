var taskArray =[];
const taskList=document.getElementById('task-space');
const addTaskInp=document.getElementById('addingTask');
const taskCounter=document.getElementById('task-count')


// The function which will take the input and simply append a <li> tag to our html file

function MakeVisibleTheTask(task){
	const li=document.createElement("li");

	// Creating <li> tag

	li.innerHTML=`
	<li>
	    <input type="checkbox" id="${task.id}" data-id="12" ${task.status ? "checked":""}class="custom-checkbox">
        <label for="${task.id}"><p>${task.text}</p></label>
        <img src="bin.svg" class="delete" data-id="${task.id}">
    </li>`;

    // Inserting <li> tag to the html file

	taskList.append(li)
};


// Rendering the task list whenever task added or removed

function renderList(){

	// Remove the task
	taskList.innerHTML="";

	// Loop over the tasks present in taskArray and call MakeVisibleTheTask function and it will create the list

	for(let i=0; i<taskArray.length; i++){
		MakeVisibleTheTask(taskArray[i]);
	}

	// Updating task counter, how many taks left in the taskArray
	taskCounter.innerHTML=taskArray.length;
}

// To remove the task from the list

function removeTask(TaskID){

	// filter the specfic task and removing

	const newTasks=taskArray.filter(function(task){
		return task.id !== TaskID;
	});

	// Updating the new taskArray with the filtered list
	taskArray=newTasks;
	renderList();
	notification("Task removed successfully")

}

// Adding taks to list

function addTask(newtask){
	if(newtask){
		taskArray.push(newtask);
		renderList();
		notification("Task added successfully");
		return;
	}
	notification("Task connot be added")
}

// Notification on actions

function notification(msg){
	alert(msg);
};

// Keypress Event handler

function handleInputKeyPress(eve){
	if(eve.key==="Enter"){
		const text=eve.target.value;
		if(!text){
			notification("Please enter some task");
			return;
		}
		const Task={
			text:text,
			id:Date.now().toString(),
			status:false
		}
		eve.target.value="";
		addTask(Task);
		console.log(Task)
	}
}

// Mouse clicks handler

function handleClicks(clickss){
	const target = clickss.target;
	console.log(target)

	if(target.className === "delete"){
		const taskId= target.dataset.id;
		removeTask(taskId);
		return;
	} else if(target.className==="checkBox"){
		const tastId= target.dataset.id;
		ToggleTask(taskId);
		return;
	} else if(target.className==="clear-all-task"){
		taskArray.length=0;
		renderList();
		return;

	}
}

// addEventListeners

addTaskInp.addEventListener("keyup",handleInputKeyPress);
document.addEventListener("click",handleClicks);