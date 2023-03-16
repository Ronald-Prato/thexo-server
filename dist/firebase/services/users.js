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
exports.getUser = exports.updateUser = exports.createUserInDB = void 0;
const batch_operations_1 = require("../batch.operations");
const createUserInDB = (db, body) => __awaiter(void 0, void 0, void 0, function* () {
    const { uid, email, nickname } = body;
    const usersRef = db.collection("users").doc(uid);
    const newUserStruct = {
        uid,
        email,
        nickname,
        elo: 1,
        points: 0,
        profilePic: "",
    };
    yield (0, batch_operations_1.batchWrite)(db, usersRef, newUserStruct);
});
exports.createUserInDB = createUserInDB;
const updateUser = (db, uid, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const usersRef = db.collection("users").doc(uid);
    yield (0, batch_operations_1.batchUpdate)(db, usersRef, payload);
});
exports.updateUser = updateUser;
const getUser = (db, uid) => __awaiter(void 0, void 0, void 0, function* () {
    const userRef = db.collection("users").doc(uid);
    const user = yield userRef.get();
    return user.data();
});
exports.getUser = getUser;
//# sourceMappingURL=users.js.map