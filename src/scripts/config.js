import zouwu from '../images/beings/zouwu.png';
import swooping from '../images/beings/swooping.png';
import salamander from '../images/beings/salamander.png';
import puffskein from '../images/beings/puffskein.png';
import kelpie from '../images/beings/kelpie.png';
import clickAudio from '../audio/click.wav';
import matchAudio from '../audio/match.wav';

const creatures = [
  { name: 'zouwu', image: zouwu },
  { name: 'swooping', image: swooping },
  { name: 'salamander', image: salamander },
  { name: 'puffskein', image: puffskein },
  { name: 'kelpie', image: kelpie },
];

const rows = 5;
const cols = 5;

const gameGoals = {
  zouwu: 12,
  kelpie: 12,
};

const maxMoves = 15;

function generateRandomBeingName() {
  const randomIndex = Math.floor(Math.random() * creatures.length);

  return creatures[randomIndex].name;
}

const clickSound = new Audio(clickAudio);
const matchSound = new Audio(matchAudio);
matchSound.volume = 0.1;

export {
  creatures,
  rows,
  cols,
  gameGoals,
  maxMoves,
  generateRandomBeingName,
  clickSound,
  matchSound,
};
