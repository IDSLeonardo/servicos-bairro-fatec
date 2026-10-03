# Serviços do Bairro

Projeto desenvolvido para a disciplina Programação para Dispositivos Móveis de Análise e Desenvolvimento de Sistemas (FATEC).

## Sobre o Projeto

É um webapp focado em resolver a dificuldade de encontrar prestadores de serviço locais (eletricistas, diaristas, montadores) sem depender exclusivamente da indicação "boca a boca".

A aplicação funciona como um catálogo, permitindo que:

- **Profissionais (Publicadores):** Anunciem os seus serviços, informando a área de atendimento e os valores cobrados.
- **Moradores (Visitantes):** Busquem por serviços específicos no bairro, filtrem os resultados e comparem as opções rapidamente.

O projeto foi construído como uma _Single Page Application_ (SPA) com dados mockados. Possui um roteador próprio desenvolvido em JavaScript puro, sem frameworks. A interface segue regras estritas de design: todo o layout é sustentado exclusivamente por CSS Flexbox (sem CSS Grid), com limite máximo de largura de 360px para garantir a experiência mobile.

## Equipe

- Leonardo Izaias Da Silva
- Celso Borges
- Gustavo Pereira

## Como rodar o projeto

Para rodar este projeto, é necessário ter o [Node.js] instalado na máquina. O projeto utiliza o Vite como servidor de desenvolvimento local.

1. Clone o repositório na sua máquina.
2. Abra o terminal na pasta do projeto e instale as dependências:

   ```bash
   npm install
   ```

3. Inicie o servidor:

   ```bash
   npm run dev
   ```

4. O terminal exibirá um link local. Segure `Ctrl` e clique no link para abrir o webapp no navegador.
