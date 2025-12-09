function getCoords(cell) {
  const [x, y] = cell
    .querySelector('img')
    .dataset.coords.match(/\d+/g)
    .map(Number);
  return [x, y];
}

function swapBeings(cellA, cellB, creatures) {
  const aName = cellA.dataset.being;
  const bName = cellB.dataset.being;

  cellA.dataset.being = bName;
  cellB.dataset.being = aName;

  const aBeing = creatures.find((b) => b.name === aName);
  const bBeing = creatures.find((b) => b.name === bName);

  cellA.querySelector('img').src = bBeing.image;
  cellB.querySelector('img').src = aBeing.image;
}

export { getCoords, swapBeings };
