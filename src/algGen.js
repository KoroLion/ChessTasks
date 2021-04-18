import { Chess } from 'chess.js/chess.js';

function randInt(a) {
    return Math.floor(Math.random() * (a));
}

function randomFigure(figCounter, figMax) {
    const figList = { 0: 'k', 1: 'q', 2: 'r', 3: 'b', 4: 'n', 5: 'p'};
    let curFig = figList[randInt(6)];
    while (figCounter[curFig] >= figMax[curFig]) curFig = figList[randInt(6)];
    figCounter[curFig]++;
    return curFig;
}

function randomPosition() {
    const numToChar = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h' };
    return numToChar[randInt(7) + 1] + (randInt(7) + 1);
}

function getSimpleTurn(turnStr) {
    if (turnStr.length === 2) return turnStr;
    else if (turnStr.length === 3) return turnStr.slice(1, 3);
    else if (turnStr.length === 4) return turnStr.slice(1, 3);
    else if (turnStr.length === 5) return turnStr.slice(2, 4);
}

function getRandomMove(chess, pos) {
    const moves = chess.moves({ square: pos });
    //console.log(moves);
    if (moves.length === 0) return pos;
    else return getSimpleTurn(moves[randInt(moves.length)]);
}

function baseGen(chess) {
    chess.clear();
    const kingPos = randomPosition();
    const figCounter = {
        k: 0,
        q: 0,
        r: 0,
        b: 0,
        n: 0,
        p: 0
    };
    const figMax = {
        k: 0,
        q: 1,
        r: 2,
        b: 2,
        n: 2,
        p: 8
    };

    chess.put({
        type: 'k',
        color: 'w'
    }, kingPos);
    const planToCheck = chess.moves({ square: kingPos });
    chess.remove(kingPos);
    chess.put({
        type: 'k',
        color: 'b'
    }, kingPos);
    for (let pos of planToCheck) {
        if (chess.get(pos) === null) {
            pos = pos.slice(1, 3);
            const fig = randomFigure(figCounter, figMax);
            chess.put({
                type: fig,
                color: 'w'
            }, pos);
            const fromPos = getRandomMove(chess, pos);
            chess.remove(pos);
            chess.put({
                type: fig,
                color: 'w'
            }, fromPos);
            //console.log(pos, fromPos);
        }
    }
    return [kingPos, chess];
}

export function algGen() {
    let chess = new Chess();

    let gen = baseGen(chess);
    let kingPos = gen[0];
    chess = gen[1];
    while (chess.moves({ square: kingPos }).length !== 1) {
        gen = baseGen(chess);
        kingPos = gen[0];
        chess = gen[1];
    }
    console.log(chess.moves({ pos: kingPos }));
    return chess;
}
