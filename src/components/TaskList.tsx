/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: RENDERIZAÇÃO DE LISTAS (TaskList)
 * Em React, para mostrar uma lista de itens usamos a função JavaScript `.map()`.
 * Cada item retornado PRECISA de uma propriedade especial chamada `key` (ex: `key={task.id}`).
 * O React usa essa chave única para saber exatamente qual elemento foi adicionado,
 * movido ou removido da tela sem ter que recriar toda a lista do zero!
 */

import React from 'react';
import { TaskItem } from './TaskItem';
import { Task } from '../types/todo';
import { CheckCircle2, RotateCcw, Trash, Sparkles } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
  totalTasksCount: number;
  completedTasksCount: number;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Task>) => void;
  onClearCompleted: () => void;
  onResetSampleTasks: () => void;
  onResetFilters: () => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  totalTasksCount,
  completedTasksCount,
  onToggleComplete,
  onDelete,
  onUpdate,
  onClearCompleted,
  onResetSampleTasks,
  onResetFilters,
}) => {
  // Estado 1: Lista geral está completamente vazia (usuário apagou tudo)
  if (totalTasksCount === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-4 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 mx-auto flex items-center justify-center">
          <Sparkles className="w-6 h-6" />
        </div>
        <div className="max-w-md mx-auto space-y-1">
          <h3 className="text-base font-semibold text-slate-900 dark:text-white">
            Sua lista está limpa!
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Nenhuma atividade cadastrada no momento. Adicione sua primeira tarefa no campo acima ou recarregue os exemplos didáticos.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={onResetSampleTasks}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/70 dark:text-indigo-300 dark:hover:bg-indigo-900/60 rounded-lg transition-colors cursor-pointer border border-indigo-200/60 dark:border-indigo-800/60"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar tarefas de exemplo</span>
          </button>
        </div>
      </div>
    );
  }

  // Estado 2: Existem tarefas, mas o filtro atual (ou busca) não encontrou nenhuma correspondência
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-8 text-center space-y-3 shadow-xs">
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            Nenhuma atividade encontrada
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Nenhuma tarefa corresponde aos filtros ou à palavra pesquisada.
          </p>
        </div>
        <div>
          <button
            type="button"
            onClick={onResetFilters}
            className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-medium cursor-pointer"
          >
            Limpar filtros de busca
          </button>
        </div>
      </div>
    );
  }

  // Estado 3: Lista com tarefas filtradas prontas para exibição
  return (
    <div className="space-y-3">
      {/* Contêiner da lista de tarefas */}
      <div className="space-y-2.5">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {/* Rodapé da lista com ações coletivas úteis */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 px-1 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800/60">
        <div>
          <span>
            Exibindo <strong className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{tasks.length}</strong> de{' '}
            <strong className="font-mono tabular-nums text-slate-700 dark:text-slate-300">{totalTasksCount}</strong> atividades
          </span>
        </div>

        <div className="flex items-center gap-3">
          {completedTasksCount > 0 && (
            <button
              type="button"
              onClick={onClearCompleted}
              className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors cursor-pointer"
            >
              <Trash className="w-3.5 h-3.5" />
              <span>Remover concluídas ({completedTasksCount})</span>
            </button>
          )}

          <button
            type="button"
            onClick={onResetSampleTasks}
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restaurar exemplos</span>
          </button>
        </div>
      </div>
    </div>
  );
};
