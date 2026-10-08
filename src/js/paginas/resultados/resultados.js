import "./resultados.css";
import { mockServicos } from "../../dadosMockados/servicos.js";

function obterTodosOsServicos() {
  const servicosCriados = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");
  return [...(mockServicos || []), ...servicosCriados];
}

// Auxiliar para converter o valor do serviço em número para ordenação correta
function extrairValorNumerico(servico) {
  const val = servico.valor || servico.preco;
  if (!val) return Number.MAX_VALUE;
  if (typeof val === "number") return val;

  // Extrai apenas números e ponto/vírgula, convertendo vírgula para ponto
  const limpo = String(val).replace(/[^\d,.]/g, "").replace(",", ".");
  const numero = parseFloat(limpo);
  return isNaN(numero) ? Number.MAX_VALUE : numero;
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

        <select id="select-ordenar">
          <option value="alfabetica-asc">Nome (A - Z)</option>
          <option value="alfabetica-desc">Nome (Z - A)</option>
          <option value="preco-asc">Preço (Menor para Maior)</option>
          <option value="preco-desc">Preço (Maior para Menor)</option>
        </select>
      </div>

      <div id="lista-resultados"></div>
    </div>
  `;

  const inputBusca = app.querySelector("#input-busca");
  const selectCategoria = app.querySelector("#select-categoria");
  const selectOrdenar = app.querySelector("#select-ordenar");
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
    const criterioOrdenacao = selectOrdenar?.value || "alfabetica-asc";

    // Atualiza o texto do cabeçalho em tempo real
    if (termoDestaqueEl) {
      if (inputBusca?.value.trim()) {
        termoDestaqueEl.textContent = inputBusca.value.trim();
      } else if (selectCategoria?.value) {
        termoDestaqueEl.textContent = selectCategoria.value;
      } else {
        termoDestaqueEl.textContent = "Todos os serviços";
      }
    }

    // 1. Filtragem
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

    // 2. Ordenação (Aplica os critérios selecionados)
    servicosFiltrados.sort((a, b) => {
      switch (criterioOrdenacao) {
        case "alfabetica-asc":
          return (a.titulo || "").localeCompare(b.titulo || "", "pt-BR", { sensitivity: "base" });
        case "alfabetica-desc":
          return (b.titulo || "").localeCompare(a.titulo || "", "pt-BR", { sensitivity: "base" });
        case "preco-asc":
          return extrairValorNumerico(a) - extrairValorNumerico(b);
        case "preco-desc":
          return extrairValorNumerico(b) - extrairValorNumerico(a);
        default:
          return 0;
      }
    });

    // 3. Renderização
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
        // Salva APENAS o ID do serviço
        sessionStorage.setItem("servicoIdSelecionado", lista[index].id);
        window.location.hash = "#detalhe";
  });
});
}
  // Registra os eventos de escuta nos filtros
  inputBusca?.addEventListener("input", filtrarERenderizar);
  selectCategoria?.addEventListener("change", filtrarERenderizar);
  selectOrdenar?.addEventListener("change", filtrarERenderizar);

  // Executa a primeira filtragem e ordenação
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