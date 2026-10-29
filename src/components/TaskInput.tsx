/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: FORMULÁRIO DE ENTRADA (TaskInput)
 * Demonstra um formulário controlado ("controlled input") em React:
 * 1. Cada campo de texto tem seu valor amarrado a uma variável de estado local (`title`, `category`, etc.).
 * 2. Quando o usuário digita (`onChange`), atualizamos o estado.
 * 3. No envio (`onSubmit`), usamos `event.preventDefault()` para impedir que a página recarregue,
 *    e chamamos a função `onAddTask` recebida via props.
 */

import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Sparkles, Tag, AlertCircle } from 'lucide-react';
import { TaskCategory, TaskPriority } from '../types/todo';

interface TaskInputProps {
  onAddTask: (data: {
    title: string;
    description?: string;
    category: TaskCategory;
    priority: TaskPriority;
  }) => void;
}

export const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState<TaskCategory>('estudos');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [isExpanded, setIsExpanded] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples: não permitir tarefa vazia
    const trimmedTitle = title.trim();
    if (!trimmedTitle) {
      setErrorMessage('Por favor, digite um título para a atividade.');
      return;
    }

    onAddTask({
      title: trimmedTitle,
      description: description.trim() ? description.trim() : undefined,
      category,
      priority,
    });

    // Limpa os campos após salvar
    setTitle('');
    setDescription('');
    setErrorMessage('');
    setIsExpanded(false);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs transition-colors">
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Campo Principal */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5">
          <div className="relative flex-1">
            <input
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="Adicionar uma nova tarefa... (Pressione Enter para salvar)"
              className="w-full px-4 py-2.5 text-sm bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* Botão de expandir opções extras */}
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-label={isExpanded ? 'Recolher detalhes' : 'Expandir mais opções da tarefa'}
              className="px-3 py-2.5 text-xs font-medium text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 whitespace-nowrap cursor-pointer"
            >
              <Tag className="w-3.5 h-3.5 text-slate-500" />
              <span>{isExpanded ? 'Menos opções' : 'Opções'}</span>
              {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
            </button>

            {/* Botão de Enviar */}
            <button
              type="submit"
              className="flex-1 sm:flex-none px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 rounded-lg transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>

        {/* Mensagem de validação de erro amigável */}
        {errorMessage && (
          <div className="flex items-center gap-2 text-xs text-rose-600 dark:text-rose-400 font-medium pt-1">
            <AlertCircle className="w-3.5 h-3.5 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Detalhes Opcionais Expandidos */}
        {isExpanded && (
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3 animate-fadeIn">
            {/* Descrição Adicional */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Descrição ou anotações (opcional)
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detalhes adicionais, links ou passos..."
                rows={2}
                className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none"
              />
            </div>

            {/* Seleção de Categoria */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Categoria
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as TaskCategory)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="estudos">Estudos 📚</option>
                <option value="trabalho">Trabalho 💼</option>
                <option value="pessoal">Pessoal 🏠</option>
                <option value="saude">Saúde & Bem-estar 🏃</option>
              </select>
            </div>

            {/* Seleção de Prioridade */}
            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">
                Prioridade
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as TaskPriority)}
                className="w-full px-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700/80 rounded-lg text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all cursor-pointer"
              >
                <option value="baixa">Baixa (Pode esperar)</option>
                <option value="media">Média (Importante)</option>
                <option value="alta">Alta (Urgente)</option>
              </select>
            </div>

            {/* Dica rápida */}
            <div className="flex items-center text-xs text-slate-500 dark:text-slate-400 pt-5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500 mr-1.5 shrink-0" />
              <span>Dica: Pressione Enter no título para adicionar direto!</span>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};
