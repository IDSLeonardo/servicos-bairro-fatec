import { rotas } from "./rotas/rotas.js";
import { renderizarMenu } from "./navbar/navbar.js"; // <--- Importamos a navbar aqui!
import erro from "./paginas/erro/erro.js";

function carregarPagina() {
  const app = document.getElementById("app");
  const hashAtual = window.location.hash || "#inicio";
  const rotaEncontrada = rotas.find((rota) => rota.url === hashAtual);

  if (rotaEncontrada) {
    rotaEncontrada.pagina(app);
  } else {
    // Rota inexistente (Tela 6)
    erro(app);
  }
}

// Quando o navegador escutar que a URL mudou
window.addEventListener("hashchange", carregarPagina);

// Quando a página carregar pela primeira vez
window.addEventListener("load", () => {
  renderizarMenu(); // Chama a função que importou da navbar
  carregarPagina();
});