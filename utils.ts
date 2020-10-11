export function getCurrentMiliseconds(caller: string): number {
  const result = new Date().getTime();

  return result;
}
