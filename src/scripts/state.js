const mapState = [];

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

export { mapState, fillMapState, updateMapStateAfterSwap };
