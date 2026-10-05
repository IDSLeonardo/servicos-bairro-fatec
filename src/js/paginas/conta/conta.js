import './conta.css';

function conta(app) {
    // Verifica se já está como profissional na memória do navegador
    const modoProfissional = localStorage.getItem('modoProfissional') === 'true';

    app.innerHTML = `
        <div class="conta-conteudo">
            <header class="perfil-cabecalho">
                <div class="perfil-avatar">
                    <img src="./src/assets/icons/user.svg" style="filter: invert(1); width: 40px;">
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
                    <button id="btn-modo-prof" class="btn-toggle ${modoProfissional ? 'ativo' : 'inativo'}">
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

    btnProfissional.addEventListener('click', () => {
        // Lê o estado atual
        const estadoAtual = localStorage.getItem('modoProfissional') === 'true';
        
        // Inverte e salva o novo estado
        const novoEstado = !estadoAtual;
        localStorage.setItem('modoProfissional', novoEstado);
        
        // Atualiza a interface
        btnProfissional.textContent = novoEstado ? 'ON' : 'OFF';
        btnProfissional.className = `btn-toggle ${novoEstado ? 'ativo' : 'inativo'}`;
        
        // Dispara um recarregamento da página para atualizar o Menu Inferior (que faremos depois)
        window.location.reload();
    });
}

export default {
    url: "#conta",
    label: "Minha Conta",
    icon: "<img src='./src/assets/icons/user.svg'>",
    pagina: conta
};