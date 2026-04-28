const currentDate = document.querySelector(".clock__date");
const currentTime = document.querySelector(".clock__time");

let days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export function handleCurrentDate() {
  const today = new Date();

  const year = String(today.getFullYear());
  const months = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const dayOfTheWeek = days[today.getDay()];

  const hours = String(today.getHours()).padStart(2, "0");
  const minutes = String(today.getMinutes()).padStart(2, "0");
  const seconds = String(today.getSeconds()).padStart(2, "0");

  currentDate.innerText = `${year}.${months}.${day} ${dayOfTheWeek}`;
  currentTime.innerText = `${hours}:${minutes}:${seconds}`;
}

export function getCurrentDate() {
  setInterval(handleCurrentDate, 1000);
}
