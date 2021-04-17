import { Chess } from 'chess.js/chess.js';

const appEl = document.getElementById('app');

function main(appEl) {
    appEl.innerHTML = 'WOLF';

    const chess = new Chess();
    console.log(chess.ascii());

    const moves = chess.moves();
    chess.move(moves[Math.floor(Math.random() * moves.length)]);

    console.log(chess.ascii());
    console.log(chess.pgn());
}
main(appEl);
