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
exports.serverInit = void 0;
const services_1 = require("./firebase/services");
const serverInit = (server, app, db) => {
    app.get("/", (req, res) => {
        res.send("Encolados Server Up and Running!");
    });
    app.post("/create-user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield (0, services_1.createUserInDB)(db, req.body);
            res.status(204).send("User created");
        }
        catch (_a) {
            throw new Error("Error creating user");
        }
    }));
    app.get("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, services_1.getUser)(db, req.params.id);
        if (!user)
            return res.status(404).send("User not found");
        return res.send(user);
    }));
    app.put("/user/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        (0, services_1.updateUser)(db, req.params.id, req.body);
        return res.send("User updated");
    }));
    server.listen(8080, () => {
        console.log("Server listening on port 8080 ");
    });
};
exports.serverInit = serverInit;
//# sourceMappingURL=server.js.map