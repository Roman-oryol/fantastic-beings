import zouwu from './images/beings/zouwu.png';
import swooping from './images/beings/swooping.png';
import salamander from './images/beings/salamander.png';
import puffskein from './images/beings/puffskein.png';
import kelpie from './images/beings/kelpie.png';

import './style.scss';

const creatures = [
  { name: 'zouwu', image: zouwu },
  { name: 'swooping', image: swooping },
  { name: 'salamander', image: salamander },
  { name: 'puffskein', image: puffskein },
  { name: 'kelpie', image: kelpie },
];

const mapState = [];
const rows = 5;
const cols = 5;
let selectedCell = null;

function getRandomBeing(creatures) {
  const randomIndex = Math.floor(Math.random() * creatures.length);

  return creatures[randomIndex];
}

function findBeing(creatures, name) {
  return creatures.find((obj) => obj.name === name);
}

function renderBeingInCell(beingObj, cellEl, cellIndex, rowIndex) {
  const { name, image } = beingObj;
  const img = document.createElement('img');

  cellEl.setAttribute('data-being', name);
  img.src = image;
  img.setAttribute('data-coords', `x${cellIndex}_y${rowIndex}`);
  cellEl.appendChild(img);
}

window.fillMapRandomly = function () {
  const rows = document.querySelectorAll('.row');

  rows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('.cell');

    cells.forEach((cell, cellIndex) => {
      if (cell.querySelector('img')) {
        return;
      }

      renderBeingInCell(getRandomBeing(creatures), cell, cellIndex, rowIndex);
    });
  });
};

window.renderMap = function (rowsCount, colsCount) {
  const mapElement = document.getElementById('map');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < rowsCount; i++) {
    const row = document.createElement('tr');
    row.classList.add('row');

    for (let j = 0; j < colsCount; j++) {
      const cell = document.createElement('td');
      cell.classList.add('cell');

      row.appendChild(cell);
    }

    fragment.appendChild(row);
  }

  mapElement.appendChild(fragment);
};

window.clearMap = function () {
  const mapElement = document.getElementById('map');
  mapElement.innerHTML = '';
};

window.redrawMap = function (mapData) {
  const rows = mapData.length;
  const cols = mapData[0].length;
  const isEqualRows = mapData.every((row) => row.length === cols);

  if (rows < 3 || cols < 3 || !isEqualRows) {
    return false;
  }

  window.clearMap();
  window.renderMap(rows, cols);

  const tableRows = document.querySelectorAll('.row');

  tableRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('.cell');

    cells.forEach((cell, cellIndex) => {
      const beingName = mapData[rowIndex][cellIndex];
      const being = findBeing(creatures, beingName);

      if (!being) {
        return;
      }
      renderBeingInCell(being, cell, cellIndex, rowIndex);
    });
  });

  return true;
};

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

function checkMatches() {
  const matches = [];

  for (let y = 0; y < rows; y++) {
    let start = 0;

    for (let x = 1; x <= cols; x++) {
      const isSame = x < cols && mapState[y][x] === mapState[y][start];

      if (!isSame) {
        const length = x - start;

        if (mapState[y][start] !== '' && length >= 3) {
          matches.push({ type: 'row', y, from: start, to: x - 1 });
        }
        start = x;
      }
    }
  }

  for (let x = 0; x < cols; x++) {
    let start = 0;

    for (let y = 1; y <= rows; y++) {
      const same = y < rows && mapState[y][x] === mapState[start][x];

      if (!same) {
        const length = y - start;

        if (mapState[start][x] !== '' && length >= 3) {
          matches.push({ type: 'col', x, from: start, to: y - 1 });
        }
        start = y;
      }
    }
  }

  return matches;
}

function matchesToCoords(matches) {
  const coords = [];

  for (const m of matches) {
    if (m.type === 'row') {
      for (let x = m.from; x <= m.to; x++) {
        coords.push([x, m.y]);
      }
    } else {
      for (let y = m.from; y <= m.to; y++) {
        coords.push([m.x, y]);
      }
    }
  }

  return coords;
}

function clearMatches(coords) {
  coords.forEach(([x, y]) => {
    mapState[y][x] = '';
  });
}

function getNeighbors(cx, cy, rowsCount, colsCount) {
  const neighbors = [
    [cx - 1, cy],
    [cx + 1, cy],
    [cx, cy - 1],
    [cx, cy + 1],
  ];

  return neighbors.filter(
    ([nx, ny]) => nx >= 0 && (ny >= 0) & (nx < colsCount) && ny < rowsCount
  );
}

function setSelectedCell(cell, x, y) {
  if (selectedCell) {
    selectedCell.element.classList.remove('selected');
  }

  selectedCell = {
    x,
    y,
    element: cell,
    neighbors: getNeighbors(x, y, rows, cols),
  };
  selectedCell.element.classList.add('selected');
}

function clearSelectedCell() {
  if (selectedCell) {
    selectedCell.element.classList.remove('selected');
  }
  selectedCell = null;
}

function swapBeings(cellA, cellB) {
  const aName = cellA.dataset.being;
  const bName = cellB.dataset.being;

  cellA.dataset.being = bName;
  cellB.dataset.being = aName;

  const aBeing = findBeing(creatures, aName);
  const bBeing = findBeing(creatures, bName);

  cellA.querySelector('img').src = bBeing.image;
  cellB.querySelector('img').src = aBeing.image;
}

function getCoords(cell) {
  const img = cell.querySelector('img');
  const coords = img.dataset.coords;
  const x = Number(coords.match(/(?<=x)\d+/)[0]);
  const y = Number(coords.match(/(?<=y)\d+/)[0]);

  return [x, y];
}

function updateMapStateAfterSwap(x1, y1, x2, y2) {
  const being1 = mapState[y1][x1];
  const being2 = mapState[y2][x2];
  mapState[y1][x1] = being2;
  mapState[y2][x2] = being1;
}

function handleCellClick(e) {
  const target = e.target.closest('.cell');

  if (!target) return;

  const [x, y] = getCoords(target);

  // Нет выделенной ячейки, сохраняем нажатую
  if (!selectedCell) {
    setSelectedCell(target, x, y);
    return;
  }

  // если ячейка выделенна и повторно нажата ничего не делаем
  if (target === selectedCell.element) {
    return;
  }

  // если первая ячейка выделенна и нажата следующая,
  // то проверяем является ли она соседней выделенной
  const isNeighbor = selectedCell.neighbors.some(
    ([nx, ny]) => nx === x && ny === y
  );

  //если следующая нажатая ячейка соседняя, то меняем местами
  if (isNeighbor) {
    swapBeings(selectedCell.element, target);
    updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);
    console.log('mapState -', mapState);
    const matches = matchesToCoords(checkMatches());
    console.log('matches - ', matches);

    if (matches.length > 0) {
      setTimeout(() => {
        clearMatches(matches);
        window.redrawMap(mapState);
        clearSelectedCell();
      }, 300);
    }

    if (matches.length === 0) {
      setTimeout(() => {
        swapBeings(selectedCell.element, target);
        updateMapStateAfterSwap(x, y, selectedCell.x, selectedCell.y);
        clearSelectedCell();
      }, 200);
    }
  } else {
    setSelectedCell(target, x, y);
  }
}

window.renderMap(rows, cols);
window.fillMapRandomly();
fillMapState();
console.log(mapState);

document.getElementById('map').addEventListener('click', handleCellClick);
// window.redrawMap([
//   ['kelpie', '', '', 'puffskein'],
//   ['swooping', 'zouwu', 'puffskein', 'zouwu'],
//   ['kelpie', 'puffskein', 'zouwu', 'puffskein'],
//   ['kelpie', 'puffskein', 'zouwu', 'kelpie'],
// ]);
