// src/js/navbar/navbar.js (ou no ficheiro de navegação)

function renderizarNavbar(paginas) {
  const containerNavbar = document.querySelector("#navbar");
  if (!containerNavbar) return;

  // Filtra ignorando a rota de detalhe (e outras telas internas se necessário)
  const paginasMenu = paginas.filter(pagina => pagina.url !== "#detalhe");

  // Ou se preferir, exiba apenas páginas que tenham um ícone e label válidos:
  // const paginasMenu = paginas.filter(pagina => pagina.icon && pagina.label);

  containerNavbar.innerHTML = paginasMenu
    .map(
      (pagina) => `
        <a href="${pagina.url}" class="nav-item">
          ${pagina.icon}
          ${pagina.label ? `<span>${pagina.label}</span>` : ''}
        </a>
      `
    )
    .join("");
}