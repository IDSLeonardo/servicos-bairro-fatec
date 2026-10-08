import "./detalhe.css";
import { mockServicos } from "/src/js/dadosMockados/servicos.js";

function obterTodosOsServicos() {
  const servicosCriados = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");
  return [...(mockServicos || []), ...servicosCriados];
}

function detalhe(app) {
  // 1. Resgata o ID salvo pela tela de Resultados no sessionStorage
  const idSelecionado = sessionStorage.getItem("servicoIdSelecionado");

  // 2. Busca todos os serviços e utiliza .find() pelo ID (Critério do professor)
  const todosServicos = obterTodosOsServicos();
  const servico = todosServicos.find(s => String(s.id) === String(idSelecionado));

  // 3. Caso o serviço não exista ou o ID esteja inválido
  if (!servico) {
    app.innerHTML = `
      <div class="detalhe-conteudo">
        <h2>Serviço não encontrado!</h2>
        <p>Não foi possível carregar as informações deste serviço.</p>
        <a href="#resultados" class="btn-voltar">← Voltar para resultados</a>
      </div>
    `;
    return;
  }

  // 4. Tratamento de compatibilidade entre mockServicos e formulário de cadastro
  const numeroContato = servico.numeroContato || servico.contato || servico.telefone || "";
  const valorExibicao = servico.valor || servico.preco || 'A combinar';
  const apenasNumeros = numeroContato.replace(/\D/g, "");

  // 5. Renderização do layout
  app.innerHTML = `
    <div class="detalhe-conteudo">
      <h2>${servico.titulo}</h2>
      
      <p class="categoria">
        <strong>Categoria:</strong> ${servico.categoria || 'Geral'} 
        ${servico.bairro ? `| <strong>Bairro:</strong> ${servico.bairro}` : ''}
      </p>

      <p class="preco">
        <strong>Valor:</strong> R$ ${valorExibicao}
      </p>

      <div class="descricao">
        <strong>DESCRIÇÃO:</strong>
        <p>${servico.descricao || 'Sem descrição informada.'}</p>
      </div>

      <div class="secao-contato">
        <p><strong>Telefone / WhatsApp:</strong> ${numeroContato || 'Não informado'}</p>

        ${
          apenasNumeros 
            ? `
              <a 
                href="https://wa.me/55${apenasNumeros}?text=Olá!\%20Vi\%20seu\%20anúncio\%20de\%20'${encodeURIComponent(servico.titulo)}'%20no%20Serviços%20do%20Bairro%20e%20gostaria%20de%20mais%20informações." 
                target="_blank" 
                rel="noopener noreferrer" 
                class="btn-contato btn-whatsapp"
              >
                <img src="/src/assets/icons/zap.svg" alt="" class="icone-btn">
                Conversar no WhatsApp
              </a>
            `
            : `
              <button class="btn-contato btn-desabilitado" disabled>
                Contato não informado pelo anunciante
              </button>
            `
        }
      </div>

      <a href="#resultados" class="btn-voltar">← Voltar para resultados</a>
    </div>
  `;
}

export default {
  url: "#detalhe",
  label: "",
  icon: "",
  pagina: detalhe
};