const calendarMonth = document.querySelector(".calendar__month");
const calendarYear = document.querySelector(".calendar__year");
const calendarDays = document.querySelector(".calendar__days");
const calendarPrevButton = document.querySelector(
  '.calendar__nav[aria-label="Previous month"]',
);
const calendarNextButton = document.querySelector(
  '.calendar__nav[aria-label="Next month"]',
);

let currentDate = new Date();

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function createDayButton(day, className = "") {
  const button = document.createElement("button");

  button.className = `calendar__day ${className}`.trim();
  button.type = "button";
  button.textContent = day;

  return button;
}

function renderCalendar() {
  if (!calendarMonth || !calendarYear || !calendarDays) return;

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const today = new Date();
  const isCurrentMonth =
    today.getFullYear() === year && today.getMonth() === month;

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const lastDayOfPrevMonth = new Date(year, month, 0);

  const startDay = firstDayOfMonth.getDay();
  const totalDays = lastDayOfMonth.getDate();
  const totalPrevDays = lastDayOfPrevMonth.getDate();

  calendarMonth.textContent = MONTH_NAMES[month];
  calendarYear.textContent = year;
  calendarDays.innerHTML = "";

  for (let i = startDay - 1; i >= 0; i -= 1) {
    const day = totalPrevDays - i;
    calendarDays.appendChild(createDayButton(day, "calendar__day--muted"));
  }

  for (let day = 1; day <= totalDays; day += 1) {
    const isToday = isCurrentMonth && today.getDate() === day;
    const className = isToday ? "calendar__day--today" : "";

    calendarDays.appendChild(createDayButton(day, className));
  }

  const renderedDays = calendarDays.children.length;
  const remainingDays = 42 - renderedDays;

  for (let day = 1; day <= remainingDays; day += 1) {
    calendarDays.appendChild(createDayButton(day, "calendar__day--muted"));
  }
}

function moveMonth(amount) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  currentDate = new Date(year, month + amount, 1);
  renderCalendar();
}

export function initCalendar() {
  renderCalendar();

  calendarPrevButton?.addEventListener("click", () => {
    moveMonth(-1);
  });

  calendarNextButton?.addEventListener("click", () => {
    moveMonth(1);
  });
}
