// import { getCoords, swapBeings } from './swap.js';
// import {
//   mapState,
//   updateMapStateAfterMatch,
//   updateMapStateAfterSwap,
//   incrementMoves,
//   addScore,
//   collectBeing,
//   isGameOver,
//   isWin,
//   isLose,
//   updateGameMessage,
// } from './state.js';
// import { checkMatches, matchesToCoords, clearMatches } from './match.js';
// import { redrawMap } from './map.js';
// import { creatures, clickSound, matchSound } from './config.js';

// import {
//   selectedCell,
//   setSelectedCell,
//   clearSelectedCell,
// } from './selection.js';

// const POINTS_PER_BEING = 10;

// let isProcessing = false;

// function delay(ms) {
//   return new Promise((res) => setTimeout(res, ms));
// }

// async function resolveAllMatches() {
//   let matches = matchesToCoords(checkMatches());

//   while (matches.length > 0) {
//     redrawMap(mapState, creatures);
//     await delay(500);

//     const collected = clearMatches(matches);
//     const points = Object.values(collected).reduce(
//       (sum, count) => sum + count * POINTS_PER_BEING,
//       0,
//     );
//     addScore(points);
//     Object.entries(collected).forEach(([being, count]) => {
//       for (let i = 0; i < count; i++) {
//         collectBeing(being);
//       }
//     });

//     redrawMap(mapState, creatures);
//     await delay(500);

//     updateMapStateAfterMatch();
//     redrawMap(mapState, creatures);

//     await delay(200);
//     matches = matchesToCoords(checkMatches());
//   }
// }

// function initGame(rows, cols) {
//   const mapEl = document.getElementById('map');

//   resolveAllMatches();

//   mapEl.addEventListener('click', async (e) => {
//     if (isProcessing || isGameOver()) return;

//     const target = e.target.closest('.cell');
//     if (!target) return;

//     const [x, y] = getCoords(target);

//     if (!selectedCell) {
//       setSelectedCell(target, x, y, rows, cols);
//       clickSound.play();
//       return;
//     }

//     if (target === selectedCell.element) return;

//     const isNeighbor = selectedCell.neighbors.some(
//       ([nx, ny]) => nx === x && ny === y,
//     );

//     if (!isNeighbor) {
//       setSelectedCell(target, x, y, rows, cols);
//       return;
//     }

//     clickSound.play();
//     isProcessing = true;

//     swapBeings(selectedCell.element, target, creatures);
//     updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);

//     let matches = matchesToCoords(checkMatches());
//     if (matches.length > 0) {
//       incrementMoves();
//       matchSound.play();
//       await delay(200);
//       await resolveAllMatches();
//       if (isWin()) {
//         updateGameMessage(
//           'Вы выиграли! Перезагрузите страницу, чтобы начать игру снова.',
//         );
//       } else if (isLose()) {
//         updateGameMessage(
//           'Вы проиграли! Перезагрузите страницу, чтобы начать игру снова.',
//         );
//       }
//       clearSelectedCell();
//     } else {
//       await delay(200);
//       swapBeings(selectedCell.element, target, creatures);
//       updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);
//       clearSelectedCell();
//     }

//     isProcessing = false;
//   });
// }

// export { initGame };

import { getCoords, swapBeings } from './swap.js';
import {
  mapState,
  updateMapStateAfterMatch,
  updateMapStateAfterSwap,
  incrementMoves,
  addScore,
  collectBeing,
  isGameOver,
  isWin,
  isLose,
  updateGameMessage,
} from './state.js';
import {
  checkMatches,
  matchesToCoords,
  clearMatches,
  playExplosionAnimation,
} from './match.js';
import { redrawMap } from './map.js';
import { creatures, clickSound, matchSound } from './config.js';

import {
  selectedCell,
  setSelectedCell,
  clearSelectedCell,
} from './selection.js';

const POINTS_PER_BEING = 10;

let isProcessing = false;

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms));
}

async function resolveAllMatches() {
  let matches = matchesToCoords(checkMatches());

  while (matches.length > 0) {
    await playExplosionAnimation(matches);

    const collected = clearMatches(matches);
    const points = Object.values(collected).reduce(
      (sum, count) => sum + count * POINTS_PER_BEING,
      0,
    );
    addScore(points);
    Object.entries(collected).forEach(([being, count]) => {
      for (let i = 0; i < count; i++) {
        collectBeing(being);
      }
    });

    redrawMap(mapState, creatures);
    await delay(300);

    updateMapStateAfterMatch();
    redrawMap(mapState, creatures);

    await delay(200);
    matches = matchesToCoords(checkMatches());
  }
}

function initGame(rows, cols) {
  const mapEl = document.getElementById('map');

  resolveAllMatches();

  mapEl.addEventListener('click', async (e) => {
    if (isProcessing || isGameOver()) return;

    const target = e.target.closest('.cell');
    if (!target) return;

    const [x, y] = getCoords(target);

    if (!selectedCell) {
      setSelectedCell(target, x, y, rows, cols);
      clickSound.play();
      return;
    }

    if (target === selectedCell.element) return;

    const isNeighbor = selectedCell.neighbors.some(
      ([nx, ny]) => nx === x && ny === y,
    );

    if (!isNeighbor) {
      setSelectedCell(target, x, y, rows, cols);
      return;
    }

    clickSound.play();
    isProcessing = true;

    swapBeings(selectedCell.element, target, creatures);
    updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);

    let matches = matchesToCoords(checkMatches());
    if (matches.length > 0) {
      incrementMoves();
      matchSound.play();
      await delay(200);
      await resolveAllMatches();
      if (isWin()) {
        updateGameMessage(
          'Вы выиграли! Перезагрузите страницу, чтобы начать игру снова.',
        );
      } else if (isLose()) {
        updateGameMessage(
          'Вы проиграли! Перезагрузите страницу, чтобы начать игру снова.',
        );
      }
      clearSelectedCell();
    } else {
      await delay(200);
      swapBeings(selectedCell.element, target, creatures);
      updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);
      clearSelectedCell();
    }

    isProcessing = false;
  });
}

export { initGame };
