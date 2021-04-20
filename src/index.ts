import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from './lib/chess.js';
import TaskBoard from './modules/taskBoard.js';

import { algGen } from './taskGenerators/algGen';
import getTaskFromHistory from './taskGenerators/fromHistory.js';
import TaskWorker from 'web-worker:./taskGenerators/aiGameWorker';

const appEl = document.getElementById('app');

const html = `
<h1 id="titleEl">Chess Tasks</h1>
<div class="buttons">
    <!--<button class="btn" id="generateTask">Generate Task</button>-->
    <button class="btn" id="generateTaskByAI">Generate Task</button>
    <button class="btn" id="getTaskFromPGN">Create task from PGN</button>
</div>
<div id="board"></div>
<div id="topInfo"><h3><span id="sideName"></span>'s turn</h3></div>
<div id="bottomInfo"><hr><strong>PGN: </strong><span id="pgn"></span><hr><strong>FEN: </strong><span id="fen"></span></div>
`;

function main(appEl) {
    appEl.innerHTML = html;

    const boardEl = document.getElementById('board');
    const pgnEl = document.getElementById('pgn');
    const fenEl = document.getElementById('fen');
    const sideNameEl = document.getElementById('sideName');
    function setTaskInfo(chess) {
        const sideName = (chess.turn() === 'w') ? 'White' : 'Black';
        sideNameEl.innerHTML = sideName;
        pgnEl.innerHTML = chess.pgn();
        fenEl.innerHTML = chess.fen();
    }

    const generateTaskByAI = document.getElementById('generateTaskByAI');
    // const generateTask = document.getElementById('generateTask');
    const createFromPGN = document.getElementById('getTaskFromPGN');

    const chess = new Chess();
    const board = new TaskBoard(boardEl, chess);

    generateTaskByAI.addEventListener('click', () => {
        let chess = new Chess();

        const taskWorker = new TaskWorker();
        taskWorker.addEventListener('message', function (e) {
            const { fen, pgn } = e.data;
            chess.load_pgn(pgn);

            board.update(chess);
            setTaskInfo(chess);
        });
        taskWorker.postMessage(chess.fen());
    });

    /*generateTask.addEventListener('click', () => {
        const chess = algGen();
        board.update(chess);
        setTaskInfo(chess);
    });*/

    createFromPGN.addEventListener('click', () => {
        const chess = getTaskFromHistory();
        board.update(chess);
        setTaskInfo(chess);
    });
}
main(appEl);
