# 🛡️ SKILL DE AUDITORIA TÉCNICA DE SOFTWARE (5 PILARES)

Este documento estabelece o protocolo formal de auditoria técnica para aplicações web modernas (React, TypeScript, Vite, Tailwind CSS), estruturado em **5 Pilares de Excelência em Engenharia de Software**.

---

## 🎯 Os 5 Pilares da Auditoria

### Pilar 1: Arquitetura & Manutenibilidade
- **Separação de Responsabilidades (SRP):** Cada componente deve possuir uma única razão para mudar (ex: `TaskInput` cuida exclusivamente da entrada; `TaskStats` de métricas; `TaskItem` de apresentação unitária).
- **Tipagem Estrita (TypeScript):** Uso de interfaces e tipos explícitos sem recurso a `any` ou type assertions perigosas.
- **Imutabilidade e Estado Reativo:** Manipulação de estado sem mutação direta de arrays (`.map()`, `.filter()`, spread operator `[...]`).
- **Organização Modular:** Estrutura limpa de diretórios (`src/components`, `src/types`, `src/utils`).

### Pilar 2: Confiabilidade, Testes & Tolerância a Falhas
- **Suíte de Testes Automatizados:** Testes unitários cobrindo 100% dos fluxos centrais (CRUD, filtros, busca, ordenação).
- **Tratamento Defensivo de Erros:** Blocos `try/catch` para interações com APIs externas, parsing JSON e `localStorage`.
- **Prevenção de Regressões:** Testes executáveis via script padronizado (`npm test`).

### Pilar 3: Segurança & Conformidade
- **Auditoria de Dependências:** Análise de vulnerabilidades na árvore de pacotes (`npm audit` / `bun audit`).
- **Sanitização contra XSS:** Renderização segura de conteúdo textual via React JSX sem `dangerouslySetInnerHTML`.
- **Gestão de Segredos:** Ausência de chaves de API, senhas ou tokens sensíveis no código client-side; utilização de `.env.example`.
- **Validação de Entrada:** Tratamento e sanitização de strings enviadas pelo usuário antes do processamento.

### Pilar 4: Performance, Eficiência & Otimização
- **Velocidade de Build e Empacotamento:** Otimização com Vite e Rollup para builds rápidos em produção.
- **Prevenção de Re-renderizações Desnecessárias:** Utilização de `useMemo` para computações pesadas e filtros.
- **Tabular Figures & Estabilidade de Layout:** `tabular-nums` para números dinâmicos evitando layout shift (CLS).
- **Tamanho dos Chunks:** Separação de código e carregamento eficiente de assets.

### Pilar 5: Acessibilidade (a11y), Usabilidade & Design
- **Conformidade WCAG 2.1 Nível AA:** Relação de contraste de cores $\ge 4.5:1$ para texto comum e $\ge 3:1$ para elementos interativos.
- **Navegação por Teclado:** Acessibilidade completa via <kbd>Tab</kbd>, <kbd>Enter</kbd> e <kbd>Escape</kbd>.
- **Semântica HTML e ARIA:** Uso de tags nativas (`<header>`, `<main>`, `<section>`, `<button>`) e atributos `aria-label`, `aria-expanded`, `role="status"`, `role="progressbar"`.
- **Suporte a Temas:** Alternância consistente de Dark Mode e Light Mode sem quebra de contraste.
- **Design Anti-Slop:** Tipografia profissional com hierarquia clara, sem decorações vazias ou fake indicators.
