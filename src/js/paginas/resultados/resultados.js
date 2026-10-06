import "./resultados.css";
import { mockServicos } from "../../dadosMockados/servicos.js";

function obterTodosOsServicos() {
  const servicosCriados = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");
  return [...(mockServicos || []), ...servicosCriados];
}

function resultados(app) {
  // Resgata o termo de texto OU a categoria vinda da navegação
  const termoInicial = sessionStorage.getItem("termoBusca") || "";
  const categoriaInicial = sessionStorage.getItem("categoriaBusca") || "";

  // Define o texto do cabeçalho
  const textoDestaque = termoInicial || categoriaInicial || "Todos os serviços";

  app.innerHTML = `
    <div class="resultados-conteudo">
      <h2>Resultados</h2>
      <p>A procurar por: <strong id="termo-destaque" style="color: var(--cor-destaque, #009688);">${textoDestaque}</strong></p>

      <div class="filtros-container">
        <input 
          type="text" 
          id="input-busca" 
          placeholder="Buscar por título ou descrição..." 
          value="${termoInicial}"
        />
        <select id="select-categoria">
          <option value="">Todas as categorias</option>
          <option value="Elétrica">Elétrica</option>
          <option value="Hidráulica">Hidráulica</option>
          <option value="Montagem">Montagem</option>
          <option value="Reformas">Reformas</option>
          <option value="Limpeza">Limpeza</option>
          <option value="Transporte">Transporte</option>
          <option value="Beleza">Beleza</option>
          <option value="Diversos">Diversos</option>
        </select>
      </div>

      <div id="lista-resultados"></div>
    </div>
  `;

  const inputBusca = app.querySelector("#input-busca");
  const selectCategoria = app.querySelector("#select-categoria");
  const containerLista = app.querySelector("#lista-resultados");
  const termoDestaqueEl = app.querySelector("#termo-destaque");

  // Se veio uma categoria selecionada na sessão, ajusta o valor do <select>
  if (categoriaInicial && selectCategoria) {
    selectCategoria.value = categoriaInicial;
  }

  function filtrarERenderizar() {
    const listaDeServicos = obterTodosOsServicos();

    const termo = (inputBusca?.value || "").toLowerCase().trim();
    const categoriaSelecionada = (selectCategoria?.value || "").toLowerCase().trim();

    // Atualiza o texto do cabeçalho em tempo real ao interagir com os filtros
    if (termoDestaqueEl) {
      if (inputBusca?.value.trim()) {
        termoDestaqueEl.textContent = inputBusca.value.trim();
      } else if (selectCategoria?.value) {
        termoDestaqueEl.textContent = selectCategoria.value;
      } else {
        termoDestaqueEl.textContent = "Todos os serviços";
      }
    }

    const servicosFiltrados = listaDeServicos.filter((servico) => {
      const titulo = (servico.titulo || "").toLowerCase();
      const categoria = (servico.categoria || "").toLowerCase();
      const descricao = (servico.descricao || "").toLowerCase();

      const bateTermo = !termo || 
                        termo === "todos os serviços" || 
                        titulo.includes(termo) || 
                        descricao.includes(termo);

      const bateCategoria = !categoriaSelecionada || 
                            categoriaSelecionada === "todas as categorias" || 
                            categoria === categoriaSelecionada;

      return bateTermo && bateCategoria;
    });

    renderizarCards(servicosFiltrados);
  }

  function renderizarCards(lista) {
    if (!containerLista) return;

    if (lista.length === 0) {
      containerLista.innerHTML = `<p class="sem-resultados">Nenhum serviço encontrado para esta pesquisa.</p>`;
      return;
    }

    containerLista.innerHTML = lista
      .map(
        (servico, index) => `
        <div class="card-servico" data-index="${index}">
          <h3>${servico.titulo}</h3>
          <p><strong>Categoria:</strong> ${servico.categoria || 'Geral'} ${servico.bairro ? `| <strong>Bairro:</strong> ${servico.bairro}` : ''}</p>
          <p><strong>Preço:</strong> R$ ${servico.valor || servico.preco || 'A combinar'}</p>
          <p>${servico.descricao}</p>
        </div>
      `
      )
      .join("");

    const cards = containerLista.querySelectorAll(".card-servico");
    cards.forEach((card, index) => {
      card.addEventListener("click", () => {
        sessionStorage.setItem("servicoSelecionado", JSON.stringify(lista[index]));
        window.location.hash = "#detalhe";
      });
    });
  }

  // Registra eventos
  inputBusca?.addEventListener("input", filtrarERenderizar);
  selectCategoria?.addEventListener("change", filtrarERenderizar);

  // Executa o primeiro filtro
  filtrarERenderizar();

  // Limpa os dados temporários da sessão
  sessionStorage.removeItem("termoBusca");
  sessionStorage.removeItem("categoriaBusca");
}

export default {
  url: "#resultados",
  label: "",
  icon: "",
  pagina: resultados,
};