"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calcWinner = void 0;
const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
function calcWinner(board) {
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return { winner: board[a], line: lines[i] };
        }
    }
    if (!board.filter((s) => s === "").length)
        return { winner: "draw" };
    return null;
}
exports.calcWinner = calcWinner;
//# sourceMappingURL=game-logic.js.map