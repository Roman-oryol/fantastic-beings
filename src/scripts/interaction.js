import { getCoords, swapBeings } from './swap.js';
import { mapState, updateMapStateAfterSwap } from './state.js';
import { checkMatches, matchesToCoords, clearMatches } from './match.js';
import { redrawMap } from './map.js';
import { creatures } from './config.js';

import {
  selectedCell,
  setSelectedCell,
  clearSelectedCell,
} from './selection.js';

function initGame(rows, cols) {
  const mapEl = document.getElementById('map');
  const matches = matchesToCoords(checkMatches());

  clearMatches(matches);
  redrawMap(mapState, creatures);

  mapEl.addEventListener('click', (e) => {
    const target = e.target.closest('.cell');
    if (!target) return;

    const [x, y] = getCoords(target);

    if (!selectedCell) {
      setSelectedCell(target, x, y, rows, cols);
      return;
    }

    if (target === selectedCell.element) return;

    const isNeighbor = selectedCell.neighbors.some(
      ([nx, ny]) => nx === x && ny === y
    );

    if (isNeighbor) {
      swapBeings(selectedCell.element, target, creatures);
      updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);

      const matches = matchesToCoords(checkMatches());
      if (matches.length > 0) {
        setTimeout(() => {
          clearMatches(matches);
          redrawMap(mapState, creatures);
          clearSelectedCell();
        }, 300);
      } else {
        setTimeout(() => {
          swapBeings(selectedCell.element, target, creatures);
          updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);
          clearSelectedCell();
        }, 200);
      }
    } else {
      setSelectedCell(target, x, y, rows, cols);
    }
  });
}

export { initGame };
