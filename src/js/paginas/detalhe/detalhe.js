import { mockServicos, mockUsuarios } from "../../dadosMockados/servicos.js";
import "./detalhe.css";

// Junta os serviços de exemplo com os que possam estar salvos no navegador.
function obterServicos() {
  const servicosCadastrados = JSON.parse(
    localStorage.getItem("servicosCadastrados") || "[]",
  );

  return [...mockServicos, ...servicosCadastrados];
}

function detalhe(app) {
  // Lê o ID do serviço e o termo de busca enviados como parâmetros da URL.
  const parametros = new URLSearchParams(window.location.search);
  const idUrl = parametros.get("id");
  const termoBusca = parametros.get("termo");
  // Recupera o último serviço publicado. A sessão permite levá-lo até esta tela.
  const registroRecente = sessionStorage.getItem("servicoRecemPublicado");

  if (registroRecente) {
    const servicoRecente = JSON.parse(registroRecente);
    // Evita inserir o mesmo serviço novamente no array de dados mockados.
    const idRecenteExiste = mockServicos.find(
      (servico) => String(servico.id) === String(servicoRecente.id),
    );

    if (!idRecenteExiste) {
      mockServicos.push(servicoRecente);
    }

    if (String(servicoRecente.id) === String(idUrl)) {
      sessionStorage.removeItem("servicoRecemPublicado");
    }
  }

  // Se a URL não trouxe um ID, tenta usar o serviço selecionado na tela anterior.
  const servicoSelecionadoTexto = sessionStorage.getItem("servicoSelecionado");
  const servicoSelecionado = servicoSelecionadoTexto
    ? JSON.parse(servicoSelecionadoTexto)
    : null;
  const idServico = idUrl || (servicoSelecionado ? servicoSelecionado.id : null);
  // Procura o serviço pelo ID. O find devolve o primeiro registro correspondente,
  // ou undefined se nenhum serviço tiver esse ID.
  const servicoEncontrado = obterServicos().find(
    (servico) => String(servico.id) === String(idServico),
  );

  sessionStorage.removeItem("servicoSelecionado");

  if (!servicoEncontrado) {
    // Trata o ID inválido sem acessar propriedades de um valor undefined.
    app.innerHTML = `
      <section class="detalhe-conteudo">
        <header class="detalhe-cabecalho">
          <h1>Serviço não encontrado</h1>
        </header>
        <p>Não encontramos um serviço com esse identificador.</p>
        <a class="detalhe-botao" href="#resultados" id="link-resultados">
          Voltar para os resultados
        </a>
        <a class="detalhe-link-inicio" href="#inicio">Ir para o início</a>
      </section>
    `;

    prepararVolta(termoBusca);
    return;
  }

  // O serviço guarda o ID do prestador; este find recupera os dados da pessoa.
  const publicador = mockUsuarios.find(
    (usuario) => String(usuario.id) === String(servicoEncontrado.prestadorId),
  );
  // Converte os valores para formatos amigáveis antes de montar o HTML.
  const distancia = Number(servicoEncontrado.distancia);
  const distanciaFormatada = Number.isFinite(distancia)
    ? `${(distancia / 1000).toLocaleString("pt-BR")} km`
    : "Não informada";
  const preco = Number(servicoEncontrado.preco);
  const precoFormatado = Number.isFinite(preco)
    ? preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
    : `R$ ${servicoEncontrado.preco || "A combinar"}`;
  // Remove símbolos do telefone para criar um endereço aceito pelo WhatsApp.
  const telefone = servicoEncontrado.telefone || servicoEncontrado.whatsapp || "";
  const telefoneLimpo = String(telefone).replace(/\D/g, "");
  const linkWhatsApp = telefoneLimpo
    ? `https://wa.me/${telefoneLimpo.length <= 11 ? `55${telefoneLimpo}` : telefoneLimpo}`
    : "";

  // Monta a tela com os dados encontrados e alternativas para campos ausentes.
  app.innerHTML = `
    <section class="detalhe-conteudo">
      <header class="detalhe-cabecalho">
        <p class="detalhe-categoria">${servicoEncontrado.categoria || "Geral"}</p>
        <h1>${servicoEncontrado.titulo}</h1>
      </header>

      <article class="detalhe-card">
        <section class="detalhe-secao">
          <h2>Área de atendimento</h2>
          <p>${servicoEncontrado.bairro || servicoEncontrado.areaAtendimento || "Não informada"}</p>
        </section>

        <section class="detalhe-secao">
          <h2>Descrição</h2>
          <p>${servicoEncontrado.descricao || "Sem descrição informada."}</p>
        </section>

        <section class="detalhe-secao">
          <h2>Valor</h2>
          <p><strong>${precoFormatado}</strong></p>
        </section>

        <section class="detalhe-secao">
          <h2>Distância</h2>
          <p>${distanciaFormatada}</p>
        </section>

        <section class="detalhe-secao">
          <h2>Publicado por</h2>
          <p>${publicador ? publicador.nome : "Publicador não informado."}</p>
        </section>
      </article>

      <nav class="detalhe-acoes">
        ${linkWhatsApp
          ? `<a class="detalhe-botao" href="${linkWhatsApp}" target="_blank" rel="noopener noreferrer">Contactar via WhatsApp</a>`
          : ""}
        <a class="detalhe-botao detalhe-botao-secundario" href="#resultados" id="link-resultados">
          Voltar para os resultados
        </a>
      </nav>
    </section>
  `;

  prepararVolta(termoBusca);
}

function prepararVolta(termoBusca) {
  const linkResultados = document.getElementById("link-resultados");

  if (termoBusca && linkResultados) {
    // Guarda o termo para que Resultados possa restaurar a busca ao voltar.
    linkResultados.addEventListener("click", () => {
      sessionStorage.setItem("termoBusca", termoBusca);
    });
  }
}

export default {
  url: "#detalhe",
  label: "",
  icon: "",
  pagina: detalhe,
};
