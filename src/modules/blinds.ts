//I got huge help by GPT with almost all functions here

import { setRoundSeconds } from "./timer";

export function createBlindRounds() {
  const container = document.getElementById("rounds-container");
  if (!container) return;

  container.innerHTML = "";

  for (let i = 1; i <= 15; i++) {
    createStandardRound(i);

    if (i === 6 || i === 12) {
      createPauseRound();
    }
  }

  updateRoundCountDisplay();
}

export function createStandardRound(i: number) {
  const container = document.getElementById("rounds-container");
  if (!container) return;

  const row = document.createElement("div");
  row.className = "round-row mb-4";

  const smallBlindValue = i * 100;
  const bigBlindValue = smallBlindValue * 2;
  const defaultTime = 10;

  row.innerHTML = `
    <div class="round-column">
      <label class="form-label">Round ${i} – Small Blind</label>
      <div class="input-group">
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('small${i}', -100)">-100</button>
        <input type="number" class="form-control text-center" id="small${i}" step="100" min="0" value="${smallBlindValue}" />
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('small${i}', 100)">+100</button>
      </div>
    </div>
    <div class="round-column">
      <label class="form-label">Big Blind</label>
      <div class="input-group">
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('big${i}', -100)">-100</button>
        <input type="number" class="form-control text-center" id="big${i}" step="100" min="0" value="${bigBlindValue}" />
        <button class="btn btn-outline-light" type="button" onclick="adjustBlind('big${i}', 100)">+100</button>
      </div>
    </div>
    <div class="round-column">
      <label class="form-label">Time (minutes)</label>
      <div class="input-group">
        <input type="number" class="form-control text-center" id="time${i}" min="1" value="${defaultTime}" />
        <button type="button" class="btn btn-outline-danger ms-2" onclick="this.closest('.round-row')?.remove(); reindexRounds(); updateRoundCountDisplay();">
          🗑️
        </button>
      </div>
    </div>
  `;

  container.appendChild(row);
}

export function createPauseRound() {
  const container = document.getElementById("rounds-container");
  if (!container) return;

  const pauseRow = document.createElement("div");
  pauseRow.className = "round-row mb-4";
  pauseRow.setAttribute("data-pause", "true");

  const pauseId = `pause${Date.now()}`;

  pauseRow.innerHTML = `
    <div class="round-column">
      <label class="form-label">Pause</label>
    </div>
    <div class="round-column"></div>
    <div class="round-column">
      <label class="form-label">Čas (minuty)</label>
      <div class="input-group">
        <input type="number" class="form-control text-center" id="${pauseId}" min="1" value="10" />
        <button type="button" class="btn btn-outline-danger ms-2" onclick="this.closest('.round-row')?.remove(); reindexRounds(); updateRoundCountDisplay();">
          🗑️
        </button>
      </div>
    </div>
  `;

  container.appendChild(pauseRow);
}

export function addNewRound() {
  const rounds = document.querySelectorAll("#rounds-container .round-row").length;
  createStandardRound(rounds + 1);
  reindexRounds();
  updateRoundCountDisplay();
}

export function addNewPause() {
  createPauseRound();
  reindexRounds();
  updateRoundCountDisplay();
}

export function applyGlobalTime() {
  const globalInput = document.getElementById("globalTimeInput") as HTMLInputElement | null;
  if (!globalInput) return;

  const minutes = Number(globalInput.value);

  const inputs = document.querySelectorAll("#rounds-container input[id^=time]");
  inputs.forEach((input) => {
    (input as HTMLInputElement).value = minutes.toString();
  });
}

export function reindexRounds() {
  const rows = document.querySelectorAll("#rounds-container .round-row");
  let roundNumber = 1;

  rows.forEach(row => {
    const isPause = row.hasAttribute("data-pause");

    if (!isPause) {
      const label = row.querySelector(".round-column label");
      if (label) {
        label.textContent = `Round ${roundNumber} – Small Blind`;
        roundNumber++;
      }
    }
  });
  updateRoundCountDisplay();
}

export function setRound(index: number) {
  const rounds = document.querySelectorAll("#rounds-container .round-row");
  const round = rounds[index];
  if (!round) return;

  const isPause = round.hasAttribute("data-pause");
  const blindsCombined = document.getElementById("blinds-combined");
  const anteDisplay = document.getElementById("ante");

  let seconds = 600;

  if (isPause) {
    if (blindsCombined) blindsCombined.textContent = "Pause";
    if (anteDisplay) anteDisplay.textContent = "";

    const pauseInput = round.querySelector("input[type=number]") as HTMLInputElement;
    seconds = (Number(pauseInput?.value) || 10) * 60;
  } else {
    const smallBlind = round.querySelector("input[id^='small']") as HTMLInputElement;
    const bigBlind = round.querySelector("input[id^='big']") as HTMLInputElement;
    const timeInput = round.querySelector("input[id^='time']") as HTMLInputElement;

    if (smallBlind && bigBlind && blindsCombined) {
      blindsCombined.textContent = `${smallBlind.value} / ${bigBlind.value}`;
    }
    if (anteDisplay && bigBlind) {
      anteDisplay.textContent = `Ante: ${bigBlind.value}`;
    }

    seconds = (Number(timeInput?.value) || 10) * 60;
  }

  setRoundSeconds(seconds);
}

export function updateRoundCountDisplay() {
  const display = document.getElementById("roundCountDisplay");
  if (!display) return;

  const allRounds = document.querySelectorAll("#rounds-container .round-row");
  let count = 0;

  allRounds.forEach(row => {
    if (!row.hasAttribute("data-pause")) count++;
  });

  display.textContent = `Total rounds created: ${count}`;
}
