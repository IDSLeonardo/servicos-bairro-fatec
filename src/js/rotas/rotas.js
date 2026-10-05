import inicio from "../paginas/inicio/inicio.js";
import resultados from "../paginas/resultados/resultados.js";

export const rotas = [
  inicio,
  resultados,
  {
    url: "#detalhe",
    label: "",
    icon: "",
    pagina: (app) => (app.innerHTML = "<h1>Detalhe do Serviço</h1>"),
  },
  {
    url: "#publicar",
    label: "Publicar",
    icon: "<img src='./src/assets/icons/plus.svg'>",
    pagina: (app) => (app.innerHTML = "<h1>Novo Serviço</h1>"),
  },
  {
    url: "#favoritos",
    label: "Favoritos",
    icon: "<img src='./src/assets/icons/heart.svg'>",
    pagina: (app) => (app.innerHTML = "<h1>Meus Favoritos</h1>"),
  },
  {
    url: "#conta",
    label: "Minha Conta",
    icon: "<img src='./src/assets/icons/user.svg'>",
    pagina: (app) => (app.innerHTML = "<h1>Minha Conta</h1>"),
  },
];
