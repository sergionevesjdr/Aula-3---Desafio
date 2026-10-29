/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: FILTROS E PESQUISA (TaskFilters)
 * Este componente demonstra filtros reativos.
 * Conforme o usuário clica nas abas ("Todas", "Pendentes", "Concluídas")
 * ou digita no campo de busca, o componente pai re-calcula a lista exibida instantaneamente,
 * sem recarregar a página!
 */

import React from 'react';
import { Search, X, ArrowUpDown, Filter } from 'lucide-react';
import { FilterStatus, SortOrder, TaskCategory } from '../types/todo';

interface TaskFiltersProps {
  statusFilter: FilterStatus;
  onChangeStatusFilter: (status: FilterStatus) => void;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  categoryFilter: string; // 'todas' ou uma categoria
  onChangeCategoryFilter: (category: string) => void;
  sortOrder: SortOrder;
  onChangeSortOrder: (sort: SortOrder) => void;
  counts: {
    todas: number;
    pendentes: number;
    concluidas: number;
  };
}

export const TaskFilters: React.FC<TaskFiltersProps> = ({
  statusFilter,
  onChangeStatusFilter,
  searchQuery,
  onChangeSearchQuery,
  categoryFilter,
  onChangeCategoryFilter,
  sortOrder,
  onChangeSortOrder,
  counts,
}) => {
  return (
    <div className="space-y-3">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Controle Segmentado: Todas / Pendentes / Concluídas */}
        <div className="inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-800/80 rounded-lg shrink-0 self-start md:self-auto">
          <button
            type="button"
            onClick={() => onChangeStatusFilter('todas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              statusFilter === 'todas'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Todas <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">({counts.todas})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeStatusFilter('pendentes')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              statusFilter === 'pendentes'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Pendentes <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">({counts.pendentes})</span>
          </button>

          <button
            type="button"
            onClick={() => onChangeStatusFilter('concluidas')}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              statusFilter === 'concluidas'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Concluídas <span className="font-mono tabular-nums text-slate-400 dark:text-slate-500">({counts.concluidas})</span>
          </button>
        </div>

        {/* Campo de Pesquisa em Tempo Real */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onChangeSearchQuery(e.target.value)}
            placeholder="Buscar por palavra-chave..."
            className="w-full pl-9 pr-8 py-1.5 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onChangeSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer p-0.5"
              aria-label="Limpar busca"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Linha secundária de filtros: Categoria e Ordenação */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 text-xs">
        {/* Filtro por Categoria */}
        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400">Categoria:</span>
          <select
            value={categoryFilter}
            onChange={(e) => onChangeCategoryFilter(e.target.value)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
          >
            <option value="todas">Todas as categorias</option>
            <option value="estudos">Estudos 📚</option>
            <option value="trabalho">Trabalho 💼</option>
            <option value="pessoal">Pessoal 🏠</option>
            <option value="saude">Saúde 🏃</option>
          </select>
        </div>

        {/* Ordenação */}
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-500 dark:text-slate-400">Ordenar por:</span>
          <select
            value={sortOrder}
            onChange={(e) => onChangeSortOrder(e.target.value as SortOrder)}
            className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-md px-2.5 py-1 text-slate-700 dark:text-slate-300 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/30 cursor-pointer"
          >
            <option value="recentes">Mais recentes primeiro</option>
            <option value="antigas">Mais antigas primeiro</option>
            <option value="prioridade">Maior prioridade</option>
            <option value="alfabetica">Ordem alfabética (A-Z)</option>
          </select>
        </div>
      </div>
    </div>
  );
};
