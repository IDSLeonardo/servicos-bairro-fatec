function resultados(app) {
  // Tenta puxar a palavra que o início guardou. Se não tiver nada, fica vazio.
  const termoBuscado = sessionStorage.getItem("termoBusca");

  app.innerHTML = `
        <div style="padding-top: var(--espaco-grande);">
            <h2>Resultados</h2>
            <p>A procurar por: <strong style="color: var(--cor-destaque);">${termoBuscado ? termoBuscado : "Todos os serviços"}</strong></p>
        </div>
    `;

  // Limpamos a memória, se  clicar em "Resultados" no menu, mostre "Todos os serviços"
  sessionStorage.removeItem("termoBusca");
}

export default {
  url: "#resultados",
  label: "Resultados",
  icon: "<img src='./src/assets/icons/search.svg'>",
  pagina: resultados,
};
