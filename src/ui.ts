import { barajaSieteMediaCopas, cartaBack } from "./baraja";
import { Estado, partida } from "./model";
import {
  barajar,
  perfect,
  comprobarPuntuacion,
  comprobarResultado,
} from "./motor";
import {
  cartaBA01,
  cartaBA02,
  cartaBA03,
  cartaBA04,
  cartaBA05,
  cartaBA06,
  cartaBA07,
  cartaBA08,
  cartaBA09,
  cartaInicio,
  cartaJuego01,
  cartaJuego02,
  cartaJuego03,
  cartaJuego04,
  cartaJuego05,
  cartaJuego06,
  cartaJuego07,
  cartaJuego08,
  cartaJuego09,
  botonInicio,
  botonCarta,
  botonPlantarse,
  botonComprobar,
  botonReset,
} from "./ui.baraja";

export const muestraPuntuacion = () => {
  const elementoPuntuacion = document.getElementById("puntuacion");
  if (elementoPuntuacion) {
    elementoPuntuacion.innerHTML = `${partida.puntuacion}`;
  } else {
    console.error(
      "muestraNumeroDeIntento: No se ha encontrado el elemento con id intentos"
    );
  }
};
export const handleClickInicio = () => {
  if (
    cartaInicio !== null &&
    botonInicio !== null &&
    botonCarta !== null &&
    botonPlantarse !== null &&
    botonReset !== null
  ) {
    botonCarta.disabled = false;
    botonPlantarse.disabled = false;
    botonReset.disabled = false;
    barajar(partida.arrayValorNominal);
    perfect(partida.arrayValorNominal);
    cartaInicio.src =
      barajaSieteMediaCopas[partida.arrayValorNominal[0] - 1].src;
    partida.puntuacion =
      partida.puntuacion +
      barajaSieteMediaCopas[partida.arrayValorNominal[0] - 1].valorJuego;
    muestraPuntuacion();
    botonInicio.disabled = true;
  }
};
// Hay relación entre cartasEnBaraja y cartasEnJuego, por lo que podría quitar una variable

export const muestraCarta = (
  cartasEnJuego: number,
  cartasEnBaraja: number
): void => {
  let nombreCarta = "cartaJuego";
  nombreCarta = nombreCarta + cartasEnJuego.toString().padStart(2, "0");
  let cartaJuego: HTMLImageElement | null = document.getElementById(
    nombreCarta
  ) as HTMLImageElement;
  if (cartaJuego !== null) {
    cartaJuego.src =
      barajaSieteMediaCopas[partida.arrayValorNominal[cartasEnJuego] - 1].src;
    partida.puntuacion =
      partida.puntuacion +
      barajaSieteMediaCopas[partida.arrayValorNominal[cartasEnJuego] - 1]
        .valorJuego;
  }
  let nombreCartaBA = "cartaBA";
  nombreCartaBA =
    nombreCartaBA + (cartasEnBaraja + 1).toString().padStart(2, "0");
  let cartaBA: HTMLImageElement | null = document.getElementById(
    nombreCartaBA
  ) as HTMLImageElement;
  if (cartaBA !== null) {
    cartaBA.src = "";
  }
};

export const dameCarta = () => {
  partida.cartasEnJuego++;
  partida.cartasEnBaraja--;
  muestraCarta(partida.cartasEnJuego, partida.cartasEnBaraja);
  muestraPuntuacion();
  comprobarPuntuacion(partida.puntuacion);
  if (
    partida.puntuacion >= 7.5 &&
    botonCarta !== null &&
    botonPlantarse !== null
  ) {
    const estado: Estado = comprobarPuntuacion(partida.puntuacion);
    muestraMensajeComprobacion(estado);
    botonPlantarse.disabled = true;
    botonCarta.disabled = true;
  }
};

export const handleClickReset = () => {
  partida.cartasEnJuego = 0;
  partida.cartasEnBaraja = 9;
  if (
    botonInicio !== null &&
    botonCarta !== null &&
    botonPlantarse !== null &&
    botonReset !== null &&
    cartaBA01 !== null &&
    cartaBA02 !== null &&
    cartaBA03 !== null &&
    cartaBA04 !== null &&
    cartaBA05 !== null &&
    cartaBA06 !== null &&
    cartaBA07 !== null &&
    cartaBA08 !== null &&
    cartaBA09 !== null &&
    cartaInicio !== null &&
    cartaJuego01 !== null &&
    cartaJuego02 !== null &&
    cartaJuego03 !== null &&
    cartaJuego04 !== null &&
    cartaJuego05 !== null &&
    cartaJuego06 !== null &&
    cartaJuego07 !== null &&
    cartaJuego08 !== null &&
    cartaJuego09 !== null
  ) {
    cartaInicio.src = cartaBack.src;
    cartaBA01.src = cartaBack.src;
    cartaBA02.src = cartaBack.src;
    cartaBA03.src = cartaBack.src;
    cartaBA04.src = cartaBack.src;
    cartaBA05.src = cartaBack.src;
    cartaBA06.src = cartaBack.src;
    cartaBA07.src = cartaBack.src;
    cartaBA08.src = cartaBack.src;
    cartaBA09.src = cartaBack.src;
    cartaJuego01.src = "";
    cartaJuego02.src = "";
    cartaJuego03.src = "";
    cartaJuego04.src = "";
    cartaJuego05.src = "";
    cartaJuego06.src = "";
    cartaJuego07.src = "";
    cartaJuego08.src = "";
    cartaJuego09.src = "";
    partida.puntuacion = 0;
    muestraPuntuacion();
    botonInicio.disabled = false;
    botonCarta.disabled = true;
    botonPlantarse.disabled = true;
    botonReset.disabled = true;
    const estado: Estado = comprobarPuntuacion(partida.puntuacion);
    muestraMensajeComprobacion(estado);
  }
};

export const muestraMensajeComprobacion = (estado: Estado) => {
  let mensaje: string = "";
  switch (estado) {
    case "MENOR_4":
      mensaje = "Has sido demasiado conservador.";
      break;
    case "4_A_6":
      mensaje = "Te ha entrado el canguelo eh?";
      break;
    case "6_A_7":
      mensaje = "Casi casi...";
      break;
    case "7.5":
      mensaje = "¡Lo has clavado! ¡Enhorabuena!";
      break;
    case "GAME_OVER":
      mensaje = "Has perdido.";
      break;
    case "OK":
      mensaje = "La mejor opción era plantarse.";
      break;
    case "NO_OK":
      mensaje = `La mejor opción era pedir ${
        perfect(partida.arrayValorNominal)[1] - partida.cartasEnJuego - 1
      } carta${
        perfect(partida.arrayValorNominal)[1] - partida.cartasEnJuego - 1 > 1
          ? "s"
          : ""
      } más`;
      break;
    case "":
      mensaje = "";
      break;
    default:
      mensaje = "No se que ha pasado, pero no deberías estar aquí";
      break;
  }
  const elementoMensaje = document.getElementById("mensaje");
  if (elementoMensaje) {
    elementoMensaje.innerHTML = mensaje;
  } else {
    console.error(
      "muestraMensajeComprobacion: No se ha encontrado el elemento con id resultado"
    );
  }
};

export const handleClickPlantarse = () => {
  const estado: Estado = comprobarPuntuacion(partida.puntuacion);
  muestraMensajeComprobacion(estado);
  if (botonCarta !== null && botonPlantarse !== null) {
    botonPlantarse.disabled = true;
    botonCarta.disabled = true;
  }

  if (
    partida.puntuacion > 0 &&
    partida.puntuacion < 7.5 &&
    botonComprobar !== null
  ) {
    botonComprobar.disabled = false;
  }
};

export const handleClickComprobar = () => {
  const estado: Estado = comprobarResultado();
  muestraMensajeComprobacion(estado);
  if (estado === "NO_OK" && partida.puntuacion < 7.5 && botonCarta !== null) {
    botonCarta.disabled = false;
  }
  if (botonComprobar !== null) {
    botonComprobar.disabled = true;
  }
};

export const iniciarPartida = () => {
  partida.arrayValorNominal = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  partida.cartasEnBaraja = 9;
  partida.cartasEnJuego = 0;
  partida.numeroObjetivo = 7.5;
  partida.puntuacion = 0;
};
