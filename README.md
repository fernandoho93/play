# Projeto de Estudos com Playwright

Este repositório foi criado para estudo de automação de testes com `Playwright` e `TypeScript`.

O foco do projeto é praticar:

- criação de cenários automatizados
- organização de testes
- separação entre teste, dados e page objects
- evolução gradual da estrutura do projeto

## Objetivo

Este não é um projeto de automação corporativo completo. Ele funciona como laboratório para aprender a ferramenta, testar abordagens e amadurecer boas práticas aos poucos.

Atualmente, os estudos utilizam estas páginas:

- `https://demoqa.com/books`
- `https://demo.playwright.dev/todomvc`
- `https://automationpratice.com.br`

## Tecnologias

- `Node.js`
- `Playwright`
- `TypeScript`

Dependências atuais:

- `@playwright/test`
- `@types/node`

## Estrutura do projeto

```text
play/
  src/
    pages/
      base.page.ts
      books.page.ts
  tests/
    data/
      demo.automationtesting.json
      estudos-playwright-ts.json
      expandtesting-register.json
    demo.automationtesting.spec.ts
    estudos-playwright-ts.spec.ts
    example.spec.js
    example2.before.spec.js
    expandtesting-register.spec.ts
    novos cenários.spec.js
  package.json
  README.md
```

## Como o projeto está organizado

### `tests/`

Pasta com os arquivos de teste.

Exemplo principal atual:

- [tests/demo.automationtesting.spec.ts]
Esse arquivo contém os cenários de estudo da página de livros do DemoQA.

## Páginas utilizadas por arquivo

Atualmente, os arquivos de teste estão distribuídos assim:

- [tests/demo.automationtesting.spec.ts]
  usa a página `https://demoqa.com/books`
  foco em busca, navegação e validação de detalhes de livros

- [tests/estudos-playwright-ts.spec.ts]
  usa a página `https://demo.playwright.dev/todomvc`
  foco em criação e conclusão de tarefas

- [tests/example.spec.js]
  usa a página `https://automationpratice.com.br`
  foco em estudos livres de login, carrinho e interações básicas

Existem também outros arquivos no diretório `tests/` que podem ter sido usados em exercícios anteriores ou estudos paralelos. O mapeamento acima cobre os principais arquivos citados e mantidos no fluxo atual de estudo.

### `tests/data/`

Pasta usada para guardar massa de dados e configurações simples dos testes.

Exemplo:

- [tests/data/demo.automationtesting.json]

Hoje esse arquivo contém a URL da página testada. No futuro, ele pode concentrar também:

- títulos de livros
- ISBNs
- textos esperados
- termos de busca

### `src/pages/`

Pasta com os `Page Objects`.

Arquivos atuais:

- [src/pages/base.page.ts]
- [src/pages/books.page.ts]
## Padrão utilizado: Page Objects

O projeto começou com testes diretos no arquivo `.spec.ts` e depois foi evoluído para o padrão de `Page Objects`.

Esse padrão separa responsabilidades:

- o teste diz o que quer validar
- a page object sabe como interagir com a página

### `base.page.ts`

É a base reutilizável das páginas.

Responsabilidades:

- receber o objeto `page` do Playwright
- disponibilizar métodos comuns como:
  - `goto()`
  - `getByRole()`
  - `getByText()`
  - `locator()`

### `books.page.ts`

Representa a página `DemoQA Books`.

Responsabilidades:

- concentrar os seletores da página
- encapsular ações como:
  - pesquisar livro
  - limpar busca
  - abrir detalhe do livro
  - voltar para a lista
- encapsular validações comuns como:
  - livro visível
  - livro não visível
  - detalhes do livro
  - botão `Next` visível

### `demo.automationtesting.spec.ts`

É o arquivo que descreve os cenários de teste.

Em vez de usar vários `locators` diretamente no teste, ele instancia:

```ts
const booksPage = new BooksPage(page);
```

Depois chama métodos mais legíveis, por exemplo:

```ts
await booksPage.goto();
await booksPage.searchBook('Git Pocket Guide');
await booksPage.expectBookVisible('Git Pocket Guide');
```

Isso deixa o teste mais limpo e mais fácil de manter.

## Cenários atuais

O arquivo [tests/demo.automationtesting.spec.ts] cobre atualmente:

1. abrir a página de livros
2. pesquisar por um livro
3. validar detalhes do livro e voltar para a lista
4. pesquisar um livro inexistente
5. validar que o botão de próxima página existe
6. limpar a busca e validar que a lista reaparece

## Ganhos da estrutura atual

Ao migrar parte do projeto para `Page Objects`, os principais ganhos foram:

- melhor legibilidade dos testes
- menos repetição de seletores
- manutenção mais simples
- separação entre teste, dados e ações da página
- base melhor para evoluir o projeto no futuro

## Como instalar

Instale as dependências do projeto:

```bash
npm install
```

Se necessário, instale os navegadores do Playwright:

```bash
npx playwright install
```

## Como executar os testes

Executar todos os testes:

```bash
npx playwright test
```

Executar apenas o arquivo principal de estudo:

```bash
npx playwright test tests/demo.automationtesting.spec.ts
```

Executar um teste específico pelo nome:

```bash
npx playwright test -g "Cenario 3"
```

## Próximos passos sugeridos

Algumas evoluções naturais para este projeto:

- mover mais dados fixos para arquivos JSON
- criar mais page objects para outros fluxos
- adicionar fixtures quando houver reaproveitamento maior de setup
- criar comandos no `package.json`
- adicionar um `playwright.config.ts`
- organizar melhor os testes por domínio ou funcionalidade

## Observações

Como este projeto é voltado a estudo:

- a estrutura pode mudar conforme o aprendizado evoluir
- nem todos os testes precisam seguir o padrão final desde o início
- o importante é amadurecer a base aos poucos, sem perder entendimento do que está sendo automatizado
