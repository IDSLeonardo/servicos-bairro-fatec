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
                <h2>O que você precisa hoje?</h2>
                <div class="categorias-grid-flex">
                    <button type="button" class="btn-categoria" data-categoria="Elétrica"> 
                        <img src='/src/assets/icons/zap.svg'> Elétrica
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Hidráulica"> 
                        <img src='/src/assets/icons/droplet.svg'> Hidráulica
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Montagem"> 
                        <img src='/src/assets/icons/drill.svg'> Montagem
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Reformas"> 
                        <img src='/src/assets/icons/hard-hat.svg'> Reformas
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Limpeza"> 
                        <img src='/src/assets/icons/sparkles.svg'> Limpeza
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Transporte"> 
                        <img src='/src/assets/icons/truck.svg'> Transporte
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Beleza"> 
                        <img src='/src/assets/icons/scissors.svg'> Beleza
                    </button>
                    <button type="button" class="btn-categoria" data-categoria="Diversos"> 
                        <img src='/src/assets/icons/ellipsis.svg'> Diversos
                    </button>
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

  // Evento 1: Submeter o formulário de busca por texto
  formBusca?.addEventListener("submit", (evento) => {
    evento.preventDefault(); // Evita o recarregamento da página (F5)
    const termo = inputBusca.value.trim();
    if (termo) {
      sessionStorage.setItem("termoBusca", termo); // Guarda a palavra de busca
      sessionStorage.removeItem("categoriaBusca"); // Limpa qualquer filtro de categoria anterior
      window.location.hash = "#resultados"; // Muda para a tela de resultados
    }
  });

  // Evento 2: Clicar nos botões de categoria
  listaCategoria.forEach((botao) =>
    botao.addEventListener("click", (evento) => {
      const categoriaEscolhida = evento.currentTarget.dataset.categoria;
      sessionStorage.setItem("categoriaBusca", categoriaEscolhida); // Guarda a categoria para o select
      sessionStorage.removeItem("termoBusca"); // Limpa a busca por texto
      window.location.hash = "#resultados"; // Muda para a tela de resultados
    })
  );
}

export default {
  url: "#inicio",
  label: "Início",
  icon: "<img src='/src/assets/icons/home.svg'>",
  pagina: inicio,
};