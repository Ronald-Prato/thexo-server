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
exports.batchUpdate = exports.batchWrite = void 0;
const batchWrite = (db, docRef, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writeBatch = db.batch();
        writeBatch.set(docRef, payload);
        yield Promise.all([writeBatch.commit()]);
    }
    catch (err) {
        console.log("Error writing to Firestore: ", err);
    }
});
exports.batchWrite = batchWrite;
const batchUpdate = (db, docRef, payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const writeBatch = db.batch();
        writeBatch.update(docRef, payload);
        yield Promise.all([writeBatch.commit()]);
    }
    catch (err) {
        console.log("Error writing to Firestore: ", err);
    }
});
exports.batchUpdate = batchUpdate;
//# sourceMappingURL=batch.operations.js.map