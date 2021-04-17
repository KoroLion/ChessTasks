import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';

const appEl = document.getElementById('app');

function main(appEl) {
    appEl.innerHTML = 'WOLF';

    const chess = new Chess();

    const moves = chess.moves();
    chess.move(moves[Math.floor(Math.random() * moves.length)]);

    const asciiChess = chess.ascii().replace(/\n/g, "<br>");
    appEl.innerHTML = `${asciiChess}<hr>${chess.pgn()}<hr>${chess.fen()}`;
}
main(appEl);
