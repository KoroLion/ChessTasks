const piecesCost = {
    'k': 900,
    'q': 90,
    'r': 50,
    'n': 30,
    'b': 30,
    'p': 10,
};

const positionsCost = [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 1, 2, 3, 3, 2, 1, 0],
    [0, 1, 2, 3, 3, 2, 1, 0],
    [0, 1, 2, 2, 2, 2, 1, 0],
    [0, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0]
]

function getDistance(whiteKingPos, blackKingPos) {
    const vector = {
        x: whiteKingPos.x - blackKingPos.x,
        y: whiteKingPos.y - blackKingPos.y
    }
    return Math.sqrt(Math.pow(vector.x, 2) + Math.pow(vector.y, 2));
}

function evaluateBoard(board) {
    let whiteKingPos, blackKingPos;
    let evaluation = 0, cost, i, j, square;
    for (i = 0; i < 8; i++) {
        for (j = 0; j < 8; j++) {
            square = board[i][j];
            if (square) { // (if square has piece on it)
                /*if (square.type === 'k') {
                    if (square.color === 'w') {
                        whiteKingPos = { x: i, y: j };
                    } else {
                        blackKingPos = { x: i, y: j };
                    }
                }*/

                let cost = piecesCost[square.type];
                cost += 2 * positionsCost[i][j];

                if (square.color === 'w') {
                    evaluation += cost;
                } else {
                    evaluation -= cost;
                }
            }
        }
    }
    //return { evaluation, whiteKingPos, blackKingPos };
    return evaluation;
}

function minimax(game, depth, a, b, isMaximizingPlayer) {
    //positions++;
    if (game.game_over()) {
        if (game.in_draw()) {
            return 0;
        } else {
            if (isMaximizingPlayer) {
                return -Infinity;
            } else {
                return +Infinity;
            }
        }
    }
    if (depth === 0) {
        return evaluateBoard(game.board());
        // console.log(res);
        // let kingsDst = getDistance(res.whiteKingPos, res.blackKingPos);


        /* let kingsDstBonus = 8 - kingsDst; // less distance is better for the endgame
        if (Math.abs(res.evaluation) >= 80) {
            kingsDstBonus *= 10;
        }*/

        /*if (res.evaluation >= 30 && isMaximizingPlayer) {
            return res.evaluation + kingsDstBonus;
        } else if (res.evaluation <= -30 && !isMaximizingPlayer) {
            return res.evaluation - kingsDstBonus;
        }*/
        // return res.evaluation;
    }

    let moves = game.ugly_moves();
    if (isMaximizingPlayer) {
        let maxEval = -Infinity;
        for (let i = 0; i < moves.length; i++) {
            game.ugly_move(moves[i]);
            maxEval = Math.max(maxEval, minimax(game, depth - 1, a, b, false));
            game.undo();

            a = Math.max(a, maxEval);
            if (a >= b) {
                break;
            }
        }
        return maxEval;
    } else {
        let minEval = Infinity;
        for (let i = 0; i < moves.length; i++) {
            game.ugly_move(moves[i]);
            minEval = Math.min(minEval, minimax(game, depth - 1, a, b, true));
            game.undo();

            b = Math.min(b, minEval);
            if (b <= a) {
                break;
            }
        }
        return minEval;
    }
}

export default function minimaxAi(game, depth = 3) {
    let moves = game.ugly_moves();
    const whiteTurn = game.turn() === 'w';

    //positions = 0;
    const moveVariants = []
    for (let move of moves) {
        game.ugly_move(move);
        let result = minimax(game, depth - 1, -Infinity, Infinity, !whiteTurn);
        game.undo();

        moveVariants.push({
            score: result,
            move: move
        })
    }

    if (whiteTurn) {
        return moveVariants.sort((a, b) => a.score < b.score);
    } else {
        return moveVariants.sort((a, b) => a.score > b.score);
    }
}

export { evaluateBoard }
