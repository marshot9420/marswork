import { getCurrentDate } from "./features/clock.js";
import { handleLoginEvent } from "./features/login.js";
import { getQuote } from "./features/quotes.js";
import { controlMenuPanel } from "./layouts/panel.js";

controlMenuPanel();
getCurrentDate();
handleLoginEvent();
getQuote();
