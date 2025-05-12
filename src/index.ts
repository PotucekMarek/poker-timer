import { toggleTimer } from "./modules/timer";
import { createBlindRounds, addNewRound, addNewPause, applyGlobalTime, reindexRounds } from "./modules/blinds";
import { openForm, saveBlinds } from "./modules/modal";
import { initLoader } from "./modules/loader";

initLoader();

window.addEventListener("DOMContentLoaded", () => {
  createBlindRounds();

  const openFormBtn = document.getElementById("openForm");
  const saveBlindsBtn = document.getElementById("saveBlinds");
  const applyGlobalTimeBtn = document.getElementById("applyGlobalTimeBtn");
  const playPauseToggle = document.getElementById("playPauseToggle");
  const addRoundBtn = document.getElementById("addRoundBtn");
  const addPauseBtn = document.getElementById("addPauseBtn");
  const blindForm = document.getElementById("blindForm");
  const bottomControls = document.getElementById("bottom-controls");

  openFormBtn?.addEventListener("click", openForm);
  saveBlindsBtn?.addEventListener("click", saveBlinds);
  applyGlobalTimeBtn?.addEventListener("click", applyGlobalTime);
  playPauseToggle?.addEventListener("click", toggleTimer);
  addRoundBtn?.addEventListener("click", addNewRound);
  addPauseBtn?.addEventListener("click", addNewPause);

  if (blindForm && bottomControls) {
    blindForm.addEventListener("show.bs.modal", () => {
      bottomControls.classList.remove("d-none");
    });

    blindForm.addEventListener("hide.bs.modal", () => {
      bottomControls.classList.add("d-none");
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.code === "Space") {
      e.preventDefault();
      toggleTimer();
    }
  });

  const clockElement = document.getElementById("clock");
  if (clockElement) clockElement.textContent = "10:00";
});
  // === Helper for round deleting ===  GPT
  (window as any).adjustBlind = (inputId: string, change: number) => {
    const input = document.getElementById(inputId) as HTMLInputElement | null;
    if (input) {
      const current = Number(input.value) || 0;
      input.value = Math.max(0, current + change).toString();
    }
  };

  (window as any).reindexRounds = reindexRounds;
;
