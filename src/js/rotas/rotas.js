import inicio from "../paginas/inicio/inicio.js";
import resultados from "../paginas/resultados/resultados.js";
import conta from "../paginas/conta/conta.js"; // Importa a tela real da conta

// Verifica se o modo profissional está ativo no navegador
const modoProfissionalAtivo = localStorage.getItem('modoProfissional') === 'true';

export const rotas = [
  inicio,
  resultados,
  {
    url: "#detalhe",
    label: "",
    icon: "",
    pagina: (app) => (app.innerHTML = "<h1>Detalhe do Serviço</h1>"),
  },
  {
    url: "#publicar",
    // Esconde o label e o ícone se não for profissional, sumindo com ele da Navbar
    label: modoProfissionalAtivo ? "Publicar" : "",
    icon: modoProfissionalAtivo ? "<img src='./src/assets/icons/plus.svg'>" : "",
    pagina: (app) => (app.innerHTML = "<h1>Novo Serviço</h1>"),
  },
  conta // Adiciona a rota real da conta
];