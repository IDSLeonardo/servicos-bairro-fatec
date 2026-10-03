// A regra E1 diz que cada tela exporta um objeto, e essas telas entram nesta lista de rotas.
// Como ainda não temos os módulos das telas criados (Início, Resultados, etc.), 
// vamos definir um esqueleto (mock) para o motor começar a funcionar.

export const rotas = [
  {
    url: "#inicio",
    label: "Início",
    icon: "🏠",
    pagina: () => "<h1>Tela de Início</h1><p>O campo de busca entrará aqui.</p>" 
  },
  {
    url: "#resultados",
    label: "Resultados",
    icon: "🔍",
    pagina: () => "<h1>Resultados</h1><p>Lista de serviços aparecerá aqui.</p>"
  },
  {
    url: "#detalhe",
    label: "",
    icon: "", 
    pagina: () => "<h1>Detalhe do Serviço</h1>"
  },
  {
    url: "#publicar",
    label: "Publicar",
    icon: "➕",
    pagina: () => "<h1>Novo Serviço</h1><p>O formulário entrará aqui.</p>"
  },
  {
    url: "#conta",
    label: "Minha Conta",
    icon: "👤",
    pagina: () => "<h1>Minha Conta</h1><p>Login e seus serviços.</p>"
  }
];