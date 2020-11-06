
import {fetchData,logOut,postTask,getAllTask} from './utils/getInfo';
import "../todo.css";
var userInformation={};
const submitButton=document.querySelector('.subject');
window.addEventListener('load',e=>{
    const checkToken=localStorage.getItem('token');
    if(!checkToken){
          window.location.replace(window.location.origin+"/index.html");
    }
})
window.addEventListener('load',e=>{
    getTasks();
})
const getTasks=async () =>{
/*   
doneList.querySelectorAll('*').forEach(n => n.remove());

todoList.querySelectorAll('*').forEach(n => n.remove());

progressList.querySelectorAll('*').forEach(n => n.remove());
*/
    var result=await getAllTask();
    if(result){
        if(result.status===200){
            result=result.data;
            result.sort(function(a,b){
                return new Date(a.dueDate)-new Date(b.dueDate);
            })
}
        
        else{
            window.alert("Smoething went wrong");
            return;
        }
    }
    else{
        window.alert('Something went wrong');
        return;
    }
    result.forEach(renderTask);
}




// All declarations and initializations
var btn = document.querySelector(".drpdown");
var btnLogout = document.querySelector("#logout");
const todoCount = document.querySelector("#todo-count");
const progressCount = document.querySelector("#progress-count");
const doneCount = document.querySelector("#done-count");
const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".container");
const todoList = document.querySelector("#todo-list");
const progressList = document.querySelector("#progress-list");
const doneList = document.querySelector("#done-list");
const statusSection = document.querySelector("#status-section");
const infoBox = document.querySelector(".info");

// Event listener on whole document for click


// Dropdown for logout

btn.addEventListener("click", () => {
    if (btnLogout.style.visibility === "visible")
        btnLogout.style.visibility = "hidden";
    else{
     btnLogout.style.visibility = "visible";
    }
});
btnLogout.addEventListener('click',e=>{
    logOut();
    localStorage.clear();
    window.location.replace(window.location.origin+"/index.html");
})



// To update TODO count, Progress count and Done count when a task is dragged to another list

setInterval(() => {
    todoCount.textContent = todoList.childElementCount;
    progressCount.textContent = progressList.childElementCount;
    doneCount.textContent = doneList.childElementCount;
}, 100);

// Drag and drop behaviour

draggables.forEach(draggable => {
    // Adding a blur effect on whole section when we click on any task for its details
    draggable.addEventListener("click", e => {
       var id=e.target.id;
       console.log(id);
       console.log(e.target.textContent);
       console.log(e.target);
  

        if (statusSection.classList.contains("blur")) {
            statusSection.classList.remove("blur");
            infoBox.style.display = "none";
        } else {
            statusSection.classList += " blur";
            infoBox.style.display = "block";
            if (e.target.classList.contains("todo-list-items")) {
                infoBox.style.background = "maroon";
                infoBox.style.color = "white";
            } else if (e.target.classList.contains("progress-list-items")) {
                infoBox.style.background = "rgb(235, 235, 4)";
                infoBox.style.color = "black";
            } else {
                infoBox.style.background = "green";
                infoBox.style.color = "white";
            }
        }
    });

    draggable.addEventListener("dragstart", () => {
        setTimeout(() => {
            draggable.classList.add("hide");
        }, 0);
    });
    draggable.addEventListener("dragend", () => {
        draggable.classList.remove("hide");
    });
});

containers.forEach(container => {
    container.addEventListener("dragover", e => {
        e.preventDefault();
        // In the below line we have used the fact that when an element starts dragging, we have added a class to it i.e. hide class and this class in only present in the element which is being dragged. 
        const currentDraggable = document.querySelector(".hide");
        // Here, we are checking if the container in which we are dropping, contains container class or not beacuse container class is only present in the divs which contain all the items i.e. todo, progress or done at a particular time
        if (e.target.classList.contains("container")) {
            e.target.append(currentDraggable);
        }
    });

    container.addEventListener("drop", e => {
        const currentDraggable = document.querySelector(".hide");
        if (e.target.classList.contains("container")) {
            const targetID = e.target.id;
            currentDraggable.classList = "draggable " + targetID + "-items";
        }
    });
    
});
submitButton.addEventListener('submit',e=>{
    e.preventDefault();
    const des=document.querySelector('.task-description');
    const date=document.getElementById('reminder-date');
    var ele = document.getElementsByName('taskState');
    var state=0;
    
    for(var i=0;i<ele.length;i++){
        if(ele[i].checked){
            state=ele[i].value;
            console.log(ele[i].value);
        }
    }
    const objData={
        "description":des.value,
        "dueDate":date.value,
        "taskState":state
    }
    sendData(objData);
    des.value="";
    date.value="";
   
})
const sendData=async (objData)=>{
     const result=await postTask(objData);
    
    if(result){
        if(result===201){
        window.alert("Added Successfully");
       await getTasks();
        return true;
    }
     else{
        window.alert("Something went wrong");
        return false;
    }
  
}
  return false;  
}
const renderData=objData=>{
    renderTask(objData);
}

const renderTask=objData=>{
     var divSelection=objData.taskState;
     var count;
    if(divSelection==0){
        divSelection="todo";
    }
    else if(divSelection==1){
        divSelection="progress";
    }
    else{
        divSelection="done";
    }
    count=document.getElementById(divSelection+'-count').innerHTML;
    count=parseInt(count)+1;

    divSelection+='-list';
   
    const container=document.getElementById(divSelection);
  

    const html=`<div class="draggable ${divSelection}-items" id="${divSelection}-item-${count}" draggable="true">
                    ${objData.description}
                   <p id="date" class="date--hide">${objData.dueDate}</p>
                </div>`
    container.insertAdjacentHTML('beforeend',html);
}



