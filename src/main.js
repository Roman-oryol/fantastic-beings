import zouwu from './images/beings/zouwu.png';
import swooping from './images/beings/swooping.png';
import salamander from './images/beings/salamander.png';
import puffskein from './images/beings/puffskein.png';
import kelpie from './images/beings/kelpie.png';

import './style.css';

const creatures = [
  { name: 'zouwu', image: zouwu },
  { name: 'swooping', image: swooping },
  { name: 'salamander', image: salamander },
  { name: 'puffskein', image: puffskein },
  { name: 'kelpie', image: kelpie },
];

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

      renderBeingInCell(being, cell, cellIndex, rowIndex);
    });
  });

  return true;
};

window.renderMap(5, 5);
window.fillMapRandomly();
// window.redrawMap([
//   ['kelpie', 'puffskein', 'kelpie', 'puffskein'],
//   ['swooping', 'zouwu', 'puffskein', 'zouwu'],
//   ['kelpie', 'puffskein', 'zouwu', 'puffskein'],
//   ['kelpie', 'puffskein', 'zouwu', 'kelpie'],
// ]);
