import './conta.css';
import userIcon from '/src/assets/icons/user.svg';

function conta(app) {
    const modoProfissional = localStorage.getItem('modoProfissional') === 'true';

    app.innerHTML = `
        <div class="conta-conteudo">
            <header class="perfil-cabecalho">
                <div class="perfil-avatar">
                    <img src="${userIcon}" alt="Perfil" style="filter: invert(1); width: 40px;">
                </div>
                <h2>Usuário Convidado</h2>
                <p>Membro do bairro</p>
            </header>

            <section class="configuracoes">
                <div class="cartao-configuracao">
                    <div>
                        <h3>Modo Prestador</h3>
                        <p style="font-size: 12px; color: var(--cor-texto-secundario);">Ative para publicar serviços</p>
                    </div>
                    <button 
                        id="btn-modo-prof" 
                        class="btn-toggle ${modoProfissional ? 'ativo' : 'inativo'}"
                        aria-pressed="${modoProfissional}"
                    >
                        ${modoProfissional ? 'ON' : 'OFF'}
                    </button>
                </div>
            </section>
        </div>
    `;

    adicionarEventoConta();
}

function adicionarEventoConta() {
    const btnProfissional = document.getElementById('btn-modo-prof');

    if (!btnProfissional) return;

    btnProfissional.addEventListener('click', () => {
        const estadoAtual = localStorage.getItem('modoProfissional') === 'true';
        const novoEstado = !estadoAtual;

        // Atualiza a memória do navegador
        localStorage.setItem('modoProfissional', novoEstado);

        // Atualiza a interface diretamente
        btnProfissional.textContent = novoEstado ? 'ON' : 'OFF';
        btnProfissional.className = `btn-toggle ${novoEstado ? 'ativo' : 'inativo'}`;
        btnProfissional.setAttribute('aria-pressed', novoEstado);

        // Notifica outros componentes da SPA (como a Navbar) sobre a alteração
        window.dispatchEvent(new Event('mudancaModoProfissional'));

        // Recarrega a página caso sua Navbar dependa do reload tradicional
        window.location.reload();
    });
}

export default {
    url: "#conta",
    label: "Minha Conta",
    icon: `<img src="${userIcon}" alt="Minha Conta">`,
    pagina: conta
};