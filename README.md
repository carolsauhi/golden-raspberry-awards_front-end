# **Golden Raspberry Awards **

Este projeto foi desenvolvido em Angular CLI para criar uma aplicação interativa com dois componentes principais: **Dashboard** e **Movie List**. Ele consome a API pública `https://challenge.outsera.tech/movies` para exibir informações sobre filmes e seus vencedores.

## **Funcionalidades**

### **1. Dashboard**
- Exibe informações estatísticas relacionadas aos filmes:
  - Anos com mais de um vencedor.
  - Top 3 estúdios com mais vitórias.
  - Produtores com maior e menor intervalo entre vitórias.
  - Lista de vencedores filtrada por ano.

### **2. Movie List**
- Exibe todos os filmes da API em uma tabela.
- Permite filtrar os filmes por:
  - Ano.
  - Vencedor (Yes/No).
- Possui paginação para navegação pelos dados.

---

## **Tecnologias Utilizadas**

- **Angular CLI**: Framework para desenvolvimento frontend.
- **TypeScript**: Linguagem principal para a lógica da aplicação.
- **Bootstrap** (opcional): Para estilos adicionais.
- **API HTTP**: Conexão com a API `https://challenge.outsera.tech/movies`.

---

## **Pré-Requisitos**

Certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/) (v14 ou superior)
- [Angular CLI](https://angular.io/cli) (v15 ou superior)

---

## **Como Executar o Projeto**

1. **Clone o Repositório**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd <NOME_DO_REPOSITORIO>
   ```

2. **Instale as Dependências**
   ```bash
   npm install
   ```

3. **Inicie o Servidor de Desenvolvimento**
   ```bash
   ng serve
   ```
   A aplicação será executada em: [http://localhost:4200](http://localhost:4200).

---

## **Estrutura do Projeto**

Abaixo está a estrutura principal do projeto:

```plaintext
src/
├── app/
│   ├── dashboard/
│   │   ├── dashboard.component.ts     # Lógica do componente Dashboard
│   │   ├── dashboard.component.html   # Template do Dashboard
│   │   ├── dashboard.component.css    # Estilo do Dashboard
│   │   └── dashboard.component.spec.ts # Testes unitários
│   ├── movie-list/
│   │   ├── movie-list.component.ts    # Lógica do componente Movie List
│   │   ├── movie-list.component.html  # Template do Movie List
│   │   ├── movie-list.component.css   # Estilo do Movie List
│   │   └── movie-list.component.spec.ts # Testes unitários
│   ├── app.component.ts               # Componente raiz
│   ├── app.module.ts                  # Configuração dos módulos
│   └── app-routing.module.ts          # Rotas da aplicação
├── assets/                            # Arquivos estáticos
└── environments/                      # Configurações de ambiente
```

---

## **Rotas da Aplicação**

- `/dashboard`: Página inicial do Dashboard.
- `/movie-list`: Página que exibe a lista de filmes.

---

## **Uso da API**

O projeto consome a API `https://challenge.outsera.tech/movies` para obter os dados. As principais funcionalidades são:

### **Endpoint Utilizado**
**Todos os filmes**:
   - Endpoint: `https://challenge.outsera.tech/movies`
   - Método: `GET`

---

## **Estilo e Responsividade**

- O projeto usa estilos customizados definidos nos arquivos CSS específicos de cada componente.
- Todo o conteúdo foi centralizado e adaptado para dispositivos menores com responsividade mínima de **768x1280px**.
- Tipografia padrão: `Sans Serif`.

---

## **Testes Unitários**

Os testes foram implementados usando o framework Jasmine e executados com Karma. Eles cobrem as principais funcionalidades dos componentes **Dashboard** e **Movie List**.

### **Como Executar os Testes**

1. Execute o comando abaixo para rodar os testes:
   ```bash
   ng test
   ```

2. Um navegador será aberto exibindo os resultados dos testes.

### **Testes Implementados**

#### **DashboardComponent**
- Criação do componente.
- Carregamento de dados da API.
- População de anos com múltiplos vencedores.
- População de estúdios com mais vitórias.
- População de produtores com maior e menor intervalo entre vitórias.
- Filtragem de vencedores por ano.

#### **MovieListComponent**
- Criação do componente.
- Carregamento de filmes da API.
- Filtragem de filmes por ano.
- Filtragem de filmes por vencedor.
- Paginação dos filmes.

---

## **Próximos Passos**

1. **Melhorias no Design**:
   - Implementar animações suaves para carregamento de dados.

2. **Testes Automatizados**:
   - Expandir os testes unitários para cobrir cenários adicionais.

3. **Paginação e Filtros**:
   - Melhorar a experiência do usuário para manipular grandes conjuntos de dados.

---

## Desenvolvedora
Este projeto foi desenvolvido por [**Carol Sauhi**](https://github.com/carolsauhi).

---

## **Licença**

Este projeto é de uso livre para estudo e desenvolvimento. Entre em contato para mais informações sobre direitos e permissões.
