import admin from "firebase-admin";
import serviceAccount from "./firebase.json";

export const firebaseInit = () => {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as any),
  });

  const db = admin.firestore();

  return { admin, db };
};
