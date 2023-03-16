import { FieldValue } from "@google-cloud/firestore";
import { ranking } from "../../ranking";
import { batchUpdate } from "../batch.operations";

export const increasePointsToPlayer = async (
  db: FirebaseFirestore.Firestore,
  option: "win" | "draw",
  uid: string
) => {
  const { pointsPerWin, pointsPerDraw, pointsToClimb } = ranking();
  const usersRef = db.collection("users").doc(uid);
  const user = await usersRef.get();
  const currentPoints = await user.data()?.points;

  const newPoints =
    currentPoints + (option === "win" ? pointsPerWin : pointsPerDraw);
  const hasClimbed = newPoints >= pointsToClimb;

  const newPointsUpdate = {
    points: hasClimbed ? newPoints - pointsToClimb : newPoints,
    elo: hasClimbed ? FieldValue.increment(1) : FieldValue.increment(0),
  };

  await batchUpdate(db, usersRef, newPointsUpdate);
};

export const decreasePointsToPlayer = async (
  db: FirebaseFirestore.Firestore,
  uid: string
) => {
  const { pointsPerLoss, pointsToClimb } = ranking();
  const usersRef = db.collection("users").doc(uid);
  const actualUser = await usersRef.get();
  const { points: currentPoints, elo: currentElo } = actualUser.data();

  let newPoints = currentPoints - pointsPerLoss;
  const hasDescended = newPoints < 0;

  if (hasDescended && currentElo === 1) newPoints = 0;
  if (hasDescended && currentElo > 1)
    newPoints = currentPoints + pointsToClimb - pointsPerLoss;

  const newPointsUpdate = {
    points: newPoints,
    elo:
      hasDescended && currentElo > 1
        ? FieldValue.increment(-1)
        : FieldValue.increment(0),
  };

  await batchUpdate(db, usersRef, newPointsUpdate);
};
