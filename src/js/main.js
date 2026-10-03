// Importamos a lista de rotas que você acabou de criar
import { rotas } from "./rotas/rotas.js";

// Função que renderiza o menu
function renderizarMenu() {
  const nav = document.getElementById("menu");

  // Regra E2: O menu é gerado a partir da lista de rotas.
  // Usamos filter para pegar somente as rotas que tem nome (label != ""), ignorando a tela de detalhe.
  const itensMenu = rotas
    .filter((rota) => rota.label !== "")
    .map(
      (rota) =>
        `<a href="${rota.url}" class="nav-link">
                    <span class="nav-icon">${rota.icon}</span>
                    <span class="nav-texto">${rota.label}</span>
                </a>`,
    )
    .join(""); // Regra do professor de terminar os maps com join("")

  nav.innerHTML = `<div class="navbar">${itensMenu}</div>`;
}

// Função que decide o que aparece na tela principal
function carregarPagina() {
  const app = document.getElementById("app");
  const hashAtual = window.location.hash || "#inicio";
  const rotaEncontrada = rotas.find((rota) => rota.url === hashAtual);

  if (rotaEncontrada) {
    // Padrão do professor: Executa a página passando a div app
    rotaEncontrada.pagina(app);
  } else {
    // Rota inexistente (Tela 6)
    app.innerHTML = `
            <div style="text-align: center; margin-top: var(--espaco-grande);">
                <h1 style="color: var(--cor-texto-principal);">Ops! 404</h1>
                <p style="color: var(--cor-texto-secundario); margin-bottom: var(--espaco-medio);">Esta página não existe.</p>
                <a href="#inicio" style="color: var(--cor-destaque); font-weight: bold; text-decoration: none;">Voltar para o Início</a>
            </div>
        `;
  }
}

// Quando o navegador "escutar" que a URL mudou (hashchange), ele roda a função carregarPagina
window.addEventListener("hashchange", carregarPagina);

// Quando a página carregar pela primeira vez, roda o menu e a página atual
window.addEventListener("load", () => {
  renderizarMenu();
  carregarPagina();
});
