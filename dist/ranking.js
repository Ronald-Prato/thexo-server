"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ranking = void 0;
const ranking = () => {
    const pointsPerWin = 100;
    const pointsPerLoss = 50;
    const pointsPerDraw = 25;
    const pointsToClimb = 500;
    return { pointsPerDraw, pointsPerLoss, pointsPerWin, pointsToClimb };
};
exports.ranking = ranking;
//# sourceMappingURL=ranking.js.map