export const batchWrite = async (
  db: FirebaseFirestore.Firestore,
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  payload: Record<any, any>
): Promise<void> => {
  try {
    const writeBatch = db.batch();
    writeBatch.set(docRef, payload);
    await Promise.all([writeBatch.commit()]);
  } catch (err) {
    console.log("Error writing to Firestore: ", err);
  }
};

export const batchUpdate = async (
  db: FirebaseFirestore.Firestore,
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
  payload: Record<any, any>
): Promise<void> => {
  try {
    const writeBatch = db.batch();
    writeBatch.update(docRef, payload);
    await Promise.all([writeBatch.commit()]);
  } catch (err) {
    console.log("Error writing to Firestore: ", err);
  }
};
