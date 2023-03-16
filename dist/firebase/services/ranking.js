"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decreasePointsToPlayer = exports.increasePointsToPlayer = void 0;
const firestore_1 = require("@google-cloud/firestore");
const ranking_1 = require("../../ranking");
const batch_operations_1 = require("../batch.operations");
const increasePointsToPlayer = (db, option, uid) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { pointsPerWin, pointsPerDraw, pointsToClimb } = (0, ranking_1.ranking)();
    const usersRef = db.collection("users").doc(uid);
    const user = yield usersRef.get();
    const currentPoints = yield ((_a = user.data()) === null || _a === void 0 ? void 0 : _a.points);
    const newPoints = currentPoints + (option === "win" ? pointsPerWin : pointsPerDraw);
    const hasClimbed = newPoints >= pointsToClimb;
    const newPointsUpdate = {
        points: hasClimbed ? newPoints - pointsToClimb : newPoints,
        elo: hasClimbed ? firestore_1.FieldValue.increment(1) : firestore_1.FieldValue.increment(0),
    };
    yield (0, batch_operations_1.batchUpdate)(db, usersRef, newPointsUpdate);
});
exports.increasePointsToPlayer = increasePointsToPlayer;
const decreasePointsToPlayer = (db, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const { pointsPerLoss, pointsToClimb } = (0, ranking_1.ranking)();
    const usersRef = db.collection("users").doc(uid);
    const actualUser = yield usersRef.get();
    const { points: currentPoints, elo: currentElo } = actualUser.data();
    let newPoints = currentPoints - pointsPerLoss;
    const hasDescended = newPoints < 0;
    if (hasDescended && currentElo === 1)
        newPoints = 0;
    if (hasDescended && currentElo > 1)
        newPoints = currentPoints + pointsToClimb - pointsPerLoss;
    const newPointsUpdate = {
        points: newPoints,
        elo: hasDescended && currentElo > 1
            ? firestore_1.FieldValue.increment(-1)
            : firestore_1.FieldValue.increment(0),
    };
    yield (0, batch_operations_1.batchUpdate)(db, usersRef, newPointsUpdate);
});
exports.decreasePointsToPlayer = decreasePointsToPlayer;
//# sourceMappingURL=ranking.js.map