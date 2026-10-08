import inicio from "../paginas/inicio/inicio.js";
import resultados from "../paginas/resultados/resultados.js";
import conta from "../paginas/conta/conta.js";
import publicar from "../paginas/publicar/publicar.js";
import detalhe from "../paginas/detalhe/detalhe.js";

const eModoProfissional = () => localStorage.getItem('modoProfissional') === 'true';

export const rotas = [
  inicio,
  resultados,
  detalhe,
  {
    url: "#publicar",
    label: eModoProfissional() ? "Publicar" : "",
    icon: eModoProfissional() ? "<img src='/src/assets/icons/plus.svg'>" : "",
    pagina: (app) => {
      if (!eModoProfissional()) {
        window.location.hash = "#inicio";
        return;
      }
      publicar.pagina(app);
    },
  },
  conta
];