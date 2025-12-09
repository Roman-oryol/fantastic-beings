export let selectedCell = null;

function getNeighbors(cx, cy, rowsCount, colsCount) {
  return [
    [cx - 1, cy],
    [cx + 1, cy],
    [cx, cy - 1],
    [cx, cy + 1],
  ].filter(
    ([nx, ny]) => nx >= 0 && ny >= 0 && nx < colsCount && ny < rowsCount
  );
}

function setSelectedCell(cell, x, y, rowsCount, colsCount) {
  if (selectedCell) selectedCell.element.classList.remove('selected');
  selectedCell = {
    element: cell,
    x,
    y,
    neighbors: getNeighbors(x, y, rowsCount, colsCount),
  };
  cell.classList.add('selected');
}

function clearSelectedCell() {
  if (selectedCell) selectedCell.element.classList.remove('selected');
  selectedCell = null;
}

export { getNeighbors, setSelectedCell, clearSelectedCell };
