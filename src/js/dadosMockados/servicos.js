export const mockUsuarios = [
  { id: 1, 
    nome: 'João Silva', 
    email: 'joao@email.com', 
    senha: '123'
  },
  { id: 2, 
    nome: 'Maria Souza', 
    email: 'maria@email.com', 
    senha: 'AdoroGatos456'
  },
  { id: 3, 
    nome: 'Cristian Pacheco', 
    email: 'criantianPach123@email.com', 
    senha: '27281990'
  },
  { id: 4, 
    nome: 'Vivian Inoue', 
    email: 'ViviInoue@email.com', 
    senha: 'DocaDocarmo2020'
  },
  { id: 5, 
    nome: 'Henry Silva', 
    email: 'HSilva@email.com', 
    senha: 'Casa2020'
  },
  { id: 6, 
    nome: 'Óscar Oliveira', 
    email: 'Osceiva@email.com', 
    senha: 'Bryan2022'
  },
];

export const mockServicos = [
  {
    id: 1, 
    prestadorId: 1, 
    titulo: 'Rejuntamento e Nivelamento', 
    categoria: 'Reformas', 
    preco: 70.00, 
    bairro: 'Centro', 
    descricao: 'Faço rejunte de piso dar cor que preferir e caso necessario faço nivelamento.'
  },
  {
    id: 2, 
    prestadorId: 1, 
    titulo: 'Instalação de Ar Condicionado', 
    categoria: 'Reformas', 
    preco: 250.00, 
    bairro: 'Centro', 
    descricao: 'Instalação com garantia.'
  },
  {
    id: 3, 
    prestadorId: 2,
    titulo: 'Assentamento de Pia', 
    categoria: 'Hidráulica', 
    preco: 80.00, 
    bairro: 'Vila Mogilar', 
    descricao: 'Servico para assentamento de pia.' 
    },
    {
    id: 4,
    prestadorId: 2,
    titulo: "Limpeza de Sofá a Seco",
    categoria: "Limpeza",
    preco: 150.0,
    distancia: 1500, // Distância em km para simular o modelo do KiOferta
    descricao: "Faço limpeza de sofá a seco e impermeabilização."
  },
  {
    id: 5,
    prestadorId: 3,
    titulo: "Instalação de Chuveiro 220V",
    categoria: "Elétrica",
    preco: 80.0,
    distancia: 3200,
    descricao: "faço a instalação de chuveiros elétricos 220V com garantia."
  },
  {
    id: 6,
    prestadorId: 3,
    titulo: "Montagem de Guarda-Roupa",
    categoria: "Montagem",
    preco: 250.0,
    distancia: 800,
  },
  {
    id: 7, 
    prestadorId: 4, 
    titulo: 'Servico de transporte de carro', 
    categoria: 'Transporte', 
    preco: 'A combinar', 
    bairro: 'Jardim Armenia', 
    descricao: 'Faço o transporte de carros de um local para outro com segurança e garantia.'
  },
  {
    id: 8, 
    prestadorId: 4, 
    titulo: 'Servico de Manicure e Pedicure', 
    categoria: 'Beleza', 
    preco: 'A combinar', 
    bairro: 'Jardim Armenia', 
    descricao: 'Faço serviços de manicure e pedicure com produtos de qualidade.' 
  },
  {
    id: 9, 
    prestadorId: 5, 
    titulo: 'Assistência Técnica e Informática', 
    categoria: 'Diversos', 
    preco: 'A combinar', 
    bairro: 'Centro', 
    descricao: 'Presto serviços de assistência técnica e informática, incluindo manutenção de computadores, notebooks e dispositivos móveis.' 
  },
  {
    id: 10,
    prestadorId: 5,
    titulo: "Aulas Particulares e Explicações",
    categoria: "Diversos",
    preco: 150.0,
    descricao: 'Ofereço aulas particulares e explicações em diversas disciplinas, com métodos eficazes e personalizados.' // Distância em km para simular o modelo do KiOferta
  },
  {
    id: 11,
    prestadorId: 6,
    titulo: "Serviços de Chaveiro",
    categoria: "Diversos",
    preco: 'A combinar',
    descricao: 'Presto serviços de chaveiro, incluindo abertura de portas, troca de fechaduras e duplicação de chaves.'
  },
  {
    id: 12,
    prestadorId: 6,
    titulo: "Cuidados de Animais de Estimação (Pet Care)",
    categoria: "Diversos",
    preco: 'A combinar',
    descricao: "Ofereço cuidados de animais de estimação, incluindo banho, tosa e passeio."
  },
];