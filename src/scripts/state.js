import { generateRandomBeingName, gameGoals, maxMoves } from './config';

const mapState = [];

let currentMoves = 0;
let currentScore = 0;
let remainingGoals = { ...gameGoals };

function fillMapState() {
  const tableRows = document.querySelectorAll('.row');
  tableRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('.cell');
    mapState[rowIndex] = [];
    cells.forEach((cell, cellIndex) => {
      mapState[rowIndex][cellIndex] = cell.dataset.being || '';
    });
  });
}

function updateMapStateAfterSwap(x1, y1, x2, y2) {
  const temp = mapState[y1][x1];
  mapState[y1][x1] = mapState[y2][x2];
  mapState[y2][x2] = temp;
}

function updateMapStateAfterMatch() {
  mapState.forEach((row) => {
    row.forEach((cell, index) => {
      if (cell === '') {
        row[index] = generateRandomBeingName();
      }
    });
  });
}

function incrementMoves() {
  currentMoves++;
  updateMovesDisplay();
}

function addScore(points) {
  currentScore += points;
  updateScoreDisplay();
}

function collectBeing(beingName) {
  if (remainingGoals[beingName] > 0) {
    remainingGoals[beingName]--;
    updateBeingCounter(beingName);
  }
}

function updateMovesDisplay() {
  const movesEl = document.getElementById('moves-value');
  if (movesEl) movesEl.textContent = maxMoves - currentMoves;
}

function updateScoreDisplay() {
  const scoreEl = document.getElementById('score-value');
  if (scoreEl) scoreEl.textContent = currentScore;
}

function updateBeingCounter(beingName) {
  const counterEl = document.querySelector(`.being-counter .${beingName}`);
  if (counterEl) counterEl.textContent = remainingGoals[beingName];
}

function updateGameMessage(message) {
  const messageEl = document.querySelector('#game-message p');
  if (messageEl) messageEl.textContent = message;
}

function initGameState() {
  updateMovesDisplay();
  updateScoreDisplay();
  Object.keys(remainingGoals).forEach(updateBeingCounter);
}

function isGameOver() {
  return (
    currentMoves >= maxMoves ||
    Object.values(remainingGoals).every((count) => count <= 0)
  );
}

function isWin() {
  return (
    Object.values(remainingGoals).every((count) => count <= 0) &&
    currentMoves <= maxMoves
  );
}

function isLose() {
  return (
    currentMoves >= maxMoves &&
    !Object.values(remainingGoals).every((count) => count <= 0)
  );
}

export {
  mapState,
  fillMapState,
  updateMapStateAfterSwap,
  updateMapStateAfterMatch,
  incrementMoves,
  addScore,
  collectBeing,
  initGameState,
  isGameOver,
  isWin,
  isLose,
  updateGameMessage,
  currentMoves,
  currentScore,
  remainingGoals,
};
