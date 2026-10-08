import "./detalhe.css";

function detalhe(app) {
  // 1. Resgata apenas o ID do serviço selecionado na sessão
  const servicoId = sessionStorage.getItem("servicoIdSelecionado");

  // 2. Obtém os serviços do localStorage (ou array vazio se ainda não houver nenhum)
  const servicosGuardados = localStorage.getItem("servicos") || localStorage.getItem("listaServicos");
  const listaServicos = servicosGuardados ? JSON.parse(servicosGuardados) : [];

  // 3. EXIGÊNCIA DO PROFESSOR: Procura o serviço na lista utilizando o .find() pelo ID
  const servico = listaServicos.find(
    (item) => String(item.id) === String(servicoId)
  );

  // Se não encontrar o serviço
  if (!servico) {
    app.innerHTML = `
      <div class="detalhe-conteudo">
        <header class="detalhe-cabecalho">
          <h2>Detalhes do Serviço</h2>
        </header>
        <div class="detalhe-vazio">
          <p>Nenhum serviço foi encontrado para este ID.</p>
          <a href="#resultados" class="btn-voltar">Voltar para os Resultados</a>
        </div>
      </div>
    `;
    return;
  }

  // Tratamento do número de telefone/WhatsApp
  const telefoneLimpo = (servico.telefone || servico.whatsapp || servico.contato || "")
    .toString()
    .replace(/\D/g, "");

  // Mensagem pré-formatada para o WhatsApp
  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Vi o seu anúncio de "${servico.titulo}" no aplicativo Serviços do Bairro e gostaria de mais informações.`
  );

  // Link do WhatsApp
  const linkWhatsApp = telefoneLimpo
    ? `https://wa.me/${telefoneLimpo.length <= 11 ? '55' + telefoneLimpo : telefoneLimpo}?text=${mensagemWhatsApp}`
    : "#";

  app.innerHTML = `
    <div class="detalhe-conteudo">
      <header class="detalhe-cabecalho">
        <button id="btn-voltar-topo" class="btn-icone-voltar" title="Voltar">
          ← Voltar
        </button>
        <h2>${servico.titulo}</h2>
      </header>

      <main class="detalhe-card">
        <div class="detalhe-badge-categoria">
          ${servico.categoria || "Geral"}
        </div>

        <div class="detalhe-secao">
          <span class="detalhe-rotulo">Preço / Valor:</span>
          <span class="detalhe-preco">R$ ${servico.valor || servico.preco || "A combinar"}</span>
        </div>

        ${
          servico.bairro
            ? `
          <div class="detalhe-secao">
            <span class="detalhe-rotulo">Localização / Bairro:</span>
            <span class="detalhe-texto">${servico.bairro}</span>
          </div>
        `
            : ""
        }

        <div class="detalhe-secao">
          <span class="detalhe-rotulo">Descrição do Serviço:</span>
          <p class="detalhe-descricao">${servico.descricao || "Sem descrição informada."}</p>
        </div>

        ${
          servico.nome || servico.nomePrestador
            ? `
          <div class="detalhe-secao">
            <span class="detalhe-rotulo">Anunciado por:</span>
            <span class="detalhe-texto">${servico.nome || servico.nomePrestador}</span>
          </div>
        `
            : ""
        }

        <div class="detalhe-acoes">
          ${
            telefoneLimpo
              ? `
            <a 
              href="${linkWhatsApp}" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn-whatsapp"
            >
              Contactar via WhatsApp
            </a>
          `
              : `
            <button class="btn-whatsapp desabilitado" disabled>
              Telefone não informado
            </button>
          `
          }
          
          <a href="#resultados" class="btn-secundario-voltar">
            Ver outros serviços
          </a>
        </div>
      </main>
    </div>
  `;

  // Adiciona evento ao botão de voltar no topo
  const btnVoltarTopo = app.querySelector("#btn-voltar-topo");
  btnVoltarTopo?.addEventListener("click", () => {
    window.location.hash = "#resultados";
  });
}

export default {
  url: "#detalhe",
  label: "",
  icon: "",
  exibirNaNavbar: false,
  pagina: detalhe,
};