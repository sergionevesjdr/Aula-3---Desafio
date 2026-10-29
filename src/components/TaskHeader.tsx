/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: COMPONENTE DE CABEÇALHO (TaskHeader)
 * Um componente React é uma função que retorna pedaços de interface (JSX).
 * Recebe "props" (propriedades) enviadas pelo componente pai (App.tsx),
 * permitindo que o cabeçalho saiba quando abrir o modal de guia ou alternar o tema escuro.
 */

import React from 'react';
import { BookOpen, Moon, Sun, CheckCircle2, FolderDown } from 'lucide-react';

interface TaskHeaderProps {
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenCodeGuide: () => void;
  onOpenExportModal: () => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  isDarkMode,
  onToggleTheme,
  onOpenCodeGuide,
  onOpenExportModal,
}) => {
  // Data atual formatada em português brasileiro
  const todayFormatted = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  }).format(new Date());

  const capitalizedDate = todayFormatted.charAt(0).toUpperCase() + todayFormatted.slice(1);

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-5 border-b border-slate-200 dark:border-slate-800">
      {/* Zona 1: Título e Marca principal */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center shadow-xs">
          <CheckCircle2 className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap block">
            Tarefas Simples
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
            {capitalizedDate} · Aula 3
          </span>
        </div>
      </div>

      {/* Zona 2: Ações do cabeçalho */}
      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto flex-wrap">
        {/* Botão de Salvar/Exportar para a pasta Aula 3 */}
        <button
          onClick={onOpenExportModal}
          type="button"
          aria-label="Salvar arquivos na pasta Aula 3"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:text-emerald-300 dark:hover:bg-emerald-900/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-emerald-200/60 dark:border-emerald-800/40"
        >
          <FolderDown className="w-4 h-4" />
          <span>Salvar na Pasta (Aula 3)</span>
        </button>

        {/* Botão do Guia de Código */}
        <button
          onClick={onOpenCodeGuide}
          type="button"
          aria-label="Abrir guia de como este código foi construído"
          className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60 rounded-lg transition-colors whitespace-nowrap cursor-pointer border border-indigo-200/60 dark:border-indigo-800/40"
        >
          <BookOpen className="w-4 h-4" />
          <span className="hidden md:inline">Como este código funciona?</span>
          <span className="md:hidden">Guia</span>
        </button>

        {/* Alternador de Tema Claro/Escuro */}
        <button
          onClick={onToggleTheme}
          type="button"
          aria-label={isDarkMode ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
          className="p-2 text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors cursor-pointer"
        >
          {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
        </button>
      </div>
    </header>
  );
};
