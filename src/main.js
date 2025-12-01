import './style.css';

window.renderMap = function (rowsCount, colsCount) {
  const mapElement = document.getElementById('map');

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < rowsCount; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < colsCount; j++) {
      const cell = document.createElement('td');
      cell.classList.add('cell');
      cell.setAttribute('role', 'gridcell');

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

window.renderMap(5, 5);
