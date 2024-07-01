/** Formate le temps effectué en un format mm:ss */
export function formatTime(t) {
  if (t < 10) {
    return `0${Math.floor(t)}`;
  }
  return Math.floor(t);
}