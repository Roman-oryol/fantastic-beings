import './style.scss';
import { rows, cols } from './scripts/config.js';
import { renderMap, fillMapRandomly } from './scripts/map.js';
import { fillMapState } from './scripts/state.js';
import { initGame } from './scripts/interaction.js';

renderMap(rows, cols);
fillMapRandomly();
fillMapState();
initGame(rows, cols);
