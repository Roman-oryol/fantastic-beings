import { creatures } from './config.js';

function renderMap(rowsCount, colsCount) {
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
}

function clearMap() {
  document.getElementById('map').innerHTML = '';
}

function fillMapRandomly() {
  const rowsEls = document.querySelectorAll('.row');
  rowsEls.forEach((row, rowIndex) => {
    row.querySelectorAll('.cell').forEach((cell, cellIndex) => {
      if (!cell.querySelector('img'))
        renderBeingInCell(
          creatures[Math.floor(Math.random() * creatures.length)],
          cell,
          cellIndex,
          rowIndex
        );
    });
  });
}

function renderBeingInCell(beingObj, cellEl, cellIndex, rowIndex) {
  const { name, image } = beingObj;
  const img = document.createElement('img');

  cellEl.setAttribute('data-being', name);
  img.src = image;
  img.setAttribute('data-coords', `x${cellIndex}_y${rowIndex}`);
  cellEl.appendChild(img);
}

function redrawMap(mapData, creatures) {
  const rowsCount = mapData.length;
  const colsCount = mapData[0].length;

  clearMap();
  renderMap(rowsCount, colsCount);

  const tableRows = document.querySelectorAll('.row');
  tableRows.forEach((row, rowIndex) => {
    const cells = row.querySelectorAll('.cell');

    cells.forEach((cell, cellIndex) => {
      const beingName = mapData[rowIndex][cellIndex];
      const being = creatures.find((b) => b.name === beingName);
      if (being) renderBeingInCell(being, cell, cellIndex, rowIndex);
    });
  });
}

export { renderMap, clearMap, fillMapRandomly, renderBeingInCell, redrawMap };
