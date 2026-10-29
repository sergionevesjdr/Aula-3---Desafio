/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * PROJETO: AULA 3 - LISTA DE TAREFAS (TO-DO LIST)
 * Pasta Local Destino: C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas
 * ============================================================================
 * 
 * GUIA DIDÁTICO: COMPONENTE PRINCIPAL (App.tsx)
 * Este é o coração da nossa aplicação React.
 * Ele centraliza os seguintes pilares:
 * 1. ESTADO GLOBAL (tasks): A lista de tarefas em memória.
 * 2. PERSISTÊNCIA (localStorage): Salva e recupera as tarefas automaticamente.
 * 3. DERIVAÇÃO DE DADOS: Filtra e ordena as tarefas sem duplicar o array original.
 * 4. AÇÕES CRUD:
 *    - Adicionar: handleAddTask
 *    - Concluir: handleToggleComplete
 *    - Editar: handleUpdateTask
 *    - Remover: handleDeleteTask (com opção de Desfazer!)
 */

import React, { useState, useEffect, useMemo } from 'react';
import confetti from 'canvas-confetti';
import { Task, FilterStatus, SortOrder, TaskCategory, TaskPriority } from './types/todo';
import { loadTasksFromStorage, saveTasksToStorage, INITIAL_TASKS } from './utils/storage';
import { TaskHeader } from './components/TaskHeader';
import { TaskStats } from './components/TaskStats';
import { TaskInput } from './components/TaskInput';
import { TaskFilters } from './components/TaskFilters';
import { TaskList } from './components/TaskList';
import { CodeExplainerModal } from './components/CodeExplainerModal';
import { ExportModal } from './components/ExportModal';
import { Toast } from './components/Toast';

export default function App() {
  // --------------------------------------------------------------------------
  // 1. ESTADOS DA APLICAÇÃO (React useState Hooks)
  // --------------------------------------------------------------------------

  // Lista principal de tarefas (carrega do localStorage na primeira execução)
  const [tasks, setTasks] = useState<Task[]>(() => loadTasksFromStorage());

  // Filtros ativos
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('todas');
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('todas');
  const [sortOrder, setSortOrder] = useState<SortOrder>('recentes');

  // Modais educativos e de exportação
  const [isCodeGuideOpen, setIsCodeGuideOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);

  // Notificação com opção de Desfazer para exclusões acidentais
  const [deletedTaskBackup, setDeletedTaskBackup] = useState<Task | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Tema Claro / Escuro
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme_preference');
      if (savedTheme) return savedTheme === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // --------------------------------------------------------------------------
  // 2. EFEITOS COLATERAIS (React useEffect Hooks)
  // --------------------------------------------------------------------------

  // Salva no LocalStorage sempre que a lista de tarefas mudar
  useEffect(() => {
    saveTasksToStorage(tasks);
  }, [tasks]);

  // Aplica a classe .dark na tag raiz <html>
  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme_preference', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme_preference', 'light');
    }
  }, [isDarkMode]);

  // --------------------------------------------------------------------------
  // 3. OPERAÇÕES DE TAREFAS (Adicionar, Concluir, Editar, Remover)
  // --------------------------------------------------------------------------

  /**
   * ADICIONAR UMA NOVA TAREFA
   * Gera um ID único e insere a nova tarefa no início da lista (imutabilidade).
   */
  const handleAddTask = (data: {
    title: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
  }) => {
    const newTask: Task = {
      id: `task_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      title: data.title,
      description: data.description,
      completed: false,
      category: data.category,
      priority: data.priority,
      createdAt: new Date().toISOString(),
    };

    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  /**
   * CONCLUIR OU DESMARCAR UMA TAREFA
   * Percorre a lista com .map() e inverte o valor de 'completed'.
   * Se todas as tarefas forem concluídas, dispara confetes comemorativos!
   */
  const handleToggleComplete = (id: string) => {
    setTasks((prevTasks) => {
      const updated = prevTasks.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            completedAt: nextCompleted ? new Date().toISOString() : undefined,
          };
        }
        return t;
      });

      // Se todas as tarefas ficarem concluídas, comemora com confetes
      const allDone = updated.length > 0 && updated.every((t) => t.completed);
      if (allDone) {
        confetti({
          particleCount: 60,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      return updated;
    });
  };

  /**
   * EDITAR OS DADOS DE UMA TAREFA
   */
  const handleUpdateTask = (id: string, updatedFields: Partial<Task>) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  /**
   * REMOVER UMA TAREFA
   * Guarda um backup temporário para possibilitar o "Desfazer".
   */
  const handleDeleteTask = (id: string) => {
    const target = tasks.find((t) => t.id === id);
    if (!target) return;

    setDeletedTaskBackup(target);
    setToastMessage(`"${target.title.slice(0, 25)}${target.title.length > 25 ? '...' : ''}" removida`);

    // Remove do array usando .filter()
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== id));
  };

  /**
   * DESFAZER A ÚLTIMA EXCLUSÃO
   */
  const handleUndoDelete = () => {
    if (!deletedTaskBackup) return;
    setTasks((prevTasks) => [deletedTaskBackup, ...prevTasks]);
    setDeletedTaskBackup(null);
    setToastMessage(null);
  };

  /**
   * REMOVER TODAS AS TAREFAS CONCLUÍDAS
   */
  const handleClearCompleted = () => {
    const countCompleted = tasks.filter((t) => t.completed).length;
    if (countCompleted === 0) return;

    if (window.confirm(`Tem certeza que deseja remover ${countCompleted} tarefa(s) concluída(s)?`)) {
      setTasks((prevTasks) => prevTasks.filter((t) => !t.completed));
    }
  };

  /**
   * RESTAURAR TAREFAS DE EXEMPLO DIDÁTICAS
   */
  const handleResetSampleTasks = () => {
    setTasks(INITIAL_TASKS);
    setStatusFilter('todas');
    setSearchQuery('');
    setCategoryFilter('todas');
  };

  // --------------------------------------------------------------------------
  // 4. CÁLCULO DE ESTATÍSTICAS E FILTRAGEM (Valores Derivados)
  // --------------------------------------------------------------------------

  // Estatísticas calculadas dinamicamente
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, pending, completionRate };
  }, [tasks]);

  // Contadores para as abas de filtro
  const filterCounts = useMemo(() => {
    return {
      todas: tasks.length,
      pendentes: tasks.filter((t) => !t.completed).length,
      concluidas: tasks.filter((t) => t.completed).length,
    };
  }, [tasks]);

  // Lista final filtrada e ordenada para exibição
  const visibleTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Filtro por Status
        if (statusFilter === 'pendentes' && task.completed) return false;
        if (statusFilter === 'concluidas' && !task.completed) return false;

        // Filtro por Categoria
        if (categoryFilter !== 'todas' && task.category !== categoryFilter) return false;

        // Filtro por Busca de Texto
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(query);
          const matchDesc = task.description?.toLowerCase().includes(query) ?? false;
          if (!matchTitle && !matchDesc) return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Ordenação
        if (sortOrder === 'recentes') {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        if (sortOrder === 'antigas') {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        }
        if (sortOrder === 'prioridade') {
          const weights: Record<TaskPriority, number> = { alta: 3, media: 2, baixa: 1 };
          return weights[b.priority] - weights[a.priority];
        }
        if (sortOrder === 'alfabetica') {
          return a.title.localeCompare(b.title, 'pt-BR');
        }
        return 0;
      });
  }, [tasks, statusFilter, categoryFilter, searchQuery, sortOrder]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Container Central com Largura Confortável */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Cabeçalho da Aplicação */}
        <TaskHeader
          isDarkMode={isDarkMode}
          onToggleTheme={() => setIsDarkMode(!isDarkMode)}
          onOpenCodeGuide={() => setIsCodeGuideOpen(true)}
          onOpenExportModal={() => setIsExportModalOpen(true)}
        />

        {/* Banner Informativo da Pasta Local (Aula 3) */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3.5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs shadow-2xs">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span className="text-slate-600 dark:text-slate-400">
              Projeto configurado para: <strong className="font-mono text-slate-800 dark:text-slate-200">C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas</strong>
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsExportModalOpen(true)}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer whitespace-nowrap"
          >
            Ver detalhes de exportação →
          </button>
        </div>

        {/* Painel de Métricas e Progresso */}
        <TaskStats stats={stats} />

        {/* Formulário para Adicionar Atividades */}
        <section aria-label="Adicionar nova atividade">
          <TaskInput onAddTask={handleAddTask} />
        </section>

        {/* Filtros e Busca */}
        <section aria-label="Filtrar e ordenar atividades">
          <TaskFilters
            statusFilter={statusFilter}
            onChangeStatusFilter={setStatusFilter}
            searchQuery={searchQuery}
            onChangeSearchQuery={setSearchQuery}
            categoryFilter={categoryFilter}
            onChangeCategoryFilter={setCategoryFilter}
            sortOrder={sortOrder}
            onChangeSortOrder={setSortOrder}
            counts={filterCounts}
          />
        </section>

        {/* Lista de Atividades */}
        <main aria-label="Lista de atividades">
          <TaskList
            tasks={visibleTasks}
            totalTasksCount={tasks.length}
            completedTasksCount={stats.completed}
            onToggleComplete={handleToggleComplete}
            onDelete={handleDeleteTask}
            onUpdate={handleUpdateTask}
            onClearCompleted={handleClearCompleted}
            onResetSampleTasks={handleResetSampleTasks}
            onResetFilters={() => {
              setStatusFilter('todas');
              setSearchQuery('');
              setCategoryFilter('todas');
            }}
          />
        </main>
      </div>

      {/* Modal Didático "Como este código funciona?" */}
      <CodeExplainerModal
        isOpen={isCodeGuideOpen}
        onClose={() => setIsCodeGuideOpen(false)}
      />

      {/* Modal de Exportação para a pasta Aula 3 */}
      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      {/* Notificação Toast com Desfazer */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          onUndo={deletedTaskBackup ? handleUndoDelete : undefined}
          onDismiss={() => setToastMessage(null)}
        />
      )}
    </div>
  );
}
