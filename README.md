# Challenge-frontend-react

> Aplicação web que exibe uma lista de produtos e permita ao usuário adicionar, editar e excluir produtos, além de adicionar produtos ao carrinho de compras e realizar pagamentos.

## 💻 Pré-requisitos

Antes de começar, verifique se você atendeu aos seguintes requisitos:

- Você instalou a versão mais recente de `nextjs`
- Você está utilizando a versão do node mais atual (`18.18.0`)

## 🚀 Instalando challenge-frontend-react

Para instalar o challenge-frontend-react, siga estas etapas:

Linux, macOS e Windows:

```
npm i
```

## ☕ Usando challenge-frontend-react

Para usar challenge-frontend-react, siga estas etapas:

```
npm run dev
```

## 💬 Estrutura de diretórios

- `src/app/componentes`: Contém todos os componentes utilizados no projeto, juntamente com seus respectivos testes.
- `src/app/pages`: Aqui é onde se localizam as páginas da aplicação.
- `src/app/api`: Responsável pelas APIs que realizam conexões com a API do Stripe e o banco de dados. Podemos chama-lo de "backend for frontend (BFF)".
- `src/app/hooks`: Funcionalidades em componentes desenvolvidas de maneira mais simples e eficiente, exemplo disso é o `useStorage`. Um hook criado para facilitar o acesso ao `localStorage` e ao `sessionStorage`.
- `src/app/services`: Se refere a módulos ou classes que encapsulam a lógica relacionada à comunicação com serviços externos, como APIs, bancos de dados, serviços web e outras fontes de dados.
- `src/app/store`: Nosso sistema de gerenciamento de estado, que é essencial para a coordenação eficaz das informações em nosso aplicativo. Neste contexto, estamos utilizando a biblioteca Zustand para controlar as ações e acessar dados cruciais.

  `useCart`: Este componente é responsável por administrar o estado e funcionalidades relacionadas ao carrinho de compras

  `useToastMessage`: Este componente é utilizado para controlar as mensagens de notificação (como mensagens de sucesso, erro ou informações) exibidas de maneira dinâmica

- `src/app/types`: Esta pasta tem a finalidade de compartilhar definições de interfaces e tipos de dados que desempenham um papel fundamental em todo o projeto.

## 👀 Teste

Testes unitários para verificar se partes específicas do código, como funções e componentes individuais, estão funcionando conforme o esperado.

```
npm run test
```

## 📚 Bibliotecas Utilizadas

Este projeto faz uso de diversas bibliotecas que desempenham papéis importantes no desenvolvimento e aprimoramento de funcionalidades. Abaixo, apresentamos uma breve descrição das bibliotecas utilizadas, seus pontos positivos e por que são valiosas para o projeto.

### 1. _Next.js_

- O Next.js é um framework React que simplifica o desenvolvimento de aplicações web, oferecendo recursos como renderização do lado do servidor, roteamento fácil e otimização de desempenho. Ele é particularmente útil para construir aplicativos de página única (SPAs) e páginas estáticas.
- **Pontos Positivos**: Facilita a criação de aplicações React com uma estrutura organizada, melhorando o SEO, a velocidade de carregamento e a escalabilidade.

### 2. _React e React DOM_

- O React é uma biblioteca JavaScript muito popular para construção de interfaces de usuário. O React DOM é a biblioteca que permite a renderização de componentes React no navegador.
- **Pontos Positivos**: Facilidade de criação de componentes reutilizáveis, composição de interfaces de usuário e gerenciamento eficiente do estado do aplicativo.

### 3. _React Query_

- O React Query é uma biblioteca para gerenciamento de estado remoto que simplifica a busca, criação e atualização de dados de servidores. Ele ajuda a manter os dados sincronizados entre o cliente e o servidor de forma eficiente.
- **Pontos Positivos**: Simplifica operações assíncronas, mantém o estado global da aplicação organizado e melhora o desempenho, minimizando requisições desnecessárias.

### 4. _React Hook Form_

- O React Hook Form é uma biblioteca que facilita a criação de formulários controlados em React. Ele ajuda a gerenciar o estado dos campos de formulário de maneira simples e eficaz.
- **Pontos Positivos**: Simplifica a validação de formulários, lida com estados de campos de entrada e reduz a complexidade ao trabalhar com formulários.

### 5. _SQLite e SQLite3_

- O SQLite e SQLite3 são bibliotecas de banco de dados SQL incorporáveis. São eficientes, leves e amplamente utilizados para armazenamento de dados locais em aplicativos.
- **Pontos Positivos**: Oferecem armazenamento de dados eficiente, adequado para aplicativos que precisam de um banco de dados local simples e rápido.

### 6. _Stripe_

- O Stripe é uma plataforma de pagamento online amplamente confiável e usada por empresas para processar pagamentos com facilidade e segurança.
- **Pontos Positivos**: Facilita a integração de pagamentos online em aplicativos, fornecendo uma API robusta e documentação completa.

### 7. _Zustand_

- O Zustand é uma biblioteca de gerenciamento de estado para React que simplifica o controle de estados complexos em aplicações. Ele é especialmente útil quando se lida com estados globais.
- **Pontos Positivos**: Torna mais fácil o gerenciamento de estados em toda a aplicação, oferecendo uma alternativa ao Redux com uma API mais simples e direta.

### 8. _Jest e Eslint_

- Jest é um framework de teste de JavaScript e Eslint é uma ferramenta de análise de código estática. Ambos são usados para melhorar a qualidade do código e garantir que o projeto seja confiável e livre de erros.
- **Pontos Positivos**: Permitem a escrita de testes para verificar a funcionalidade do código e a identificação de problemas no código-fonte durante o desenvolvimento, garantindo a consistência e a qualidade do código.
