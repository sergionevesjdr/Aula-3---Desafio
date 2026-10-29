/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: COMPONENTE DE NOTIFICAÇÃO (Toast com Desfazer)
 * Permite ao usuário desfazer a exclusão de uma tarefa se tiver clicado por engano.
 */

import React from 'react';
import { RotateCcw, X, Trash2 } from 'lucide-react';

interface ToastProps {
  message: string;
  onUndo?: () => void;
  onDismiss: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  message,
  onUndo,
  onDismiss,
}) => {
  return (
    <div
      role="status"
      className="fixed bottom-5 right-5 z-40 max-w-sm bg-slate-900 text-white dark:bg-white dark:text-slate-900 px-4 py-3 rounded-xl shadow-lg border border-slate-800 dark:border-slate-200 flex items-center justify-between gap-3 text-xs animate-slideUp"
    >
      <div className="flex items-center gap-2">
        <Trash2 className="w-4 h-4 text-slate-400 dark:text-slate-500 shrink-0" />
        <span className="font-medium">{message}</span>
      </div>

      <div className="flex items-center gap-2">
        {onUndo && (
          <button
            type="button"
            onClick={onUndo}
            className="flex items-center gap-1 font-semibold text-indigo-400 dark:text-indigo-600 hover:underline cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Desfazer</span>
          </button>
        )}
        <button
          type="button"
          onClick={onDismiss}
          className="text-slate-400 hover:text-white dark:hover:text-slate-900 cursor-pointer p-0.5"
          aria-label="Fechar notificação"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
