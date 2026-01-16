import { mapState } from './state.js';

function checkMatches() {
  const matches = [];
  const rows = mapState.length;
  const cols = mapState[0].length;

  // горизонтали
  for (let y = 0; y < rows; y++) {
    let start = 0;
    for (let x = 1; x <= cols; x++) {
      const isSame = x < cols && mapState[y][x] === mapState[y][start];
      if (!isSame) {
        if (mapState[y][start] && x - start >= 3)
          matches.push({ type: 'row', y, from: start, to: x - 1 });
        start = x;
      }
    }
  }

  // вертикали
  for (let x = 0; x < cols; x++) {
    let start = 0;
    for (let y = 1; y <= rows; y++) {
      const isSame = y < rows && mapState[y][x] === mapState[start][x];
      if (!isSame) {
        if (mapState[start][x] && y - start >= 3)
          matches.push({ type: 'col', x, from: start, to: y - 1 });
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
      for (let x = m.from; x <= m.to; x++) coords.push([x, m.y]);
    } else {
      for (let y = m.from; y <= m.to; y++) coords.push([m.x, y]);
    }
  }
  return coords;
}

function clearMatches(coords) {
  const collected = {};
  coords.forEach(([x, y]) => {
    const being = mapState[y][x];
    if (being) {
      collected[being] = (collected[being] || 0) + 1;
    }
    mapState[y][x] = '';
  });
  return collected;
}

export { checkMatches, matchesToCoords, clearMatches };
