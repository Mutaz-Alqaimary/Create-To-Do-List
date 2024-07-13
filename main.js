// Setting Up Variables
let theInput = document.querySelector(".add-task input");
let deleteAll = document.querySelector(".add-task .delete-all");
let finishAll = document.querySelector(".add-task .finish-all");
let theAddButton = document.querySelector(".add-task .plus");
let tasksContainer = document.querySelector(".tasks-content");
let tasksCount = document.querySelector(".tasks-count span");
let tasksCompleted = document.querySelector(".tasks-completed span");

// Focus On Input Field
window.onload = function () {
  theInput.focus();
  if (localStorage.length) {
    tasksContainer.innerHTML = "";
    for (let [key, value] of Object.entries(localStorage)) {
      addToPage(key, value);
    }
  }
};

// Adding The Task
theAddButton.onclick = function () {
  // Check If Task Is Exist
  let tasksBox = Array.from(
    document.querySelectorAll(".tasks-content .task-box")
  ).map((e) => e.firstChild.textContent);

  if (tasksBox.includes(theInput.value)) {
    Swal.fire({
      title: "This Task Is Exist in Tasks Container",
      text: "Give Me Another Name",
      icon: "warning",
    });
  } else if (theInput.value === "") {
    // If Input is Empty
    Swal.fire({
      title: "Input Can't Be Impty!",
      text: "Try Again",
      icon: "warning",
    });
  } else {
    if (!localStorage.length) {
      tasksContainer.innerHTML = "";
    }

    addToLocalStorage(theInput.value, "not finish");
    addToPage(theInput.value);
  }
};

// Delete All
deleteAll.onclick = function () {
  if (localStorage.length) {
    localStorage.clear();
    tasksContainer.innerHTML = "";
    createNoTasks();
    theInput.focus();
  }
};

// Finish All
finishAll.onclick = function () {
  if (localStorage.length) {
    let container = Array.from(
      document.querySelectorAll(".tasks-content .task-box")
    );
    container.map((e) => e.classList.add("finished"));
    container.map((e) =>
      addToLocalStorage(e.firstChild.textContent, "finished")
    );
  }
  calculateTasks();
};

document.addEventListener("click", function (e) {
  // Delete Task
  if (e.target.className == "delete") {
    // Remove Current Task
    localStorage.removeItem(e.target.parentNode.firstChild.textContent);
    e.target.parentNode.remove();

    // Check Number Of Tasks Inside The Container
    if (!localStorage.length) {
      createNoTasks();
      theInput.focus();
    }
  }

  // Finish Task
  if (e.target.classList.contains("task-box")) {
    // Toggle Class 'finished'
    e.target.classList.toggle("finished");
    localStorage.getItem(e.target.firstChild.textContent) === "finished"
      ? localStorage.setItem(e.target.firstChild.textContent, "not finish")
      : localStorage.setItem(e.target.firstChild.textContent, "finished");
  }

  // Calculate Tasks
  calculateTasks();
});

// Function To Add Tasks To Page
function addToPage(taskName, finishing) {
  // Create Main Span Element
  let mainSpan = document.createElement("span");

  // Create Delete Button
  let deleteElement = document.createElement("span");

  // Create The Main Span Text
  let text = document.createTextNode(taskName);

  // Create The Delete Button Text
  let deleteText = document.createTextNode("Delete");

  // Add Text To Main Span
  mainSpan.appendChild(text);

  // Add Class To Main Span
  mainSpan.className = "task-box";

  // check if task is finished
  if (finishing === "finished") {
    mainSpan.classList.add(finishing);
  }

  // Add Text To Delete Button
  deleteElement.appendChild(deleteText);

  // Add Class To Delete Button
  deleteElement.className = "delete";

  // Add Delete Button To Main Span
  mainSpan.appendChild(deleteElement);

  // Add The Task To The Container
  tasksContainer.appendChild(mainSpan);

  // Empty The Input
  theInput.value = "";

  // Focus On Field
  theInput.focus();

  // Calculate Tasks
  calculateTasks();
}

// Function To Create No Tasks Message
function createNoTasks() {
  // Create Message Span Element
  let msgSpan = document.createElement("span");

  // Create The Text Message
  let msgText = document.createTextNode("No Tasks To Show");

  // Add Text To Message Span Element
  msgSpan.appendChild(msgText);

  // Add Class To Message Span
  msgSpan.className = "no-tasks-message";

  // Append The Message Span Element To The Task Container
  tasksContainer.appendChild(msgSpan);
}

// Function To Calculate Tasks
function calculateTasks() {
  // Calculate All Tasks
  tasksCount.innerHTML = localStorage.length;

  // Calculate Completed Tasks
  let taskFinished = 0;
  for (let value of Object.values(localStorage)) {
    if (value === "finished") {
      taskFinished++;
    }
  }
  tasksCompleted.innerHTML = taskFinished;
}

function addToLocalStorage(taskName, finish) {
  localStorage.setItem(taskName, finish);
}

// localStorage.clear();
