import "./publicar.css";
import { getUsuarioAtual } from "/src/js/sessao/sessao.js";

function publicar(app) {
  const usuarioLogado = getUsuarioAtual();

  // 1. BLOQUEIO: Se NÃO estiver logado, exibe tela de aviso e redirecionamento
  if (!usuarioLogado) {
    app.innerHTML = `
      <div class="publicar-conteudo">
        <header class="publicar-cabecalho">
          <h2>Publicar Serviço</h2>
          <p>Acesso Restrito</p>
        </header>

        <div class="bloqueio-container" style="text-align: center; margin-top: 32px; padding: 20px;">
          <p style="font-size: 1.05rem; color: #555; margin-bottom: 20px;">
            Você precisa estar logado para cadastrar e publicar um novo serviço.
          </p>
          <a href="#conta" class="btn-publicar" style="display: inline-block; text-decoration: none; padding: 12px 24px; width: auto;">
            Fazer Login / Criar Conta
          </a>
        </div>
      </div>
    `;
    return;
  }

  // 2. PERMISSÃO: Se ESTIVER logado, renderiza o formulário normalmente
  app.innerHTML = `
    <div class="publicar-conteudo">
      <header class="publicar-cabecalho">
        <h2>Publicar Serviço</h2>
        <p>Cadastre um novo serviço para os moradores do bairro</p>
      </header>

      <form id="form-publicar" class="form-publicar">
        <div class="campo-grupo">
          <label for="titulo">Título do Serviço</label>
          <input type="text" id="titulo" placeholder="Ex: Reparo elétrico residencial" required>
        </div>

        <div class="campo-grupo">
          <label for="categoria">Categoria</label>
          <select id="categoria" required>
            <option value="">Selecione uma categoria</option>
            <option value="Elétrica">Elétrica</option>
            <option value="Aulas">Aulas</option>
            <option value="Montagem">Montagem</option>
            <option value="Reformas">Reformas</option>
            <option value="Limpeza">Limpeza</option>
            <option value="Transporte">Transporte</option>
            <option value="Beleza">Beleza</option>
            <option value="Diversos">Diversos</option>
          </select>
        </div>

        <div class="campo-grupo">
          <label for="valor">Valor (R$)</label>
          <input type="text" id="valor" placeholder="Ex: 150,00 ou A combinar" required>
        </div>

        <div class="campo-grupo">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" rows="4" placeholder="Descreva os detalhes do serviço que você oferece..." required></textarea>
        </div>

        <div class="campo-grupo">
          <label for="contato">Telefone / WhatsApp</label>
          <input type="tel" id="contato" placeholder="(11) 99999-9999" required>
        </div>

        <button type="submit" class="btn-publicar">Publicar Anúncio</button>
      </form>
    </div>
  `;

  adicionarEventoPublicar();
}

function adicionarEventoPublicar() {
  const formPublicar = document.getElementById("form-publicar");

  if (!formPublicar) return;

  formPublicar.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Re-validação de segurança antes do envio
    const usuarioLogado = getUsuarioAtual();
    if (!usuarioLogado) {
      alert("Você precisa estar logado para publicar um serviço!");
      window.location.hash = "#conta";
      return;
    }

    const tituloDigitado = document.getElementById("titulo").value.trim();
    const categoriaDigitada = document.getElementById("categoria").value;
    const valorDigitado = document.getElementById("valor").value.trim();
    const descricaoDigitada = document.getElementById("descricao").value.trim();
    const contatoDigitado = document.getElementById("contato").value.trim();

    const novoServico = {
      id: Date.now(),
      usuarioId: usuarioLogado.id, // Vincula com segurança ao ID do usuário autenticado
      titulo: tituloDigitado,
      categoria: categoriaDigitada,
      valor: valorDigitado,
      descricao: descricaoDigitada,
      contato: contatoDigitado,
      dataCriacao: new Date().toLocaleDateString("pt-BR")
    };

    const servicosAtuais = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");

    // Validação com .find() para recusar duplicados
    const servicoExistente = servicosAtuais.find((servico) => {
      if (!servico || !servico.titulo) return false;
      return servico.titulo.trim().toLowerCase() === novoServico.titulo.toLowerCase();
    });

    if (servicoExistente) {
      alert(`O serviço "${novoServico.titulo}" já está cadastrado! Escolha outro título.`);
      return;
    }

    servicosAtuais.push(novoServico);
    localStorage.setItem("servicosCadastrados", JSON.stringify(servicosAtuais));

    alert("Serviço publicado com sucesso!");
    window.location.hash = "#inicio";
  });
}

export default {
  url: "#publicar",
  label: "Publicar",
  icon: "<img src='/src/assets/icons/plus.svg' alt='Publicar'>",
  pagina: publicar
};