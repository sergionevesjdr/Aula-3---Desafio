/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: MODAL DE EXPORTAÇÃO PARA AULA 3
 * Permite ao usuário salvar todo o projeto na pasta local:
 * C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas
 */

import React, { useState } from 'react';
import { X, FolderDown, Download, Check, Copy, Folder, Terminal, Sparkles } from 'lucide-react';
import { downloadProjectZip } from '../utils/exportProject';

interface ExportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const targetPath = `C:\\Users\\NEVES\\Downloads\\Aula 3 - Lista de Tarefas`;

  if (!isOpen) return null;

  const handleCopyPath = () => {
    navigator.clipboard.writeText(targetPath);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = async () => {
    setDownloading(true);
    try {
      await downloadProjectZip();
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-fadeIn">
      <div
        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl w-full max-w-xl flex flex-col shadow-2xl overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="export-modal-title"
      >
        {/* Cabeçalho */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/70 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <FolderDown className="w-4 h-4" />
            </div>
            <div>
              <h2 id="export-modal-title" className="text-base font-bold text-slate-900 dark:text-white">
                Salvar na sua pasta (Aula 3)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Baixe todos os arquivos do código-fonte para sua máquina
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Corpo com o caminho solicitado */}
        <div className="p-6 space-y-5 text-xs">
          {/* Caixa do Caminho no Computador */}
          <div>
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              Pasta de Destino no seu Windows:
            </label>
            <div className="flex items-center gap-2 p-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
              <Folder className="w-4 h-4 text-amber-500 shrink-0" />
              <code className="flex-1 font-mono text-[11px] text-slate-800 dark:text-slate-200 select-all truncate">
                {targetPath}
              </code>
              <button
                type="button"
                onClick={handleCopyPath}
                className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1 shrink-0 font-sans font-medium"
                title="Copiar caminho"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-500" />
                    <span className="text-emerald-600 dark:text-emerald-400">Copiado</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Botão de Download do Pacote Completo */}
          <div className="bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white text-xs mb-0.5">
                Código Completo com README e Configurações
              </h4>
              <p className="text-slate-600 dark:text-slate-400 text-[11px]">
                Gera o arquivo <code>Aula_3_Lista_de_Tarefas.zip</code> pronto para descompactar.
              </p>
            </div>

            <button
              type="button"
              onClick={handleDownload}
              disabled={downloading}
              className="w-full sm:w-auto px-4 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 disabled:opacity-50 rounded-lg transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer shadow-xs"
            >
              <Download className="w-4 h-4" />
              <span>{downloading ? 'Gerando .ZIP...' : 'Baixar Projeto (.ZIP)'}</span>
            </button>
          </div>

          {/* 3 Passos Simples para o Aluno */}
          <div className="space-y-2.5 pt-1">
            <h4 className="font-semibold text-slate-900 dark:text-white text-xs">
              Instruções de como organizar na sua pasta:
            </h4>

            <ol className="space-y-2 list-decimal list-inside text-slate-600 dark:text-slate-400 leading-relaxed">
              <li>
                Clique no botão verde acima <strong>"Baixar Projeto (.ZIP)"</strong> para salvar o arquivo na sua pasta Downloads.
              </li>
              <li>
                Abra a pasta <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Downloads</code> no Windows Explorer e extraia o conteúdo para dentro de <code className="bg-slate-100 dark:bg-slate-800 px-1 py-0.5 rounded">Aula 3 - Lista de Tarefas</code>.
              </li>
              <li>
                Abra o terminal (Prompt de Comando ou VS Code) dentro dessa pasta e digite:
                <div className="mt-1.5 p-2 bg-slate-900 text-slate-100 rounded-md font-mono text-[11px] flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>npm install && npm run dev</span>
                </div>
              </li>
            </ol>
          </div>
        </div>

        {/* Rodapé */}
        <div className="px-6 py-3 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
