export function getCurrentMiliseconds(): number {
  const result = new Date().getTime();

  return result;
}
