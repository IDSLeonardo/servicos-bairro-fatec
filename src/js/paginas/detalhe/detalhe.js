import "./detalhe.css";
import { mockServicos } from "/src/js/dadosMockados/servicos.js";

function obterTodosOsServicos() {
  const servicosCriados = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");
  return [...(mockServicos || []), ...servicosCriados];
}

function detalhe(app) {
  // 1. Resgata o ID selecionado
  const idSelecionado = sessionStorage.getItem("servicoIdSelecionado");

  // 2. Busca a lista completa e localiza com .find()
  const todosServicos = obterTodosOsServicos();
  const servico = todosServicos.find(s => String(s.id) === String(idSelecionado));

  // 3. Caso não encontre o serviço
  if (!servico) {
    app.innerHTML = `
      <div class="detalhe-conteudo">
        <h2>Serviço não encontrado!</h2>
        <a href="#resultados" class="btn-voltar">← Voltar para resultados</a>
      </div>
    `;
    return;
  }

  // 4. Tratamento do telefone / WhatsApp
  const numeroContato = servico.contato || servico.telefone || "";
  const apenasNumeros = numeroContato.replace(/\D/g, "");

  // Renderização da página
  app.innerHTML = `
    <div class="detalhe-conteudo">
      <h2>${servico.titulo}</h2>
      
      <p class="categoria"><strong>Categoria:</strong> ${servico.categoria || 'Geral'}</p>
      <p class="preco"><strong>Valor:</strong> R$ ${servico.valor || servico.preco || 'A combinar'}</p>

      <div class="descricao">
        <strong>DESCRIÇÃO:</strong>
        <p>${servico.descricao || 'Sem descrição cadastrada.'}</p>
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
                Entrar em Contato (WhatsApp)
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