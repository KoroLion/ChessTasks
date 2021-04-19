import { Chess } from '../lib/chess.js';
import pgns from '../../histories/pgnWithCheckmate.js';

export default function () {
    const chess = Chess();
    chess.load_pgn(pgns[Math.floor(Math.random() * pgns.length)]);
    chess.undo();
    return chess;
}
