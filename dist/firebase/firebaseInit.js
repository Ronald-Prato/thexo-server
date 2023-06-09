"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseInit = void 0;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const firebase_json_1 = __importDefault(require("./firebase.json"));
const firebaseInit = () => {
    firebase_admin_1.default.initializeApp({
        credential: firebase_admin_1.default.credential.cert(firebase_json_1.default),
    });
    const db = firebase_admin_1.default.firestore();
    return { admin: firebase_admin_1.default, db };
};
exports.firebaseInit = firebaseInit;
//# sourceMappingURL=firebaseInit.js.map