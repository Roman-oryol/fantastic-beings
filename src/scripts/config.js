import zouwu from '../images/beings/zouwu.png';
import swooping from '../images/beings/swooping.png';
import salamander from '../images/beings/salamander.png';
import puffskein from '../images/beings/puffskein.png';
import kelpie from '../images/beings/kelpie.png';

const creatures = [
  { name: 'zouwu', image: zouwu },
  { name: 'swooping', image: swooping },
  { name: 'salamander', image: salamander },
  { name: 'puffskein', image: puffskein },
  { name: 'kelpie', image: kelpie },
];

const rows = 5;
const cols = 5;

function generateRandomBeingName() {
  const randomIndex = Math.floor(Math.random() * creatures.length);

  return creatures[randomIndex].name;
}

export { creatures, rows, cols, generateRandomBeingName };
