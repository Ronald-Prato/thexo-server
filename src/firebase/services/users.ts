import { batchWrite, batchUpdate } from "../batch.operations";
import { firebaseInit } from "../firebaseInit";
import { User } from "../types";

export const createUserInDB = async (
  db: FirebaseFirestore.Firestore,
  body: {
    uid: string;
    email: string;
    nickname: string;
  }
) => {
  const { uid, email, nickname } = body;
  const usersRef = db.collection("users").doc(uid);
  const newUserStruct: User = {
    uid,
    email,
    nickname,
    elo: 1,
    points: 0,
    profilePic: "",
  };

  await batchWrite(db, usersRef, newUserStruct);
};

export const updateUser = async (
  db: FirebaseFirestore.Firestore,
  uid: string,
  payload: Partial<User>
) => {
  const usersRef = db.collection("users").doc(uid);
  await batchUpdate(db, usersRef, payload);
};

export const getUser = async (db: FirebaseFirestore.Firestore, uid: string) => {
  const userRef = db.collection("users").doc(uid);
  const user = await userRef.get();
  return user.data();
};
