const loginForm = document.querySelector("#login");
const loginInput = document.querySelector("#login input");

const greeting = document.querySelector(".greeting");
const greetingMessage = document.querySelector(".greeting__message");
const greetingName = document.querySelector(".greeting__name");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

const savedUsername = localStorage.getItem(USERNAME_KEY);

function getGreeting(username) {
  const today = new Date();
  const hours = today.getHours();

  greetingName.innerText = `${username}님`;

  if (hours >= 12 && hours < 17) {
    greetingMessage.innerText = "좋은 오후입니다";
  } else if (hours >= 17 && hours < 22) {
    greetingMessage.innerText = "좋은 저녁입니다";
  } else if (hours >= 22 || hours < 6) {
    greetingMessage.innerText = "좋은 밤입니다";
  } else {
    greetingMessage.innerText = "좋은 아침입니다";
  }

  greeting.classList.remove(HIDDEN_CLASSNAME);
}

function handleSubmitLoginEvent(event) {
  event.preventDefault();
  loginForm.classList.add(HIDDEN_CLASSNAME);
  const username = loginInput.value;

  localStorage.setItem(USERNAME_KEY, username);

  getGreeting(username);
}

export function handleLoginEvent() {
  if (savedUsername === null) {
    loginForm.classList.remove(HIDDEN_CLASSNAME);
    loginForm.addEventListener("submit", handleSubmitLoginEvent);
  } else {
    getGreeting(savedUsername);
  }
}
