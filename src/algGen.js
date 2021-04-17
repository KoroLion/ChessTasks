function randInt(a){
    return Math.floor(Math.random() * (a));
}

function randomFigure(){
    figList = {0: chess.KING, 1: chess.QUEEN, 2: chess.ROOK, 3: chess.BISHIOP, 4: chess.KNIGHT, 5: chess.PAWN}
    return figList[randInt(6)];
}

function randomPosition(){
    numToChar = {1: 'a', 2: 'b', 3: 'c', 4: 'd', 5: 'e', 6:'f', 7: 'g', 8: 'h'};
    return numToChar[randInt(7) + 1] + randInt(7) + 1;
}

export function algGen(){
     const chess = new Chess();
     chess.clear();
     chess.put({ type: chess.KING, color: chess.BLACK}, randomPosition());
     return chess;
}
