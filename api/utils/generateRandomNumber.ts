// Génère un nombre entier aléatoire entre 1 et 491
export const generateRandomNumber = (maxNumber: number) => {
  return Math.floor(Math.random() * maxNumber) + 1;
};
