/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: MODAL EXPLICATIVO DA ARQUITETURA
 * Criado especialmente para quem está começando a aprender desenvolvimento de software.
 * Explica em detalhes cada parte deste projeto, conceitos de React, TypeScript e boas práticas.
 */

import React, { useState } from 'react';
import { X, Layers, Cpu, Database, Code2, BookOpen, CheckCircle, Lightbulb } from 'lucide-react';

interface CodeExplainerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CodeExplainerModal: React.FC<CodeExplainerModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [activeTab, setActiveTab] = useState<'arquitetura' | 'conceitos' | 'fluxo' | 'glossario'>('arquitetura');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-3xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/70 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
            <div>
              <h2 id="modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Como este projeto foi construído
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Guia didático de arquitetura e conceitos para quem está aprendendo a programar
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar guia"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Abas de Navegação Didática */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 px-6 bg-slate-50/50 dark:bg-slate-900/50 overflow-x-auto gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('arquitetura')}
            className={`px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'arquitetura'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Componentes & Pastas</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('conceitos')}
            className={`px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'conceitos'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Cpu className="w-3.5 h-3.5" />
            <span>5 Conceitos Essenciais do React</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('fluxo')}
            className={`px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'fluxo'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Database className="w-3.5 h-3.5" />
            <span>Fluxo de Dados (CRUD)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('glossario')}
            className={`px-3 py-2.5 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'glossario'
                ? 'border-indigo-600 text-indigo-600 dark:border-indigo-400 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Code2 className="w-3.5 h-3.5" />
            <span>Dicionário do Desenvolvedor</span>
          </button>
        </div>

        {/* Conteúdo com Scroll */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm flex-1">
          {/* ABA 1: COMPONENTES & PASTAS */}
          {activeTab === 'arquitetura' && (
            <div className="space-y-4">
              <div className="bg-indigo-50 dark:bg-indigo-950/40 p-3.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40 text-xs text-indigo-900 dark:text-indigo-200 flex items-start gap-2.5">
                <Lightbulb className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Por que dividir em componentes?</strong> No desenvolvimento moderno de software, dividimos a tela em pequenas peças independentes. Isso torna o código fácil de ler, testar, consertar e reutilizar.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/App.tsx
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    O <strong>Componente Raiz</strong>. Ele mantém a lista de tarefas no estado (<code>tasks</code>), gerencia o tema escuro e conecta todos os outros componentes.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/components/TaskInput.tsx
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Formulário de entrada. Captura o que você digita e dispara a criação de uma nova atividade quando você clica em "Adicionar" ou aperta Enter.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/components/TaskItem.tsx
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Um cartão individual de tarefa. Cuida de alternar o círculo de conclusão, ativar a edição do título e disparar a exclusão.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/components/TaskStats.tsx
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Painel com números e barra de progresso. Calcula dinamicamente quantas foram feitas e a porcentagem sem duplicar estado.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/components/TaskFilters.tsx
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Filtra tarefas entre "Todas", "Pendentes", "Concluídas", além de busca por texto em tempo real e ordenação.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1.5">
                  <span className="font-mono text-indigo-600 dark:text-indigo-400 font-semibold block">
                    src/utils/storage.ts
                  </span>
                  <p className="text-slate-600 dark:text-slate-400">
                    Salva e carrega os dados no navegador usando <code>localStorage</code> para que nada se perca ao fechar ou recarregar a janela.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ABA 2: 5 CONCEITOS DO REACT */}
          {activeTab === 'conceitos' && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    1. Estado (useState)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                    Variáveis normais em JavaScript não atualizam a tela quando mudam de valor. O <code>useState</code> é a memória do React: quando você chama <code>setTasks(...)</code>, o React redesenha a tela na velocidade da luz com os novos dados.
                  </p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-md text-[11px] font-mono overflow-x-auto">
{`const [tasks, setTasks] = useState<Task[]>([]);`}
                  </pre>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    2. Imutabilidade (Nunca altere dados diretamente)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                    Em React, nunca fazemos <code>tasks.push(...)</code> ou <code>delete task</code>. Sempre criamos um NOVO array com as alterações. Por isso usamos <code>.map()</code> para alterar e <code>.filter()</code> para remover!
                  </p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-md text-[11px] font-mono overflow-x-auto">
{`// ✅ Adicionar: cria um novo array com a nova tarefa no início
setTasks([novaTarefa, ...tasks]);

// ✅ Concluir: .map() cria uma nova lista alterando só a tarefa desejada
setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));

// ✅ Remover: .filter() cria uma lista sem a tarefa excluída
setTasks(tasks.filter(t => t.id !== id));`}
                  </pre>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    3. Props (Comunicação entre Pai e Filho)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    O componente pai (<code>App</code>) passa valores e funções para os componentes filhos através de "props". Quando um botão no filho é clicado, ele avisa o pai chamando a função que recebeu.
                  </p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-slate-50/50 dark:bg-slate-800/30">
                  <h4 className="font-semibold text-slate-900 dark:text-white text-xs uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-1">
                    4. Efeitos e Persistência (useEffect)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    O <code>useEffect</code> serve para sincronizar o React com o mundo exterior. Neste app, temos um efeito que observa a lista de tarefas e salva no <code>localStorage</code> automaticamente a cada clique!
                  </p>
                </div>

                <div className="border border-slate-200 dark:border-slate-800 rounded-xl p-4 bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200/60 dark:border-emerald-800/40">
                  <h4 className="font-semibold text-xs uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    5. Estilização Condicional (Operador Ternário no JSX)
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-2">
                    Para diferenciar visualmente as tarefas concluídas das pendentes, usamos a lógica <code>condição ? se_verdadeiro : se_falso</code> dentro da propriedade <code>className</code> no arquivo <code>TaskItem.tsx</code>:
                  </p>
                  <pre className="bg-slate-900 text-slate-100 p-2.5 rounded-md text-[11px] font-mono overflow-x-auto">
{`// No cartão (TaskItem.tsx):
className={task.completed 
  ? 'bg-emerald-50/40 border-emerald-200/70' // Concluída: fundo verde suave
  : 'bg-white border-slate-200 shadow-xs'    // Pendente: cartão nítido

// No título da tarefa:
className={task.completed 
  ? 'line-through text-slate-400'            // Concluída: riscado e atenuado
  : 'text-slate-900 font-medium'             // Pendente: texto forte e nítido
}`}
                  </pre>
                </div>
              </div>
            </div>
          )}

          {/* ABA 3: FLUXO CRUD */}
          {activeTab === 'fluxo' && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                Esta aplicação implementa o que os programadores chamam de <strong>CRUD</strong> (Create, Read, Update, Delete) — os 4 pilares de qualquer sistema:
              </p>

              <div className="space-y-2.5">
                <div className="flex items-start gap-3 p-3 bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-800/40 rounded-lg">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 shrink-0">C</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Create (Criar / Adicionar):</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      O usuário digita no <code>TaskInput</code>, clica em "Adicionar", o sistema gera um ID único e adiciona a nova tarefa no estado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-800/40 rounded-lg">
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400 shrink-0">R</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Read (Ler / Exibir):</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      O <code>TaskList</code> percorre o array com <code>.map()</code> e renderiza um <code>TaskItem</code> para cada item, respeitando a busca e o filtro selecionado.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-800/40 rounded-lg">
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">U</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Update (Atualizar / Concluir):</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      Ao clicar no círculo ou no botão de editar, o status <code>completed</code> se inverte ou os textos são salvos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-800/40 rounded-lg">
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400 shrink-0">D</span>
                  <div>
                    <strong className="text-slate-900 dark:text-white">Delete (Remover / Excluir):</strong>
                    <p className="text-slate-600 dark:text-slate-400 mt-0.5">
                      Ao clicar na lixeira, a função <code>.filter()</code> exclui a tarefa pelo seu ID, exibindo um aviso rápido com opção de "Desfazer".
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ABA 4: GLOSSÁRIO */}
          {activeTab === 'glossario' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">JSX</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Extensão que permite escrever código visual parecido com HTML diretamente dentro de arquivos JavaScript e TypeScript.
                </p>
              </div>

              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Hook</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Funções especiais do React que começam com "use" (como <code>useState</code> e <code>useEffect</code>), permitindo usar recursos do React em componentes funcionais.
                </p>
              </div>

              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">TypeScript Interface</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Um molde ou contrato que diz quais propriedades um objeto DEVE ter. O editor acusa erro antes mesmo de rodar o código se você errar um nome de campo.
                </p>
              </div>

              <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg">
                <span className="font-semibold text-slate-900 dark:text-white block mb-0.5">Tailwind CSS</span>
                <p className="text-slate-600 dark:text-slate-400">
                  Framework onde estilizamos os elementos adicionando classes utilitárias prontas direto na tag (ex: <code>p-4 rounded-xl flex</code>).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Rodapé do Modal */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Você pode reabrir este guia a qualquer momento pelo botão no topo da página.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
          >
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
