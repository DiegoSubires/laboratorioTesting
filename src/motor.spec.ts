import { Estado, partida } from "./model";
import { barajaSieteMediaCopas } from "./baraja";
import {
  barajar,
  perfect,
  comprobarPuntuacion,
  comprobarResultado,
} from "./motor";

import { vi } from "vitest";

describe("barajar", () => {
  it("Debería devolver un array desordenado a partir de arrayValorNominal", () => {
    // Arrange
    const resultadoEsperado: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    // Act
    const arrayDesordenado = barajar(partida.arrayValorNominal);

    // Assert
    expect(arrayDesordenado).not.toBe(resultadoEsperado);
  });
});
describe("perfect", () => {
  it("Debería devolver un array con el valor de la partida perfecta, en la posición 0 y las cartas a jugar para esa situación, en la posición", () => {
    // Arrange
    const resultadoEsperado: number[] = [8, 7];

    // Act
    const resultado = perfect(barajar(partida.arrayValorNominal));

    // Assert
    expect(resultado[0]).toBeLessThan(resultadoEsperado[0]);
    expect(resultado[1]).toBeLessThan(resultadoEsperado[1]);
  });
});
describe("perfect", () => {
  it("Debería devolver un array con el valor de la partida perfecta, en la posición 0 y las cartas a jugar para esa situación, en la posición", () => {
    // Arrange
    const arrayDesordenado: number[] = [3, 2, 9, 1, 4, 8, 10, 5, 6, 7];
    vi.spyOn(partida, "arrayValorNominal", "get").mockReturnValue(
      arrayDesordenado
    );

    // Act
    const resultado = perfect(partida.arrayValorNominal);
    const arrayResultadoEsperado: number[] = [6.5, 4];

    // Assert
    expect(resultado).toStrictEqual(arrayResultadoEsperado);
  });
});

describe("comprobarPuntuacion", () => {
  it("Debería devolver Null cuando la puntuación es 0", () => {
    // Arrange
    const numero: number = 0;
    const resultadoEsperado: Estado = "";

    // Act
    const resultado = comprobarPuntuacion(numero);

    // Assert
    expect(resultado).toBe(resultadoEsperado);
  });
  it("Debería devolver MENOR_4 cuando la puntuación está entre 0 y 4, no incluidos", () => {
    // Arrange
    const numero: number = 3;

    // Act
    const resultado = comprobarPuntuacion(
      barajaSieteMediaCopas[numero - 1].valorJuego
    );

    // Assert
    expect(resultado).toBe("MENOR_4");
  });
  it("Debería devolver 4_A_6 cuando la puntuación está entre 4 y 6, ambos incluidos", () => {
    // Arrange
    const numero: number = 4;

    // Act
    const resultado = comprobarPuntuacion(
      barajaSieteMediaCopas[numero - 1].valorJuego
    );

    // Assert
    expect(resultado).toBe("4_A_6");
  });
  it("Debería devolver 6_A_7 cuando la puntuación está entre 6 y 7, 7 incluído", () => {
    // Arrange
    const numero: number = 7;

    // Act
    const resultado = comprobarPuntuacion(
      barajaSieteMediaCopas[numero - 1].valorJuego
    );

    // Assert
    expect(resultado).toBe("6_A_7");
  });
  it("Debería devolver 7.5 cuando la puntuación sea 7.5", () => {
    // Arrange
    const numero1: number = 10;
    const numero2: number = 7;

    // Act
    const resultado = comprobarPuntuacion(
      barajaSieteMediaCopas[numero1 - 1].valorJuego +
        barajaSieteMediaCopas[numero2 - 1].valorJuego
    );

    // Assert
    expect(resultado).toBe("7.5");
  });
  it("Debería devolver GAME_OVER cuando la puntuación mayor de 7.5", () => {
    // Arrange
    const numero1: number = 1;
    const numero2: number = 7;

    // Act
    const resultado = comprobarPuntuacion(
      barajaSieteMediaCopas[numero1 - 1].valorJuego +
        barajaSieteMediaCopas[numero2 - 1].valorJuego
    );

    // Assert
    expect(resultado).toBe("GAME_OVER");
  });
});

describe("comprobarResultado", () => {
  it("Debería devolver OK cuando las cartas en juego más la carta de inicio sea igual a las cartas a jugar en una partida perfecta", () => {
    // Arrange

    const arrayPrueba: number[] = [3, 2, 9, 1, 4, 8, 10, 5, 6, 7];
    vi.spyOn(partida, "cartasEnJuego", "get").mockReturnValue(3);
    vi.spyOn(partida, "arrayValorNominal", "get").mockReturnValue(arrayPrueba);

    // Act
    const resultado = comprobarResultado();

    // Assert
    expect(resultado).toBe("OK");
  });
  it("Debería devolver NO_OK cuando las cartas en juego más la carta de inicio sea menor a las cartas a jugar en una partida perfecta", () => {
    // Arrange

    const arrayPrueba: number[] = [3, 2, 9, 1, 4, 8, 10, 5, 6, 7];
    vi.spyOn(partida, "cartasEnJuego", "get").mockReturnValue(2);
    vi.spyOn(partida, "arrayValorNominal", "get").mockReturnValue(arrayPrueba);

    // Act
    const resultado = comprobarResultado();

    // Assert
    expect(resultado).toBe("NO_OK");
  });
});
