import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';
import { algGen } from './algGen.js';


const appEl = document.getElementById('app');

function main(appEl) {
    const boardEl = document.createElement('div');
    boardEl.style.width = '640px';
    boardEl.id = 'board';
    appEl.appendChild(boardEl);

    const chess = new Chess('k7/8/4R3/1R6/8/8/1K6/8 w - - 0 1');

    function onDrop(from, to, piece) {
        const move = chess.move({
            from, to,
            promotion: 'q'
        })
        if (move === null) {
            return 'snapback';
        }

        if (chess.in_checkmate()) {
            alert('Task solved!');
        }
    }
    // @ts-ignore
    const board = Chessboard('board', {
        pieceTheme: '/images/chesspieces/wikipedia/{piece}.png',
        draggable: true,
        onDrop: onDrop
    });
    board.position(chess.fen());
    console.log(chess.game_over())

    const infoEl = document.createElement('div');
    infoEl.innerHTML = `<hr>${chess.pgn()}<hr>${chess.fen()}`;
    appEl.appendChild(infoEl);
}
main(appEl);
