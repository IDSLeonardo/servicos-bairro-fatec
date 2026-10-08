import "./erro.css";

function erro(app) {
    app.innerHTML = `
        <div class="erro-conteudo">
            <div class="erro-ilustracao">
                <img src="./src/assets/icons/map-pin-off.svg" alt="Local não encontrado" style="width: 48px; height: 48px;">
            </div>
            <h2 class="erro-titulo">Página não encontrada</h2>
            <p class="erro-mensagem">Ops! Parece que você tentou acessar um serviço ou endereço que não existe no bairro.</p>
            
            <a href="#inicio" class="btn-voltar-inicio">
                Voltar para o Início
            </a>
        </div>
    `;
}

export default erro;