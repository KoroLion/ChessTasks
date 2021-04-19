import { Chess } from '../lib/chess.js';
import minimaxAi from '../modules/minimaxAi';
import pgns from '../../histories/pgnWithCheckmate.js';

let positions;

function getDeltaS(t1, t2) {
    return (Math.abs(t1 - t2) / 1000).toFixed(2) + ' s';
}

export default function () {
    // const chess = new Chess('8/8/8/4k3/8/1K6/1Q6/8 b - - 0 1');
    const chess = new Chess();

    //chess.ugly_move(minimaxAi(chess, 3)[0].move);
    //chess.ugly_move(minimaxAi(chess, 3)[0].move);

    let limit = 50;
    let i = 0;
    while (!chess.game_over()) {
        const time = performance.now();

        const randomCoef = (chess.turn() === 'w') ? 0.05 : 0.4;
        const depth = (chess.turn() === 'w') ? 3 : 2;

        const moveVariants = minimaxAi(chess, depth)
        const moveIndex = Math.floor(moveVariants.length * randomCoef * Math.random());
        const move = moveVariants[moveIndex].move;
        chess.ugly_move(move)

        console.log(getDeltaS(performance.now(), time));
        // console.log(chess.ascii())
        if (i++ >= limit) { break; }
    }
    return { fen: chess.fen(), pgn: chess.pgn() };
}
