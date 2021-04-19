import { Chess } from '../lib/chess.js';

function randInt(a) {
    return Math.floor(Math.random() * (a));
}

function randomFigure(chess, color: string) : Record<string, string>{
    const figList = { 0: 'k', 1: 'q', 2: 'r', 3: 'b', 4: 'n', 5: 'p' };
    const figMax = { 'k': 1, 'q': 1, 'r': 2, 'b': 2, 'n': 2, 'p': 8 };
    const figCounter = countFigures(chess, color);

    let curFig = figList[randInt(6)];
    while (figCounter[curFig] >= figMax[curFig]) {
        curFig = figList[randInt(6)];
    }
    return { type: curFig, color: color };
}

function randomPosition() {
    const numToChar = { 1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6: 'f', 7: 'g', 8: 'h' };
    return numToChar[randInt(7) + 1] + (randInt(7) + 1);
}

function randomEmptyPosition(chess){
    let position = randomPosition();
    while (chess.get(position) !== null) position = randomPosition();
    return position;
}

function getSimpleTurn(turnStr) {
    turnStr = turnStr.replace('+', '');
    turnStr = turnStr.replace('x', '');
    turnStr = turnStr.replace('#', '');
    if (turnStr.length === 2) return turnStr;
    else if (turnStr.length === 3) return turnStr.slice(1, 3);
    else if (turnStr.length === 4) return turnStr.slice(1, 3);
    else if (turnStr.length === 1) return turnStr + '8';
}

function countFigures(chess, color) {
    let figList = getAllFigures(chess);
    let result = {
        k: 0,
        q: 0,
        r: 0,
        b: 0,
        n: 0,
        p: 0
    };
    let tmp;
    for (tmp of Object.values(figList)) if (tmp['color'] === color) result[tmp['type']]++;
    return result;
}

function changeTurn(chess, needTurn){
    let tmpChessStr = chess.fen();
    tmpChessStr = tmpChessStr.replace("w", needTurn);
    tmpChessStr = tmpChessStr.replace("b", needTurn);
    chess = chess.load(tmpChessStr);
}

function moveListToSimple(moveList){
    for (let i = 0; i < moveList.length; i++){
        moveList[i] = getSimpleTurn(moveList[i]);
    }
}

function moveListToPassive(moveList){
    let result = [];
    for (let i = 0; i < moveList.length; i++){
        if (!moveList[i].includes("x") && !moveList[i].includes("=")) result.push(getSimpleTurn(moveList[i]));
    }
    return result
}

function getRandomMove(moveList, pos) {
    if (moveList.length === 0) return pos;
    else return getSimpleTurn(moveList[randInt(moveList.length)]);
}

function betterBaseGen(chess) {
    let tmpChess = Object.assign({}, chess);
    const kingPos = randomPosition();
    tmpChess.put({type: 'k', color: 'b'}, kingPos);

    changeTurn(tmpChess, 'b');
    let moveList = tmpChess.moves({square: kingPos});
    moveListToSimple(moveList);
    changeTurn(tmpChess, 'w')
    for (let pos of moveList) {
        if (tmpChess.get(pos) === null && (Object.keys(getMovesFrom(tmpChess, pos)).length === 0)) {
            let fig = randomFigure(tmpChess, 'w');
            tmpChess.put(fig, pos);

            let wMoveList = tmpChess.moves({square: pos});
            wMoveList = moveListToPassive(wMoveList);
            let wMove = getRandomMove(wMoveList, pos);
            if (wMove != pos) {
                tmpChess.put(fig, wMove);
                tmpChess.remove(pos);
            }
            let movesFrom = getMovesFrom(tmpChess, pos);

        }
    }
    changeTurn(tmpChess, 'b');
    return [kingPos, tmpChess];
}

function genOneEscape(chess){
    let tmpChes = new Chess();
    tmpChes.clear();
    let gen = betterBaseGen(tmpChes);
    let kingPos = gen[0];
    tmpChes = gen[1];
    changeTurn(tmpChes, 'b')

    let cnt = 0;

    while (tmpChes.moves( {square: kingPos}).length !== 1 && cnt < 500){
        gen = betterBaseGen(tmpChes);
        kingPos = gen[0];
        tmpChes = gen[1];
        changeTurn(tmpChes, 'b')
        console.log(tmpChes.moves( {square: kingPos}))
        cnt++
    }
    return [kingPos, tmpChes]
}

function getAllFigures(chess){
    let result = {};
    let tmp
    for ( tmp of chess.SQUARES.values()) if (chess.get(tmp) !== null) result[tmp] = chess.get(tmp);
    return result;
}

function containsMoveTo(moveList, toPos){
    for (let i = 0; i < moveList.length; i++){
        if (moveList[i].includes(toPos)) return true
    }
    return false
}

function getMovesFrom(chess, toPos){
    let result = {};
    let figList = Object.assign({} ,getAllFigures(chess));
    let tmp;
    for (tmp of Object.keys(figList)) {
        if (figList[tmp].color === chess.turn() && containsMoveTo(chess.moves({square: tmp}), toPos)) result[tmp] = figList[tmp];
    }
    return result;
}

export function algGen() {
    let chess = new Chess();
    chess.clear();
    let gen = genOneEscape(chess);
    let kingPos = gen[0];
    chess = gen[1];
    console.log(chess.moves({square: kingPos}))
    return chess;
}
