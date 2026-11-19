import { rotas } from "./rotas/rotas.js";
import { renderizarMenu } from "./navbar/navbar.js"; // <--- Importamos a navbar aqui!

function carregarPagina() {
  const app = document.getElementById("app");
  const hashAtual = window.location.hash || "#inicio";
  const base = hashAtual.split(/[/?]/)[0]; // "#detalhe/5" vira "#detalhe"
  const rotaEncontrada = rotas.find((rota) => rota.url === base);

  if (rotaEncontrada) {
    rotaEncontrada.pagina(app);
  } else {
    // Rota inexistente (Tela 6): usa a rota #erro dentro da propria lista de rotas
    rotas.find((rota) => rota.url === "#erro")?.pagina(app);
  }
}

// Quando o navegador escutar que a URL mudou
window.addEventListener("hashchange", carregarPagina);

// Quando a página carregar pela primeira vez
window.addEventListener("load", () => {
  renderizarMenu(); // Chama a função que importou da navbar
  carregarPagina();
});