const date = document.getElementById("date");
const selectMenu = document.querySelectorAll("select");
const stopAlarm = document.getElementById("stop-alarm");
const alarmList = document.getElementById("AlarmList");
const audio = new Audio("./Audio/alarm.mp3");
let counter = 0;
const arr = [];

// function to displayTime
function displayTime() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    hours = hours === 12 ? 12 : hours - 12;
  } else {
    hours = hours === 0 ? 12 : hours;
  }

  date.innerHTML = `${hours < 10 ? "0" : ""}${hours}:${
    minutes < 10 ? "0" : ""
  }${minutes}:${seconds < 10 ? "0" : ""}${seconds} ${period}`;

  arr.forEach((element) => {
    if (element == date.textContent) {
      alert("ring ...");
      stopAlarm.style.visibility = "visible";
      audio.loop = true;
      audio.play();
    }
  });
}

// function to update displayTime function each second
function updateTime() {
  displayTime();
  window.setInterval("displayTime()", 1000);
}

// invoking function updateTime
updateTime();

// set Alarm Section
// loop for giving option values so that user will able to select hour
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option  value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

// loop for giving option different values so that user will able to select minutes
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

// loop for giving option different values so that user will able to select seconds
for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

// loop for AM/PM period
for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[3].firstElementChild.insertAdjacentHTML("afterend", option);
}

// Event Listener for setAlarm when we click on set alarm button then this will inovke
document.querySelector(".alarm-button").addEventListener("click", setAlarm);

// setAlarm function for setting Alarms
function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:${selectMenu[2].value} ${selectMenu[3].value}`;
  if (
    time.includes("setHour") ||
    time.includes("setMinute") ||
    time.includes("setSecond") ||
    time.includes("setPeriod")
  ) {
    alert("Please select a valid time");
  } else {
    document.querySelector("#AlarmList").innerHTML += `
    <div class="alarm-set" id="alarm${counter}">
      <span id="span${counter}">${time}</span>
      <button id="${counter}" class="btn-delete" onClick="deleteAlarm(this.id)">Delete</button>
    </div>`;
    alert(`your alarm is set at ${time}`);
    console.log(arr);
    counter++;
    arr.push(time);
    saveData();
  }
}

// function for deleting alarms
function deleteAlarm(id) {
  const confirmDelete = confirm();
  if (confirmDelete) {
    let element = document.getElementById(`alarm${id}`);
    let deleteIndex = arr.indexOf(
      document.getElementById(`span${id}`).textContent
    );
    arr.splice(deleteIndex, 1);
    element.remove();
    saveData();
  }
}

// Event Listener for alarm button
stopAlarm.addEventListener("click", () => {
  const confirmStop = confirm();
  if (confirmStop){
    audio.pause();
    stopAlarm.style.visibility = "hidden";
  }
});

// This function save our data in localStorage
function saveData() {
  localStorage.setItem("data", alarmList.innerHTML);
}

// This function will fetch data from local storage and insert in alarmList.innerHTML
function showData() {
  alarmList.innerHTML = localStorage.getItem("data");
}
showData();
