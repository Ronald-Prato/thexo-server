import { Express } from "express";
import { IncomingMessage, Server, ServerResponse } from "http";
import { createUserInDB, getUser, updateUser } from "./firebase/services";

export const serverInit = (
  server: Server<typeof IncomingMessage, typeof ServerResponse>,
  app: Express,
  db: FirebaseFirestore.Firestore
) => {
  app.get("/", (req, res) => {
    res.send("Encolados Server Up and Running!");
  });

  app.post("/create-user", async (req, res) => {
    try {
      await createUserInDB(db, req.body);
      res.status(204).send("User created");
    } catch {
      throw new Error("Error creating user");
    }
  });

  app.get("/user/:id", async (req, res) => {
    const user = await getUser(db, req.params.id);
    if (!user) return res.status(404).send("User not found");
    return res.send(user);
  });

  app.put("/user/:id", async (req, res) => {
    updateUser(db, req.params.id, req.body);
    return res.send("User updated");
  });

  server.listen(8080, () => {
    console.log("Server listening on port 8080 ");
  });
};
