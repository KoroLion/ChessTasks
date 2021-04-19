import { Chess } from '../lib/chess.js';
import minimaxAi from '../modules/minimaxAi';

function getDeltaS(t1, t2) {
    return (Math.abs(t1 - t2) / 1000).toFixed(2) + ' s';
}

onmessage = function (e) {
    const chess = new Chess(e.data)
    // postMessage({ fen: chess.fen(), pgn: chess.pgn() });

    const limit = 100;
    let i = 0;
    while (!chess.game_over() && (i++ < limit)) {
        const randomCoef = (chess.turn() === 'w') ? 0.05 : 0.4;
        const depth = (chess.turn() === 'w') ? 2 : 1;

        const time = performance.now();

        const moveVariants = minimaxAi(chess, depth);
        const moveIndex = Math.floor(moveVariants.length * randomCoef * Math.random());
        const move = moveVariants[moveIndex].move;

        console.log(getDeltaS(performance.now(), time));

        chess.ugly_move(move);

        postMessage({ fen: chess.fen(), pgn: chess.pgn() });
    }

    chess.undo();
    postMessage({ fen: chess.fen(), pgn: chess.pgn() });
};
