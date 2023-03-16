export const ranking = () => {
  const pointsPerWin = 100;
  const pointsPerLoss = 50;
  const pointsPerDraw = 25;
  const pointsToClimb = 500;

  return { pointsPerDraw, pointsPerLoss, pointsPerWin, pointsToClimb };
};
