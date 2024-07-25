import { barajaSieteMediaCopas } from "./baraja";
import { Estado, partida } from "./model";

export function barajar(arrayValorNominal: number[]) {
  for (let i = arrayValorNominal.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [arrayValorNominal[i], arrayValorNominal[j]] = [
      arrayValorNominal[j],
      arrayValorNominal[i],
    ];
  }
  return arrayValorNominal;
}
export function perfect(arrayValorNominal: number[]) {
  let [n, i] = [0, 0];
  n = barajaSieteMediaCopas[arrayValorNominal[i] - 1].valorJuego;
  i++;
  while (n <= 7.5) {
    n = n + barajaSieteMediaCopas[arrayValorNominal[i] - 1].valorJuego;
    i++;
  }
  let p = i - 1;
  [n, i] = [0, 0];
  while (i < p) {
    n = n + barajaSieteMediaCopas[arrayValorNominal[i] - 1].valorJuego;
    i++;
  }
  return [n, p];
}
export const comprobarPuntuacion = (puntuacion: number): Estado => {
  if (puntuacion > 0 && puntuacion < 4) {
    return "MENOR_4";
  }
  if (puntuacion >= 4 && puntuacion <= 6) {
    return "4_A_6";
  }
  if (puntuacion > 6 && puntuacion <= 7) {
    return "6_A_7";
  }
  if (puntuacion == 7.5) {
    return "7.5";
  }
  if (puntuacion > 7.5) {
    return "GAME_OVER";
  }
  return "";
};
export const comprobarResultado = (): Estado => {
  if (partida.cartasEnJuego + 1 === perfect(partida.arrayValorNominal)[1]) {
    return "OK";
  }
  return "NO_OK";
};
