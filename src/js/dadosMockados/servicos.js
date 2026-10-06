export const mockUsuarios = [
  { id: 1, 
    nome: 'João Silva', 
    email: 'joao@email.com', 
    senha: '123'
  },
  { id: 2, 
    nome: 'Maria Souza', 
    email: 'maria@email.com', 
    senha: '123' }
];

export const mockServicos = [
  {
    id: 1, 
    prestadorId: 1, 
    titulo: 'Manutenção Elétrica', 
    categoria: 'Reformas', 
    preco: 150.00, bairro: 'Centro', 
    descricao: 'Reparos elétricos gerais.'
  },
  {
    id: 2, 
    prestadorId: 1, 
    titulo: 'Instalação de Ar Condicionado', 
    categoria: 'Reformas', 
    preco: 250.00, bairro: 'Jardins', 
    descricao: 'Instalação com garantia.' },
  {
    id: 3, 
    prestadorId: 2, 
    titulo: 'Aulas de Matemática', 
    categoria: 'Aulas', 
    preco: 80.00, bairro: 'Centro', 
    descricao: 'Reforço para ensino médio.' },
      {
    id: 4,
    titulo: "Limpeza de Sofá a Seco",
    categoria: "Limpeza",
    preco: 150.0,
    distancia: 1500, // Distância em km para simular o modelo do KiOferta
  },
  {
    id: 5,
    titulo: "Instalação de Chuveiro 220V",
    categoria: "Elétrica",
    preco: 80.0,
    distancia: 3200,
  },
  {
    id: 6,
    titulo: "Montagem de Guarda-Roupa",
    categoria: "Montagem",
    preco: 250.0,
    distancia: 800,
  },
];