---
name: auditoria-projetos
description: Skill universal de auditoria técnica profunda para projetos de software. Cobre qualidade de código, arquitetura, conformidade de segurança e privacidade (LGPD/COPPA/OWASP), cobertura de testes e pipeline de verificação contínua.
---

# SKILL: AUDITORIA TÉCNICA E QUALIDADE DE SOFTWARE (UNIVERSAL)

Esta Skill fornece a qualquer agente de inteligência artificial ou engenheiro de software um protocolo rigoroso e reproduzível para auditar, refatorar e homologar projetos de software em qualquer linguagem ou ecossistema (React, Node, Python, Vue, Mobile, APIs, etc.).

---

## 1. OBJETIVO DO AUDITOR

Atuar como Engenheiro de Software Sênior e Auditor Técnico Principal, inspecionando o repositório de ponta a ponta para identificar:
1. Vulnerabilidades de segurança e vazamentos de credenciais.
2. Débito técnico, código morto e falta de tipagem estrita.
3. Gargalos de arquitetura e acoplamento excessivo ("Context Anxiety").
4. Fragilidades na suíte de testes (cobertura falsa, ausência de testes de borda).
5. Desconformidades regulatórias (LGPD, COPPA, privacidade de dados).
6. Quebras de compilação ou falhas de build de produção.

---

## 2. OS 5 PILARES DA AUDITORIA

### Pilar 1: Qualidade de Código & Tipagem Estrita
- **TypeScript / Compilação Estrita**: Sem uso de `any` soltos em funções críticas de negócio. Interfaces e tipos explicitamente declarados.
- **Sanitização de Entrada**: Todas as entradas do usuário (inputs, parâmetros de URL, payloads de API) devem ser sanitizadas antes de qualquer processamento.
- **Princípio da Responsabilidade Única (SRP)**: Componentes e módulos não devem ultrapassar 300 linhas; se ultrapassarem, devem ser decompostos em submódulos atômicos.
- **Zero Código Morto**: Remover imports não utilizados, variáveis órfãs e consoles/logs de depuração temporários.

### Pilar 2: Arquitetura & Isolamento Modular
- **Context Engineering**: O código deve ser modular o bastante para que alterações pontuais não exijam reescrever o sistema inteiro.
- **Separação de Camadas**:
  - Camada de Apresentação (UI / Componentes)
  - Camada de Negócio (Services / UseCases / Parsers)
  - Camada de Dados (Storage / Repositories / APIs)
- **Tratamento de Exceções**: Erros devem ser capturados e tratados de forma pedagógica ou amigável, nunca expondo stack traces sensíveis para o usuário final.

### Pilar 3: Harness de Testes & Prevenção de Regressão
- **Suíte de Testes Automatizados**: Existência de testes unitários para todas as regras de negócio críticas.
- **Testes de Casos de Borda (Edge Cases)**: Testar explicitamente divisões por zero, strings vazias, caracteres especiais, valores nulos, limites máximos e mínimos.
- **Testes de UI / DOM**: Garantir que botões, cliques e estados de tela renderizem corretamente com atributos de acessibilidade (`aria-label`, `role`).
- **Idempotência**: Testes não devem depender de ordem de execução ou de estado global compartilhado.

### Pilar 4: Segurança, Privacidade & Conformidade
- **Zero Secrets no Código**: Nenhuma chave de API, senha de banco de dados ou token JWT hardcoded no repositório. Uso estrito de variáveis de ambiente (`.env.example`).
- **Privacidade por Design (LGPD Art. 14 / COPPA)**: Se o software atender crianças ou usuários em geral, não coletar dados sem consentimento explícito, não instalar trackers sem necessidade e garantir retenção mínima de dados.
- **OWASP Top 10**: Prevenção contra injeção de código (XSS, SQL Injection), manipulação de estados não autenticados e CSRF.

### Pilar 5: Loop Engineering & Critério "Done-When"
- **Pipeline Unificado**: Existência de um comando único que valida tudo (ex: `npm run check` ou `make test` ou `pytest && mypy`).
- **Zero Regressão**: Nenhuma alteração é considerada concluída ("Done") até que 100% dos linters, testes e builds passem com código de saída 0.
- **Reproduzibilidade**: Scripts de setup e execução claros no README do projeto.

---

## 3. ROTEIRO DE AUDITORIA PASSO A PASSO (WORKFLOW)

### Passo 1: Reconhecimento do Ambiente
1. Inspecionar o arquivo de dependências (`package.json`, `requirements.txt`, `pyproject.toml`, `go.mod`).
2. Verificar ferramentas de lint, formatação e testes configuradas.
3. Mapear a árvore de arquivos e diretórios principais.

### Passo 2: Análise Estática & Compilação
1. Executar o linter e o verificador de tipos (ex: `npm run lint` ou `npx tsc --noEmit`).
2. Documentar erros de tipagem, imports ausentes ou dependências obsoletas.

### Passo 3: Execução e Cobertura de Testes
1. Rodar a suíte completa de testes (ex: `npm run test` ou `vitest run`).
2. Rodar o relatório de cobertura (ex: `npm run test:coverage` ou `pytest --cov`).
3. Verificar módulos essenciais que estejam sem testes cobrindo seus caminhos alternativos.

### Passo 4: Auditoria de Segurança & Boas Práticas
1. Buscar por padrões de risco:
   - `eval(` ou `dangerouslySetInnerHTML`
   - Chaves privadas / strings com `Bearer `, `sk_live`, `AIzaSy`
   - Chamadas diretas a APIs externas sem timeout ou fallback
   - Dependências com vulnerabilidades críticas conhecidas

### Passo 5: Geração do Relatório de Auditoria
O auditor deve gerar um relatório claro e acionável seguindo o template abaixo.

---

## 4. TEMPLATE DE RELATÓRIO DE AUDITORIA

```markdown
# RELATÓRIO DE AUDITORIA TÉCNICA
**Projeto**: [Nome do Projeto]
**Data**: [Data da Auditoria]
**Auditor**: [Nome / Agente de IA]
**Nota de Saúde do Código**: [0 a 10]

---

### 1. Resumo Executivo
[Resumo em 3 a 5 linhas sobre o estado geral do software, principais forças e vulnerabilidades encontradas.]

---

### 2. Matriz de Conformidade
| Pilar de Auditoria | Status | Observação Principal |
| :--- | :---: | :--- |
| Qualidade de Código & Tipagem | [APROVADO / REQUER AJUSTE / CRÍTICO] | [...] |
| Arquitetura & Modularidade | [APROVADO / REQUER AJUSTE / CRÍTICO] | [...] |
| Suíte de Testes & Cobertura | [APROVADO / REQUER AJUSTE / CRÍTICO] | [...] |
| Segurança & Privacidade | [APROVADO / REQUER AJUSTE / CRÍTICO] | [...] |
| Pipeline & Done-When | [APROVADO / REQUER AJUSTE / CRÍTICO] | [...] |

---

### 3. Vulnerabilidades e Oportunidades de Melhoria Encontradas
1. **[SEVERIDADE ALTA / MÉDIA / BAIXA] - [Título do Problema]**
   - **Localização**: \`caminho/do/arquivo.ts:linha\`
   - **Impacto**: [Explicação do risco técnico ou de negócio]
   - **Correção Recomendada**: [Snippet de código ou instrução de correção]

---

### 4. Plano de Ação Imediato (Top 3 Prioridades)
1. [...]
2. [...]
3. [...]
```

---

## 5. COMO UTILIZAR ESTA SKILL EM OUTRO PROJETO
1. Copie este arquivo `SKILL_AUDITORIA.md` para a raiz ou para uma pasta `.agent/` ou `skills/` do seu novo projeto.
2. Instrua qualquer IA (Claude, ChatGPT, Gemini, Copilot, Cursor):
   > *"Por favor, leia o arquivo SKILL_AUDITORIA.md e execute uma auditoria técnica completa deste repositório seguindo rigorosamente os 5 pilares e gerando o relatório final."*
