export let timerInterval: number | undefined;
export let currentRound = 0;
export let roundSecondsLeft = 600; // 10 minut
export let totalRoundSeconds = 600;
export let isTimerRunning = false;

export function formatTime(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${String(minutes).padStart(2, "0")}:${String(remainingSeconds).padStart(2, "0")}`;
}

export function updateProgressBar() {
  const progressBar = document.getElementById("progressBar") as HTMLDivElement | null;
  if (!progressBar || totalRoundSeconds <= 0) return;

  const percent = Math.max(0, (roundSecondsLeft / totalRoundSeconds) * 100);
  progressBar.style.width = `${percent}%`;

  progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");

  if (percent > 66) {
    progressBar.classList.add("bg-success");
  } else if (percent > 33) {
    progressBar.classList.add("bg-warning");
  } else {
    progressBar.classList.add("bg-danger");
  }
}

export function startTimer() {
  const clock = document.getElementById("clock");
  const playPauseBtn = document.getElementById("playPauseToggle");

  isTimerRunning = true;

  playPauseBtn?.classList.replace("bi-play-circle-fill", "bi-pause-circle-fill");
  playPauseBtn?.setAttribute("title", "Pozastavit (mezerník)");

  timerInterval = window.setInterval(() => {
    if (roundSecondsLeft <= 0) {
      advanceToNextRound();
      return;
    }
    roundSecondsLeft--;
    if (clock) clock.textContent = formatTime(roundSecondsLeft);

    updateProgressBar();
  }, 1000);
}

export function stopTimer() {
  const playPauseBtn = document.getElementById("playPauseToggle");
  isTimerRunning = false;
  clearInterval(timerInterval);

  playPauseBtn?.classList.replace("bi-pause-circle-fill", "bi-play-circle-fill");
  playPauseBtn?.setAttribute("title", "Spustit (mezerník)");

  const progressBar = document.getElementById("progressBar") as HTMLDivElement | null;
  if (progressBar) {
    progressBar.classList.remove("bg-success", "bg-warning", "bg-danger");
    progressBar.classList.add("bg-primary");
  }
}

export function toggleTimer() {
  if (!isTimerRunning) {
    if (roundSecondsLeft <= 0) {
      setRound(currentRound);
    }
    startTimer();
  } else {
    stopTimer();
  }
}

export function advanceToNextRound() {
  const rounds = document.querySelectorAll("#rounds-container .round-row");
  
  if (currentRound >= rounds.length) {
    stopTimer();
    console.log("Konec kol.");
    return;
  }
  
  currentRound++;
  setRound(currentRound);
}

export function setRoundSeconds(seconds: number) {
  roundSecondsLeft = seconds;
  totalRoundSeconds = seconds;
}

import { setRound } from "./blinds";
