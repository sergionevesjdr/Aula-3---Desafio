/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UTILITÁRIO DE EXPORTAÇÃO DO PROJETO (Para a pasta Aula 3)
 * Cria um arquivo .ZIP completo com TODOS os arquivos reais do projeto,
 * permitindo que o usuário salve e descompacte diretamente em:
 * C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas
 */

import JSZip from 'jszip';

// Carrega todos os arquivos reais do projeto em formato de texto bruto via Vite
const rawFiles = import.meta.glob(
  [
    '/src/**/*',
    '/README.md',
    '/package.json',
    '/index.html',
    '/tsconfig.json',
    '/vite.config.ts',
    '/.gitignore',
  ],
  { query: '?raw', import: 'default', eager: true }
) as Record<string, string>;

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // Itera por cada arquivo do projeto e adiciona ao ZIP preservando a estrutura de pastas
  for (const [path, content] of Object.entries(rawFiles)) {
    // Remove a barra inicial (ex: '/src/App.tsx' vira 'src/App.tsx')
    const cleanPath = path.startsWith('/') ? path.slice(1) : path;
    if (typeof content === 'string') {
      zip.file(cleanPath, content);
    }
  }

  // Gera o arquivo ZIP binário e dispara o download no navegador
  const blob = await zip.generateAsync({ type: 'blob' });
  const blobUrl = URL.createObjectURL(blob);

  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = 'Aula_3_Lista_de_Tarefas.zip';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(blobUrl);
}
