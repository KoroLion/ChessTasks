import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';
import { algGen } from './algGen.js';


const appEl = document.getElementById('app');

function main(appEl) {
    appEl.innerHTML = 'WOLF';

    const chess = algGen();

    const asciiChess = chess.ascii().replace(/\n/g, "<br>");
    appEl.innerHTML = `${asciiChess}<hr>${chess.pgn()}<hr>${chess.fen()}`;
}
main(appEl);
