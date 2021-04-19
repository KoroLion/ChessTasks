export default class TaskBoard {
    constructor(el, chess) {
        this.chess = chess;

        const self = this;
        function onDrop(from, to, piece) {
            const move = self.chess.move({
                from,
                to,
                promotion: 'q'
            });
            if (move === null) {
                return 'snapback';
            } else if (!self.chess.in_checkmate()) {
                alert('Not a checkmate!');
                self.chess.undo();
                return 'snapback';
            }

            alert('Task solved!');
        }
        function onDragStart() {
            if (self.chess.game_over()) {
                return false;
            }
            return true;
        }

        // @ts-ignore
        this.board = Chessboard(el.id, {
            pieceTheme: 'images/chesspieces/wikipedia/{piece}.png',
            draggable: true,
            onDrop: onDrop,
            onDragStart: onDragStart
        });
        this.board.position(this.chess.fen());
    }

    update(chess) {
        this.chess = chess;
        this.board.position(this.chess.fen());
    }
}
