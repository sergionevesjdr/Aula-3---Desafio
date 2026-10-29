# 📋 Aula 3 — Lista de Tarefas Inteligente (To-Do List)

> **Ambiente Local:** `C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas`  
> **Repositório GitHub:** [github.com/sergionevesjdr/Aula-3---Desafio](https://github.com/sergionevesjdr/Aula-3---Desafio)  
> **Framework:** React 19 + TypeScript + Tailwind CSS v4 + Vite  
> **Suíte de Testes:** Vitest (100% dos testes aprovados)  
> **Persistência:** LocalStorage (Navegador)

---

## 📑 Sumário

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Funcionalidades Principais](#-funcionalidades-principais)
3. [Diferenciação Visual: Concluídas vs. Pendentes](#-diferenciação-visual-concluídas-vs-pendentes)
4. [Arquitetura de Componentes](#-arquitetura-de-componentes)
5. [Detalhamento de Cada Arquivo do Projeto](#-detalhamento-de-cada-arquivo-do-projeto)
6. [Os 5 Conceitos Fundamentais de React Explicados](#-os-5-conceitos-fundamentais-de-react-explicados)
7. [Suíte de Testes Automatizados](#-suíte-de-testes-automatizados)
8. [Como Executar na sua Máquina (Passo a Passo)](#-como-executar-na-sua-máquina-passo-a-passo)
9. [Integração de IA & Antigravity](#-integração-de-ia--antigravity)
10. [Atalhos de Teclado & Acessibilidade](#-atalhos-de-teclado--acessibilidade)

---

## 🎯 Sobre o Projeto

A **Lista de Tarefas (Aula 3)** é uma aplicação moderna construída especificamente para quem está iniciando em desenvolvimento frontend com **React** e **TypeScript**.

O projeto equilibra dois propósitos essenciais:
1. **Ferramenta Real e Funcional:** Permite adicionar, concluir, editar, excluir, buscar, filtrar e ordenar atividades com persistência em tempo real e visual limpo.
2. **Ambiente Didático de Aprendizado:** Código 100% documentado, estrutura limpa de arquivos, separação estrita de responsabilidades e um guia interativo integrado ao próprio aplicativo.

---

## ✨ Funcionalidades Principais

- ➕ **Adicionar Atividades (`TaskInput.tsx`)**:
  - Inserção rápida com a tecla `Enter`.
  - Opções avançadas: descrição/anotações adicionais, categorização (*Estudos*, *Trabalho*, *Pessoal*, *Saúde*) e níveis de urgência (*Baixa*, *Média*, *Alta*).
  - Validação inline contra campos vazios.

- 🎨 **Diferenciação Visual Instantânea (`TaskItem.tsx`)**:
  - Tarefas pendentes possuem cartões nítidos, texto destacado e marcador convidativo.
  - Tarefas concluídas recebem fundo esmeralda suave, texto riscado (`line-through`), marcador preenchido e horário de finalização registrado.

- ✏️ **Edição Inline (`TaskItem.tsx`)**:
  - Permite alterar título e descrição a qualquer momento diretamente no cartão, sem sair da lista.

- 🗑️ **Exclusão Segura com "Desfazer" (`Toast.tsx`)**:
  - Ao excluir uma tarefa, um aviso flutuante é exibido com um botão **"Desfazer"** para restauração imediata caso tenha sido clicado por engano.

- 🔍 **Filtros e Busca em Tempo Real (`TaskFilters.tsx`)**:
  - Abas segmentadas: *Todas*, *Pendentes* e *Concluídas* com contadores numéricos tabulares.
  - Campo de pesquisa textual *case-insensitive* (busca tanto no título quanto na descrição).
  - Filtro por categoria específica.
  - Ordenação dinâmica: mais recentes, mais antigas, maior prioridade ou ordem alfabética (A-Z).

- 📊 **Painel de Métricas e Progresso (`TaskStats.tsx`)**:
  - Contadores de tarefas com algarismos alinhados (`tabular-nums`).
  - Barra de progresso percentual calculada automaticamente.
  - Efeito comemorativo de confetes (`canvas-confetti`) ao finalizar todas as atividades da lista!

- 💾 **Persistência no LocalStorage (`storage.ts`)**:
  - Os dados ficam salvos no navegador do usuário e não se perdem ao fechar ou atualizar a aba.
  - Inclui tarefas iniciais de demonstração e botão para restaurar os exemplos a qualquer momento.

- 🌓 **Tema Claro e Escuro (Dark Mode)**:
  - Suporte completo a tema claro e escuro respeitando contraste WCAG AA.

- 📦 **Exportação Automática para a Pasta Aula 3 (`ExportModal.tsx`)**:
  - Botão no cabeçalho que compacta todo o código em um arquivo `.zip` pronto para extração na pasta `C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas`.

- 📚 **Guia Didático Interativo (`CodeExplainerModal.tsx`)**:
  - Modal integrado com 4 abas didáticas explicando a arquitetura, conceitos do React, ciclo CRUD e glossário de programação.

---

## 🎨 Diferenciação Visual: Concluídas vs. Pendentes

A interface utiliza **Estilização Condicional** para que o usuário identifique o estado da atividade em milissegundos:

```text
┌────────────────────────────────────────────────────────────────────────┐
│ 🟢 TAREFA CONCLUÍDA:                                                   │
│ [✓]  Ler capítulo 3 de TypeScript (riscado)                           │
│      ✓ Concluída · Estudos · Finalizada em 29 out, 14:25               │
│      Fundo: bg-emerald-50/40 (verde suave) | Borda: verde esmeralda     │
└────────────────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────────────────┐
│ ⚪ TAREFA PENDENTE:                                                     │
│ [ ]  Praticar criação de componentes em React                          │
│      ⏰ Pendente · Estudos · Alta prioridade · Criada hoje             │
│      Fundo: bg-white (nítido) | Borda: cinza neutra com hover indigo   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 🏛️ Arquitetura de Componentes

A estrutura segue o fluxo unidirecional de dados do React (*One-Way Data Flow*):

```text
                             ┌───────────────────┐
                             │     main.tsx      │ (Ponto de Entrada)
                             └─────────┬─────────┘
                                       │
                             ┌─────────▼─────────┐
                             │      App.tsx      │ (Estado Global & Handlers)
                             └─────────┬─────────┘
            ┌──────────────────┬───────┴──────────┬─────────────────┐
            │                  │                  │                 │
  ┌─────────▼────────┐ ┌───────▼────────┐ ┌───────▼────────┐ ┌──────▼────────┐
  │  TaskHeader.tsx  │ │ TaskStats.tsx  │ │ TaskInput.tsx  │ │TaskFilters.tsx│
  └──────────────────┘ └────────────────┘ └────────────────┘ └───────────────┘
                                       │
                             ┌─────────▼─────────┐
                             │   TaskList.tsx    │ (Iteração .map)
                             └─────────┬─────────┘
                                       │
                             ┌─────────▼─────────┐
                             │   TaskItem.tsx    │ (Item Individual)
                             └───────────────────┘
                                       │
                   ┌───────────────────┴───────────────────┐
                   │                                       │
         ┌─────────▼───────────┐                 ┌─────────▼───────────┐
         │CodeExplainerModal.tsx│                │   ExportModal.tsx   │
         └─────────────────────┘                 └─────────────────────┘
```

---

## 📁 Detalhamento de Cada Arquivo do Projeto

### 1. `src/types/todo.ts`
Define os contratos de dados usando **TypeScript Interfaces**:
- `Task`: modelo completo de uma tarefa (`id`, `title`, `description`, `completed`, `category`, `priority`, `createdAt`, `completedAt`).
- `FilterStatus`: `'todas' | 'pendentes' | 'concluidas'`.
- `TaskPriority`: `'baixa' | 'media' | 'alta'`.
- `TaskCategory`: `'trabalho' | 'estudos' | 'pessoal' | 'saude'`.

### 2. `src/utils/storage.ts`
Controla a persistência no navegador:
- `loadTasksFromStorage()`: lê a chave do `localStorage`, valida e faz `JSON.parse()`. Se vazio, injeta tarefas de exemplo.
- `saveTasksToStorage(tasks)`: serializa o array em string com `JSON.stringify()` e grava.

### 3. `src/utils/tasks.test.ts`
Suíte com 9 testes automatizados com o framework **Vitest**. Testa isoladamente adicionar, alternar conclusão, editar, excluir, filtros, busca, cálculos de estatística e armazenamento.

### 4. `src/utils/exportProject.ts`
Utilitário que empacota o código completo do projeto utilizando `JSZip` e dispara o download do arquivo `Aula_3_Lista_de_Tarefas.zip`.

### 5. `src/components/TaskHeader.tsx`
Barra superior de navegação respeitando o *Top Bar Contract*:
- Identidade visual e data formatada por extenso.
- Botão "Salvar na Pasta (Aula 3)".
- Botão "Como este código funciona?".
- Botão de alternância de tema Claro/Escuro.

### 6. `src/components/TaskStats.tsx`
Painel com 4 cartões métricos:
- Total de tarefas cadastradas.
- Tarefas pendentes.
- Tarefas concluídas.
- Barra de progresso dinâmica calculando a porcentagem em tempo real com números monoespaçados (`tabular-nums`).

### 7. `src/components/TaskInput.tsx`
Formulário controlado (*Controlled Component*):
- Campo de texto principal com captura de tecla `Enter`.
- Gaveta expansível com campos opcionais (descrição, categoria e prioridade).
- Tratamento de `event.preventDefault()` e validação visual de erros.

### 8. `src/components/TaskFilters.tsx`
Barra de controle para o usuário localizar tarefas:
- Botões segmentados com contadores dinâmicos.
- Campo de busca instantânea com botão "X" para limpar.
- Dropdown de filtragem por categoria.
- Dropdown de ordenação por data, prioridade ou ordem alfabética.

### 9. `src/components/TaskList.tsx`
Componente responsável por:
- Renderizar a lista usando `.map()` com chave única `key={task.id}`.
- Exibir estado vazio acolhedor caso o usuário não tenha tarefas.
- Exibir estado de "nenhum resultado encontrado" com botão de reset de filtros.
- Rodapé com botão de limpeza em lote: "Remover concluídas".

### 10. `src/components/TaskItem.tsx`
Cartão individual da tarefa:
- Marcador circular com transição animada.
- Título riscado quando concluído.
- Metadados sem pílulas (*Zero-Pill Discipline*).
- Modo de edição inline com botões Salvar / Cancelar.
- Botão de remoção com ícone de lixeira.

### 11. `src/components/Toast.tsx`
Alerta flutuante com contagem regressiva que possibilita **desfazer** a exclusão de uma tarefa.

### 12. `src/components/CodeExplainerModal.tsx`
Ambiente interativo de aprendizado com 4 seções:
- Componentes e Pastas.
- 5 Conceitos Essenciais do React.
- Ciclo CRUD (Create, Read, Update, Delete).
- Dicionário de Termos do Desenvolvedor.

### 13. `src/components/ExportModal.tsx`
Modal que apresenta o caminho exato `C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas`, botão de cópia com feedback e botão de download do pacote `.zip`.

---

## 🧠 Os 5 Conceitos Fundamentais de React Explicados

Para quem está aprendendo, aqui está o resumo do que faz este app funcionar:

### 1. Estado com `useState`
Variáveis comuns não atualizam a interface gráfica quando seu valor muda. O `useState` é a memória do React:
```tsx
const [tasks, setTasks] = useState<Task[]>([]);
```
Sempre que chamamos `setTasks(novasTarefas)`, o React detecta a alteração e atualiza a tela automaticamente.

### 2. Imutabilidade
No React, **nunca** alteramos um array existente (como `tasks.push()` ou `delete task`). Em vez disso, criamos sempre uma **nova cópia**:
```tsx
// ➕ Adicionar (Operador Spread):
setTasks([novaTarefa, ...tasks]);

// ✅ Concluir (.map cria um novo array com a alteração):
setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

// 🗑️ Remover (.filter cria um novo array sem o item):
setTasks(tasks.filter(t => t.id !== id));
```

### 3. Comunicação via Props & Callbacks
O componente pai (`App.tsx`) envia dados e funções aos componentes filhos:
```tsx
<TaskItem 
  task={task} 
  onToggleComplete={handleToggleComplete} 
  onDelete={handleDeleteTask} 
/>
```
Quando o usuário clica no filho, ele dispara a função recebida, avisando o pai.

### 4. Efeitos com `useEffect`
Usado para sincronizar o componente com recursos externos (como salvar no `localStorage`):
```tsx
useEffect(() => {
  localStorage.setItem('minhas_tarefas', JSON.stringify(tasks));
}, [tasks]); // Roda toda vez que "tasks" for modificado
```

### 5. Estilização Condicional
Permite mudar classes CSS do Tailwind dependendo do estado da tarefa:
```tsx
className={task.completed ? 'bg-emerald-50 text-slate-400' : 'bg-white text-slate-900'}
```

---

## 🧪 Suíte de Testes Automatizados

O projeto utiliza o **Vitest** para garantir confiabilidade contínua. Todos os 9 testes foram validados com 100% de sucesso:

```bash
 ✓ src/utils/tasks.test.ts (9 tests) 12ms
   ✓ deve adicionar uma nova tarefa mantendo a imutabilidade do array
   ✓ deve alternar o status de uma tarefa entre pendente e concluída com .map()
   ✓ deve atualizar o título e a descrição de uma tarefa existente
   ✓ deve remover uma tarefa pelo ID usando .filter()
   ✓ deve filtrar corretamente apenas tarefas pendentes
   ✓ deve filtrar corretamente apenas tarefas concluídas
   ✓ deve buscar tarefas ignorando maiúsculas e minúsculas (case-insensitive)
   ✓ deve calcular corretamente o total, pendentes, concluídas e taxa de progresso
   ✓ deve salvar e carregar dados simulando o LocalStorage

 Test Files  1 passed (1)
      Tests  9 passed (9)
```

---

## 💻 Como Executar na sua Máquina (Passo a Passo)

### Pré-requisitos:
- Ter o **Node.js** instalado (versão 18 ou superior). Caso não tenha, baixe gratuitamente em [nodejs.org](https://nodejs.org/).

### Passos de Execução:
1. Extraia os arquivos do projeto para a sua pasta:
   ```text
   C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas
   ```
2. Abra o terminal (PowerShell, CMD ou terminal integrado do VS Code) dentro dessa pasta.
3. Instale os pacotes e dependências:
   ```bash
   npm install
   ```
4. Execute os testes para validar o ambiente:
   ```bash
   npm test
   ```
5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
6. Acesse o endereço exibido no terminal (normalmente `http://localhost:3000` ou `http://localhost:5173`) no seu navegador!

---

## 🤖 Integração de IA & Antigravity

### Situação da Skill Antigravity neste projeto:
- **O que é o Antigravity Agent:** É o agente gerenciado de inteligência artificial da Google (`antigravity-preview-09-2026`) capaz de executar código, gerenciar arquivos e pesquisar na web em um ambiente Linux isolado.
- **Status da Skill no Ambiente:** 
  - A skill do sistema **`gemini-interactions-api`** está disponível no ambiente e já possui o SDK `@google/genai` (versão `^2.4.0`) pré-instalado neste projeto.
  - No entanto, skills personalizadas ou arquivos salvos em outro projeto específico de auditoria ficam isolados naquele respectivo projeto por segurança e não são importados automaticamente entre applets diferentes.
  - **Como ativar caso deseje:** Você pode colar aqui o trecho ou as regras da auditoria que você usou no outro projeto, e podemos integrá-la a este aplicativo criando uma rota de auditoria automática de código ou gerador de tarefas inteligentes com o modelo Antigravity!

---

## ⌨️ Atalhos de Teclado & Acessibilidade

- <kbd>Enter</kbd> no campo de texto: Adiciona a tarefa imediatamente.
- <kbd>Tab</kbd> / <kbd>Shift + Tab</kbd>: Navega entre tarefas, botões e campos de forma acessível.
- <kbd>Espaço</kbd> ou <kbd>Enter</kbd> no marcador: Marca/desmarca a tarefa como concluída.
- Contraste de cores em conformidade com as diretrizes **WCAG AA** para texto normal e componentes interativos.
- Rótulos `aria-label` e estados `role="progressbar"` e `role="dialog"` para compatibilidade com leitores de tela.

---

*Projeto desenvolvido com carinho para a Aula 3 de Desenvolvimento de Software.*
