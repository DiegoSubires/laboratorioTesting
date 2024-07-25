import {
  handleClickInicio,
  dameCarta,
  handleClickReset,
  handleClickPlantarse,
  handleClickComprobar,
  iniciarPartida,
} from "./ui";
import {
  botonInicio,
  botonCarta,
  botonPlantarse,
  botonComprobar,
  botonReset,
} from "./ui.baraja";

document.addEventListener("DOMContentLoaded", iniciarPartida);

botonInicio?.addEventListener("click", handleClickInicio);
botonCarta?.addEventListener("click", dameCarta);
botonPlantarse?.addEventListener("click", handleClickPlantarse);
botonComprobar?.addEventListener("click", handleClickComprobar);
botonReset?.addEventListener("click", handleClickReset);
