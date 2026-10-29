/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: COMPONENTE DE ESTATÍSTICAS (TaskStats)
 * Este componente demonstra valores derivados (computed values).
 * Não precisamos criar um novo estado para a porcentagem ou para o número de concluídas;
 * nós calculamos esses números a partir da lista original de tarefas em memória!
 */

import React from 'react';
import { TaskStatistics } from '../types/todo';
import { CheckCircle2, Clock, ListChecks, Award } from 'lucide-react';

interface TaskStatsProps {
  stats: TaskStatistics;
}

export const TaskStats: React.FC<TaskStatsProps> = ({ stats }) => {
  const { total, completed, pending, completionRate } = stats;

  return (
    <section aria-label="Resumo das tarefas" className="grid grid-cols-2 lg:grid-cols-4 gap-3">
      {/* Total de Tarefas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span className="text-xs font-medium uppercase tracking-wider">Total</span>
          <ListChecks className="w-4 h-4 text-slate-400" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold font-mono tabular-nums text-slate-900 dark:text-white">
            {total}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
            {total === 1 ? 'atividade' : 'atividades'}
          </span>
        </div>
      </div>

      {/* Tarefas Pendentes */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span className="text-xs font-medium uppercase tracking-wider">Pendentes</span>
          <Clock className="w-4 h-4 text-amber-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold font-mono tabular-nums text-amber-600 dark:text-amber-400">
            {pending}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
            a fazer
          </span>
        </div>
      </div>

      {/* Tarefas Concluídas */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span className="text-xs font-medium uppercase tracking-wider">Concluídas</span>
          <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        </div>
        <div className="mt-2">
          <span className="text-2xl font-bold font-mono tabular-nums text-emerald-600 dark:text-emerald-400">
            {completed}
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 ml-1.5">
            finalizadas
          </span>
        </div>
      </div>

      {/* Taxa de Progresso */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col justify-between col-span-2 sm:col-span-1">
        <div className="flex items-center justify-between text-slate-500 dark:text-slate-400">
          <span className="text-xs font-medium uppercase tracking-wider">Progresso</span>
          <Award className="w-4 h-4 text-indigo-500" />
        </div>
        <div className="mt-2">
          <div className="flex items-baseline justify-between mb-1.5">
            <span className="text-2xl font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
              {completionRate}%
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {total > 0 && completed === total ? 'Tudo pronto!' : `${completed} de ${total}`}
            </span>
          </div>
          {/* Barra de progresso visual */}
          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
            <div
              className="bg-indigo-600 dark:bg-indigo-500 h-full rounded-full transition-all duration-300 ease-out"
              style={{ width: `${completionRate}%` }}
              role="progressbar"
              aria-valuenow={completionRate}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
