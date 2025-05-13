import { setRound } from "./blinds";
import { setRoundSeconds } from "./timer";

declare const bootstrap: any;

export function openForm() {
  const modalElement = document.getElementById("blindForm");
  if (modalElement) new bootstrap.Modal(modalElement).show();
}

export function saveBlinds() {
  const roundElements = document.querySelectorAll("#rounds-container .round-row");
  if (roundElements.length === 0) return;

  // GPT
  setRound(0);

  const firstRound = roundElements[0];
  if (!firstRound) return;

  const blindsCombined = document.getElementById("blinds-combined");
  const anteDisplay = document.getElementById("ante");
  const clockElement = document.getElementById("clock");

  let seconds = 600;

  if (firstRound.hasAttribute("data-pause")) {
    if (blindsCombined) blindsCombined.textContent = "Pause";
    if (anteDisplay) anteDisplay.textContent = "";

    const pauseInput = firstRound.querySelector("input[type=number]") as HTMLInputElement;
    seconds = (Number(pauseInput?.value) || 10) * 60;
  } 
  else {
    const smallBlind = firstRound.querySelector("input[id^='small']") as HTMLInputElement;
    const bigBlind = firstRound.querySelector("input[id^='big']") as HTMLInputElement;
    const timeInput = firstRound.querySelector("input[id^='time']") as HTMLInputElement;

    if (smallBlind && bigBlind && blindsCombined) {
      blindsCombined.textContent = `${smallBlind.value} / ${bigBlind.value}`;
    }
    if (anteDisplay && bigBlind) {
      anteDisplay.textContent = `Ante: ${bigBlind.value}`;
    }

    seconds = (Number(timeInput?.value) || 10) * 60;
  }

  setRoundSeconds(seconds);

  if (clockElement) {
    clockElement.textContent = formatTime(seconds);
  }

  showSaveMessage();

  const modal = document.getElementById("blindForm");
  if (modal) bootstrap.Modal.getInstance(modal)?.hide(); // GPT
}

// GPT
function showSaveMessage() {
  const message = document.getElementById("saveMessage");
  if (!message) return;
  message.classList.remove("d-none");
  message.style.opacity = "1";
  setTimeout(() => {
    message.style.opacity = "0";
    setTimeout(() => message.classList.add("d-none"), 300);
  }, 3000);
}

function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`; // GPT
}
