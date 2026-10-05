// Import do CSS é obrigatório para o layout funcionar
import "./inicio.css";

function inicio(app) {
  app.innerHTML = `
        <div class="inicio-conteudo">
            <header class="inicio-cabecalho">
            <img src="/src/assets/imgs/logo.png" alt="Logo Serviços do Bairro" class="logo-imagem">
            <p>Encontre quem resolve perto de você.</p>
            </header>

            <form id="form-busca" class="inicio-busca">
                <input type="text" id="termo-busca" placeholder="O que você precisa?" required>
                <button type="submit" id="btn-busca">Buscar</button>
            </form>

            <section class="inicio-categorias">
                <h2>Categorias Populares</h2>
                <div class="categorias-grid-flex">
                    <button type="button" class="btn-categoria" data-categoria="Elétrica"> <img src='./src/assets/icons/zap.svg'> Elétrica</button>
                    <button type="button" class="btn-categoria" data-categoria="Limpeza"> <img src='./src/assets/icons/sparkles.svg'> Limpeza</button>
                    <button type="button" class="btn-categoria" data-categoria="Montagem"> <img src='./src/assets/icons/drill.svg'> Montagem</button>
                    <button type="button" class="btn-categoria" data-categoria="Encanador"> <img src='./src/assets/icons/wrench.svg'> Encanador</button>
                </div>
            </section>
        </div>
    `;

  // Adicionamos os eventos depois de renderizar o HTML
  adicionarEvento();
}

function adicionarEvento() {
  const formBusca = document.getElementById("form-busca");
  const inputBusca = document.getElementById("termo-busca");
  const listaCategoria = document.querySelectorAll(".btn-categoria");

  // Evento 1: Submeter o formulário de busca
  formBusca.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita o recarregamento da página (F5)
    const termo = inputBusca.value.trim();
    if (termo) {
      sessionStorage.setItem("termoBusca", termo); // Guarda a palavra
      window.location.hash = "#resultados"; // Muda a tela
    }
  });

  // Evento 2: Clicar nos botões de categoria
  listaCategoria.forEach((botao) =>
    botao.addEventListener("click", (evento) => {
      const categoriaEscolhida = evento.target.dataset.categoria;
      sessionStorage.setItem("termoBusca", categoriaEscolhida); // Guarda a palavra
      window.location.hash = "#resultados"; // Muda a tela
    }),
  );
}

export default {
  url: "#inicio",
  label: "Início",
  icon: "<img src='./src/assets/icons/home.svg'>",
  pagina: inicio,
};
