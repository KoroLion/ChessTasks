import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from './lib/chess.js';
// import { algGen } from './algGen.js';

import getTaskFromHistory from './taskGenerators/aiGame.js';
import TaskBoard from './modules/taskBoard.js';

import TaskWorker from 'web-worker:./taskGenerators/aiGameWorker';

const appEl = document.getElementById('app');

const html = `
<h1 id="titleEl">Chess Tasks</h1>
<button class="btn" id="nextTaskButton">Next task</button>
<div id="topInfo"><h3><span id="sideName"></span>'s turn</h3></div>
<div id="board"></div>
<div id="bottomInfo"><hr><strong>PGN: </strong><span id="pgn"></span><hr><strong>FEN: </strong><span id="fen"></span></div>
`;

function newTask(board, sideNameEl, pgnEl, fenEl) {
    let chess = new Chess();
    // chess.load_pgn('1. d4 d5 2. Nc3 Bd7 3. Nxd5 c6 4. Nb4 Qc7 5. c3 e6 6. Nc2 Ke7 7. Nb4 e5 8. dxe5 Bg4 9. Bg5+ Ke6 10. Qd4 Nd7 11. Nd3 a6 12. e4 Qxe5 13. Nxe5 Rc8 14. Nxg4 b5 15. f4 f5 16. O-O-O Ndf6 17. exf5+ Kxf5 18. Ne3+ Ke6 19. f5+ Kf7 20. Nf3 Rc7');

    const taskWorker = new TaskWorker();
    taskWorker.addEventListener('message', function (e) {
        const { fen, pgn } = e.data;
        // chess.load(fen);
        chess.load_pgn(pgn);

        const sideName = (chess.turn() === 'w') ? 'White' : 'Black';

        sideNameEl.innerHTML = sideName;
        pgnEl.innerHTML = chess.pgn();
        fenEl.innerHTML = chess.fen();

        board.update(chess);
    });
    taskWorker.postMessage(chess.fen());

    /*const { fen, pgn } = getTaskFromHistory();
    chess.load(fen);
    chess.load_pgn(pgn);*/
}

function main(appEl) {
    appEl.innerHTML = html;

    const boardEl = document.getElementById('board');
    const pgnEl = document.getElementById('pgn');
    const fenEl = document.getElementById('fen');
    const sideNameEl = document.getElementById('sideName');
    const nextTaskButton = document.getElementById('nextTaskButton');

    const chess = new Chess();
    const board = new TaskBoard(boardEl, chess);

    nextTaskButton.addEventListener('click', () => { newTask(board, sideNameEl, pgnEl, fenEl); });
    newTask(board, sideNameEl, pgnEl, fenEl);
}
main(appEl);
