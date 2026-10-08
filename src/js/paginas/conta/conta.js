import "./conta.css";
import { entrar, sair, getUsuarioAtual } from "../../sessao/sessao.js";
import { mockServicos } from "../../dadosMockados/servicos.js";

function obterTodosOsServicos() {
  const servicosCriados = JSON.parse(localStorage.getItem("servicosCadastrados") || "[]");
  return [...(mockServicos || []), ...servicosCriados];
}

function conta(app) {
  const usuarioLogado = getUsuarioAtual();

  // ESTADO 1: Usuário NÃO está logado -> Exibe formulário de Login
  if (!usuarioLogado) {
    app.innerHTML = `
      <div class="conta-conteudo">
        <header class="conta-cabecalho">
          <h2>Acessar minha conta</h2>
          <p>Faça login para gerenciar os seus serviços cadastrados</p>
        </header>

        <form id="form-login" class="form-login">
          <div class="campo-grupo">
            <label for="login-email">E-mail</label>
            <input type="email" id="login-email" placeholder="seuemail@exemplo.com" required>
          </div>

          <div class="campo-grupo">
            <label for="login-senha">Senha</label>
            <input type="password" id="login-senha" placeholder="Sua senha" required>
          </div>

          <p id="mensagem-erro" class="mensagem-erro" style="display: none;"></p>

          <button type="submit" class="btn-entrar">Entrar</button>
        </form>
      </div>
    `;

    const formLogin = app.querySelector("#form-login");
    const msgErro = app.querySelector("#mensagem-erro");

    formLogin.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = app.querySelector("#login-email").value.trim();
      const senha = app.querySelector("#login-senha").value.trim();

      const resultado = entrar(email, senha);

      if (resultado.sucesso) {
        conta(app); // Recarrega a tela já no estado logado
      } else {
        msgErro.textContent = resultado.mensagem || "Credenciais inválidas.";
        msgErro.style.display = "block";
      }
    });

    return;
  }

  // ESTADO 2: Usuário ESTÁ logado -> Exibe Perfil e Serviços Publicados por ele
  const todosServicos = obterTodosOsServicos();

  // EXIGÊNCIA DO PROFESSOR: Filtra apenas os serviços do usuário logado usando .filter()
  const meusServicos = todosServicos.filter(
    (servico) => String(servico.usuarioId) === String(usuarioLogado.id)
  );

  app.innerHTML = `
    <div class="conta-conteudo">
      <header class="perfil-cabecalho">
        <div class="usuario-info">
          <h2>Olá, ${usuarioLogado.nome || 'Usuário'}!</h2>
          <p>${usuarioLogado.email}</p>
        </div>
        <button id="btn-sair" class="btn-sair">Sair da Conta</button>
      </header>

      <section class="meus-servicos-secao">
        <h3>Meus Serviços Publicados (${meusServicos.length})</h3>

        <div id="lista-meus-servicos" class="lista-meus-servicos">
          ${
            meusServicos.length === 0
              ? `<p class="sem-servicos">Você ainda não publicou nenhum serviço.</p>`
              : meusServicos
                  .map(
                    (servico) => `
                    <div class="card-meu-servico">
                      <div class="card-info">
                        <h4>${servico.titulo}</h4>
                        <p><strong>Categoria:</strong> ${servico.categoria || 'Geral'}</p>
                        <p><strong>Valor:</strong> R$ ${servico.valor || servico.preco || 'A combinar'}</p>
                      </div>
                    </div>
                  `
                  )
                  .join("")
          }
        </div>
      </section>
    </div>
  `;

  // Evento do Botão Sair (Logout)
  const btnSair = app.querySelector("#btn-sair");
  btnSair?.addEventListener("click", () => {
    sair();
    conta(app); // Recarrega a tela voltando para o formulário de login
  });
}

export default {
  url: "#conta",
  label: "Conta",
  icon: "<img src='/src/assets/icons/user.svg' alt='Conta'>",
  pagina: conta,
};