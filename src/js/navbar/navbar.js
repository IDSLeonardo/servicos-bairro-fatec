import { rotas } from "../rotas/rotas.js";

// Função responsável por desenhar a barra de navegação
export function renderizarMenu() {
  const nav = document.getElementById("menu");

  // Regra E2: O menu é gerado a partir da lista de rotas.
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