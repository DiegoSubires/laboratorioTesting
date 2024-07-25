interface Partida {
  cartasEnJuego: number;
  cartasEnBaraja: number;
  puntuacion: number;
  numeroObjetivo: number;
  arrayValorNominal: number[];
}
export const partida: Partida = {
  cartasEnJuego: 0,
  cartasEnBaraja: 9,
  puntuacion: 0,
  numeroObjetivo: 7.5,
  arrayValorNominal: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
};

export type Estado =
  | "MENOR_4"
  | "4_A_6"
  | "6_A_7"
  | "6_A_7.Ok"
  | "7.5"
  | "GAME_OVER"
  | "OK"
  | "NO_OK"
  | "";
