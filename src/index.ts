import './styles/chessboard-1.0.0.css';
import './styles/main.styl';

import { Chess } from 'chess.js/chess.js';
import { algGen } from './algGen.js';

import getTaskFromHistory from './taskGenerators/fromHistory.js';
import TaskBoard from './modules/taskBoard.js';

const appEl = document.getElementById('app');

function newTask(board, topInfo, bottomInfo) {
    const chess = getTaskFromHistory();

    const sideName = (chess.turn() === 'w')? 'white': 'black';
    topInfo.innerHTML = `<h3>Now is ${sideName}'s move`;
    bottomInfo.innerHTML = `<hr><strong>PGN: </strong>${chess.pgn()}<hr><strong>FEN: </strong>${chess.fen()}`;
    board.update(chess);
}

function main(appEl) {
    const title = 'Chess Tasks';
    const titleEl = document.createElement('h1');
    titleEl.innerHTML = title;
    appEl.appendChild(titleEl);
    document.title = title;

    const nextTaskButton = document.createElement('button');
    nextTaskButton.classList.add('btn');
    nextTaskButton.innerHTML = 'Next task';
    appEl.appendChild(nextTaskButton);

    const topInfo = document.createElement('div');
    appEl.append(topInfo);

    const boardEl = document.createElement('div');
    boardEl.id = 'board';
    appEl.appendChild(boardEl);

    const bottomInfo = document.createElement('div');
    bottomInfo.classList.add('task-info');
    appEl.appendChild(bottomInfo);

    const chess = new Chess();
    const board = new TaskBoard(boardEl, chess);
    nextTaskButton.addEventListener('click', () => { newTask(board, topInfo, bottomInfo); });
    newTask(board, topInfo, bottomInfo);
}
main(appEl);
