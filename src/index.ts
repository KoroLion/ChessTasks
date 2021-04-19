import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';
import { algGen } from './algGen.js';

import getTaskFromHistory from './taskGenerators/aiGame.js';
import TaskBoard from './modules/taskBoard.js';

const appEl = document.getElementById('app');

const html = `
<h1 id="titleEl">Chess Tasks</h1>
<button class="btn" id="nextTaskButton">Next task</button>
<div id="topInfo"><h3><span id="sideName"></span>'s turn</h3></div>
<div id="board"></div>
<div id="bottomInfo"><hr><strong>PGN: </strong><span id="pgn"></span><hr><strong>FEN: </strong><span id="fen"></span></div>
`;

function newTask(board, sideNameEl, pgnEl, fenEl) {
    const chess = new Chess()
    const { fen, pgn } = getTaskFromHistory();
    chess.load(fen);
    chess.load_pgn(pgn);

    const sideName = (chess.turn() === 'w') ? 'White' : 'Black';

    sideNameEl.innerHTML = sideName;
    pgnEl.innerHTML = chess.pgn();
    fenEl.innerHTML = chess.fen();

    board.update(chess);
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
