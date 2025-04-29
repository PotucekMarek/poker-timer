import { setRound } from "./blinds";

declare const bootstrap: any;

export function openForm() {
  const modalElement = document.getElementById("blindForm");
  if (modalElement) new bootstrap.Modal(modalElement).show();
}

export function saveBlinds() {
  const roundElements = document.querySelectorAll("#rounds-container .round-row");
  if (roundElements.length === 0) return;

  setRound(0);

  showSaveMessage();

  const modalElement = document.getElementById("blindForm");
  if (modalElement) bootstrap.Modal.getInstance(modalElement)?.hide();
}

function showSaveMessage() {  // GPT
  const message = document.getElementById("saveMessage");
  if (!message) return;
  message.classList.remove("d-none");
  message.style.opacity = "1";
  setTimeout(() => {
    message.style.opacity = "0";
    setTimeout(() => message.classList.add("d-none"), 300);
  }, 3000);
}
