/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: ITEM INDIVIDUAL DE TAREFA (TaskItem)
 * Representa um único elemento da lista. Demonstra:
 * - ESTILIZAÇÃO CONDICIONAL: Usamos operadores ternários (task.completed ? '...' : '...')
 *   para aplicar classes CSS diferentes dependendo se a tarefa está concluída ou pendente.
 * - Alternância de estado (concluir/desmarcar) via callback `onToggleComplete(task.id)`
 * - Remoção via callback `onDelete(task.id)`
 * - Modo de edição inline (`isEditing`) com salvamento e cancelamento
 * - Imutabilidade: nunca alteramos `task` diretamente.
 */

import React, { useState } from 'react';
import { Check, Trash2, Edit3, CheckCircle2, Clock } from 'lucide-react';
import { Task } from '../types/todo';

interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedFields: Partial<Task>) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  task,
  onToggleComplete,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editDescription, setEditDescription] = useState(task.description || '');

  // Formatação de data amigável em português
  const formatTaskDate = (dateIso: string) => {
    try {
      const date = new Date(dateIso);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: 'short',
        hour: '2-digit',
        minute: '2-digit',
      }).format(date);
    } catch {
      return '';
    }
  };

  const handleSaveEdit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const trimmed = editTitle.trim();
    if (!trimmed) return;

    onUpdate(task.id, {
      title: trimmed,
      description: editDescription.trim() ? editDescription.trim() : undefined,
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditTitle(task.title);
    setEditDescription(task.description || '');
    setIsEditing(false);
  };

  // Nomes amigáveis e cores sutis de prioridade
  const priorityLabels = {
    baixa: 'Baixa prioridade',
    media: 'Média prioridade',
    alta: 'Alta prioridade',
  };

  const priorityColors = {
    baixa: 'text-slate-500 dark:text-slate-400',
    media: 'text-amber-600 dark:text-amber-400 font-medium',
    alta: 'text-rose-600 dark:text-rose-400 font-medium',
  };

  const categoryLabels = {
    estudos: 'Estudos',
    trabalho: 'Trabalho',
    pessoal: 'Pessoal',
    saude: 'Saúde',
  };

  return (
    <div
      className={`group rounded-xl p-4 transition-all duration-200 border ${
        task.completed
          ? /* ESTILO 1: TAREFA CONCLUÍDA (Fundo suave esmeralda, borda esmeralda sutil, opacidade de descanso) */
            'bg-emerald-50/40 dark:bg-emerald-950/20 border-emerald-200/70 dark:border-emerald-900/50 shadow-2xs'
          : /* ESTILO 2: TAREFA PENDENTE (Card branco/escuro limpo, borda neutra e destaque ao passar o mouse) */
            'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-indigo-300 dark:hover:border-indigo-700 shadow-xs'
      }`}
    >
      {isEditing ? (
        /* Formulário de Edição Inline */
        <form onSubmit={handleSaveEdit} className="space-y-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Editar Título da Tarefa
            </label>
            <input
              type="text"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              className="w-full px-3 py-1.5 text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Editar Descrição / Anotações
            </label>
            <textarea
              value={editDescription}
              onChange={(e) => setEditDescription(e.target.value)}
              rows={2}
              className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 resize-none"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={handleCancelEdit}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-md transition-colors cursor-pointer"
            >
              Salvar Alterações
            </button>
          </div>
        </form>
      ) : (
        /* Visualização Padrão da Tarefa */
        <div className="flex items-start justify-between gap-3">
          {/* Lado Esquerdo: Botão Marcador + Textos */}
          <div className="flex items-start gap-3.5 flex-1 min-w-0">
            {/* Botão de Conclusão com Diferenciação Visual Forte */}
            <button
              type="button"
              onClick={() => onToggleComplete(task.id)}
              aria-label={task.completed ? 'Reabrir tarefa como pendente' : 'Marcar tarefa como concluída'}
              title={task.completed ? 'Clique para reabrir como pendente' : 'Clique para marcar como concluída'}
              className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center shrink-0 transition-all cursor-pointer ${
                task.completed
                  ? 'bg-emerald-600 text-white border-2 border-emerald-600 shadow-2xs hover:bg-emerald-700'
                  : 'border-2 border-slate-300 dark:border-slate-600 hover:border-indigo-600 dark:hover:border-indigo-400 bg-white dark:bg-slate-800 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
              }`}
            >
              {task.completed ? (
                <Check className="w-3.5 h-3.5 stroke-[3]" />
              ) : (
                <span className="w-1.5 h-1.5 rounded-full bg-transparent group-hover:bg-indigo-400 dark:group-hover:bg-indigo-500 transition-colors" />
              )}
            </button>

            {/* Conteúdo textual da tarefa */}
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2 flex-wrap">
                <h3
                  onClick={() => onToggleComplete(task.id)}
                  className={`text-sm cursor-pointer select-none leading-snug break-words transition-all ${
                    task.completed
                      ? /* Título Concluído: Riscado em esmeralda sutil, cor atenuada */
                        'line-through decoration-emerald-500/70 dark:decoration-emerald-400/70 text-slate-400 dark:text-slate-500 font-normal'
                      : /* Título Pendente: Fonte semi-bold, texto nítido */
                        'text-slate-900 dark:text-slate-100 font-medium hover:text-indigo-600 dark:hover:text-indigo-400'
                  }`}
                >
                  {task.title}
                </h3>
              </div>

              {task.description && (
                <p
                  className={`mt-1 text-xs leading-relaxed break-words transition-all ${
                    task.completed
                      ? 'line-through decoration-slate-300 dark:decoration-slate-700 text-slate-400 dark:text-slate-600'
                      : 'text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {task.description}
                </p>
              )}

              {/* Metadados Limpos e Diferenciados (Zero-Pill Discipline) */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                {task.completed ? (
                  /* Metadados para Tarefa Concluída */
                  <>
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Concluída</span>
                    </span>

                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

                    <span className="text-slate-600 dark:text-slate-400">
                      {categoryLabels[task.category] || task.category}
                    </span>

                    {task.completedAt && (
                      <>
                        <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                        <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">
                          Finalizada em {formatTaskDate(task.completedAt)}
                        </span>
                      </>
                    )}
                  </>
                ) : (
                  /* Metadados para Tarefa Pendente */
                  <>
                    <span className="inline-flex items-center gap-1 text-amber-600 dark:text-amber-400 font-medium">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Pendente</span>
                    </span>

                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

                    <span className="font-medium text-slate-700 dark:text-slate-300">
                      {categoryLabels[task.category] || task.category}
                    </span>

                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

                    <span className={priorityColors[task.priority]}>
                      {priorityLabels[task.priority]}
                    </span>

                    <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>

                    <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">
                      Criada em {formatTaskDate(task.createdAt)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Lado Direito: Ações (Editar e Remover) */}
          <div className="flex items-center gap-1 shrink-0 pt-0.5">
            {/* O botão de edição fica visível, com estilo adaptado */}
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              aria-label="Editar esta tarefa"
              title="Editar título e anotações"
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
            >
              <Edit3 className="w-4 h-4" />
            </button>

            {/* Botão de Excluir */}
            <button
              type="button"
              onClick={() => onDelete(task.id)}
              aria-label="Remover esta tarefa"
              title="Remover atividade"
              className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-md transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
