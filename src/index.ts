import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';

const appEl = document.getElementById('app');

function main(appEl) {
    const boardEl = document.createElement('div');
    boardEl.style.width = '640px';
    boardEl.id = 'board';
    appEl.appendChild(boardEl);
    
    // @ts-ignore
    const board = Chessboard('board', { pieceTheme: '/images/chesspieces/wikipedia/{piece}.png' });

    const chess = new Chess();
    const moves = chess.moves();
    chess.move(moves[Math.floor(Math.random() * moves.length)]);

    board.position(chess.fen());

    const infoEl = document.createElement('div');
    infoEl.innerHTML = `<hr>${chess.pgn()}<hr>${chess.fen()}`;
    appEl.appendChild(infoEl);
}
main(appEl);
