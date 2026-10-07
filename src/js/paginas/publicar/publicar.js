import { mockServicos } from "../../dadosMockados/servicos.js";
import { getUsuarioAtual } from "../../sessao/sessao.js";
import "./publicar.css";

// Combina os registros de exemplo com os que estão salvos no navegador.
function obterTodosOsServicos() {
  const servicosCadastrados = JSON.parse(
    localStorage.getItem("servicosCadastrados") || "[]",
  );

  return [...mockServicos, ...servicosCadastrados];
}

function publicar(app) {
  // Só permite exibir o formulário quando há uma pessoa autenticada.
  const usuarioAtual = getUsuarioAtual();

  if (!usuarioAtual) {
    app.innerHTML = `
      <section class="publicar-conteudo">
        <header class="publicar-cabecalho">
          <h1>Publicar serviço</h1>
        </header>
        <p>Entre na sua conta para publicar um serviço.</p>
        <a class="publicar-botao" href="#conta">Ir para Minha Conta</a>
      </section>
    `;
    return;
  }

  app.innerHTML = `
    <section class="publicar-conteudo">
      <header class="publicar-cabecalho">
        <h1>Publicar serviço</h1>
        <p>Informe os dados do serviço e a região atendida.</p>
      </header>

      <form class="form-publicar" id="form-publicar">
        <div class="campo-grupo">
          <label for="titulo">Título do serviço</label>
          <input id="titulo" name="titulo" type="text" minlength="3" maxlength="60" required>
        </div>

        <div class="campo-grupo">
          <label for="categoria">Categoria</label>
          <select id="categoria" name="categoria" required>
            <option value="">Selecione uma categoria</option>
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

        <div class="campo-grupo">
          <label for="preco">Valor do serviço (R$)</label>
          <input id="preco" name="preco" type="number" min="0.01" max="1000000" step="0.01" required>
        </div>

        <div class="campo-grupo">
          <label for="bairro">Bairro ou área atendida</label>
          <input id="bairro" name="bairro" type="text" minlength="3" maxlength="80" required>
        </div>

        <div class="campo-grupo">
          <label for="distancia">Distância de referência (m)</label>
          <input id="distancia" name="distancia" type="number" min="0" max="100000" step="1" required>
        </div>

        <div class="campo-grupo">
          <label for="descricao">Descrição</label>
          <textarea id="descricao" name="descricao" minlength="10" maxlength="300" rows="4" required></textarea>
        </div>

        <div class="campo-grupo">
          <label for="telefone">Telefone ou WhatsApp</label>
          <input id="telefone" name="telefone" type="tel" minlength="10" maxlength="16" pattern="[0-9() +.-]{10,16}" required>
        </div>

        <button class="publicar-botao" type="submit">Publicar serviço</button>
        <p class="publicar-aviso" id="publicar-aviso" aria-live="polite"></p>
      </form>
    </section>
  `;

  const formulario = document.getElementById("form-publicar");
  formulario.addEventListener("submit", (evento) => {
    // Evita o recarregamento da página e deixa o JavaScript tratar o envio.
    evento.preventDefault();

    // FormData lê os campos pelos atributos name definidos no HTML.
    const dadosFormulario = new FormData(formulario);
    const titulo = dadosFormulario.get("titulo").trim();
    const categoria = dadosFormulario.get("categoria");
    const bairro = dadosFormulario.get("bairro").trim();
    const distancia = Number(dadosFormulario.get("distancia"));
    const descricao = dadosFormulario.get("descricao").trim();
    const telefone = dadosFormulario.get("telefone").trim();
    const preco = Number(dadosFormulario.get("preco"));

    // Critério de duplicidade: mesmo título, publicador e categoria.
    // A comparação ignora maiúsculas/minúsculas e espaços nas pontas.
    const servicoRepetido = obterTodosOsServicos().find(
      (servico) =>
        normalizarTexto(servico.titulo) === normalizarTexto(titulo) &&
        String(servico.prestadorId) === String(usuarioAtual.id) &&
        normalizarTexto(servico.categoria) === normalizarTexto(categoria),
    );

    const aviso = document.getElementById("publicar-aviso");
    if (servicoRepetido) {
      // Informa a duplicidade e interrompe o cadastro.
      aviso.textContent = "Você já publicou esse serviço nesta categoria.";
      aviso.classList.add("publicar-aviso--erro");
      return;
    }

    // Usa o horário atual como base e incrementa até encontrar um ID livre.
    let idNovo = Date.now();
    while (obterTodosOsServicos().find((servico) => String(servico.id) === String(idNovo))) {
      idNovo += 1;
    }

    // Associa o novo serviço ao usuário logado e aos valores do formulário.
    const servicoNovo = {
      id: idNovo,
      prestadorId: usuarioAtual.id,
      titulo,
      categoria,
      preco,
      bairro,
      distancia,
      descricao,
      telefone,
    };

    // Atualiza os dados em memória e deixa uma cópia temporária para o Detalhe.
    mockServicos.push(servicoNovo);
    sessionStorage.setItem("servicoRecemPublicado", JSON.stringify(servicoNovo));

    const avisoDetalhe = document.getElementById("publicar-aviso");
    avisoDetalhe.classList.remove("publicar-aviso--erro");
    avisoDetalhe.innerHTML = `Serviço publicado. <a href="/?id=${encodeURIComponent(idNovo)}#detalhe">Ver detalhe</a>`;
  });
}

function normalizarTexto(texto) {
  // Padroniza textos para comparar títulos e categorias sem diferenças de caixa.
  return String(texto || "").trim().toLocaleLowerCase("pt-BR");
}

export default {
  url: "#publicar",
  label: "Publicar",
  icon: "<img src='/src/assets/icons/plus.svg' alt='Publicar'>",
  pagina: publicar,
};
