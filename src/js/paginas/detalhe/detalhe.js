import "./detalhe.css";

function detalhe(app) {
  // Resgata o serviço selecionado na página de resultados
  const servicoString = sessionStorage.getItem("servicoSelecionado");
  const servico = servicoString ? JSON.parse(servicoString) : null;

  // Se não houver serviço selecionado na sessão, exibe mensagem de aviso com botão de retorno
  if (!servico) {
    app.innerHTML = `
      <div class="detalhe-conteudo">
        <header class="detalhe-cabecalho">
          <h2>Detalhes do Serviço</h2>
        </header>
        <div class="detalhe-vazio">
          <p>Nenhum serviço foi selecionado.</p>
          <a href="#resultados" class="btn-voltar">Voltar para os Resultados</a>
        </div>
      </div>
    `;
    return;
  }

  // Tratamento do número de telefone/WhatsApp (remove caracteres não numéricos)
  const telefoneLimpo = (servico.telefone || servico.whatsapp || "")
    .toString()
    .replace(/\D/g, "");

  // Mensagem pré-formatada para o WhatsApp
  const mensagemWhatsApp = encodeURIComponent(
    `Olá! Vi o seu anúncio de "${servico.titulo}" no aplicativo Serviços do Bairro e gostaria de mais informações.`
  );

  // Link do WhatsApp (adiciona o DDI 55 do Brasil caso não possua)
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
          servico.nome
            ? `
          <div class="detalhe-secao">
            <span class="detalhe-rotulo">Anunciado por:</span>
            <span class="detalhe-texto">${servico.nome}</span>
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
  exibirNaNavbar: false, // Flag de controlo
  pagina: detalhe,
};