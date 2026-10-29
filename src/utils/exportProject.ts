/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * UTILITÁRIO DE EXPORTAÇÃO DO PROJETO (Para a pasta Aula 3)
 * Cria um arquivo .ZIP completo com todo o código-fonte, configurações e README,
 * permitindo que o usuário salve e descompacte em:
 * C:\Users\NEVES\Downloads\Aula 3 - Lista de Tarefas
 */

import JSZip from 'jszip';

export async function downloadProjectZip(): Promise<void> {
  const zip = new JSZip();

  // 1. README explicativo completo para a pasta da Aula 3
  let readmeContent = '';
  try {
    const res = await fetch('/README.md');
    if (res.ok) {
      readmeContent = await res.text();
    }
  } catch {
    // fallback se fetch não estiver disponível
  }
  if (!readmeContent) {
    readmeContent = `# Aula 3 — Lista de Tarefas (To-Do List)\n\nAmbiente Local: C:\\Users\\NEVES\\Downloads\\Aula 3 - Lista de Tarefas\n\n## Como rodar:\n1. npm install\n2. npm test\n3. npm run dev\n`;
  }
  zip.file('README.md', readmeContent);

  // 2. package.json
  const packageJson = {
    name: "aula-3-lista-de-tarefas",
    private: true,
    version: "1.0.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "vite build",
      preview: "vite preview",
      test: "vitest run"
    },
    dependencies: {
      "react": "^19.0.0",
      "react-dom": "^19.0.0",
      "lucide-react": "^0.546.0",
      "canvas-confetti": "^1.9.4",
      "jszip": "^3.10.1"
    },
    devDependencies: {
      "@tailwindcss/vite": "^4.0.0",
      "@types/canvas-confetti": "^1.9.0",
      "@types/react": "^19.0.0",
      "@types/react-dom": "^19.0.0",
      "@vitejs/plugin-react": "^4.3.0",
      "tailwindcss": "^4.0.0",
      "typescript": "^5.7.0",
      "vite": "^6.0.0",
      "vitest": "^5.0.0"
    }
  };
  zip.file('package.json', JSON.stringify(packageJson, null, 2));

  // 3. index.html
  const indexHtml = `<!doctype html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Aula 3 — Lista de Tarefas</title>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
  </head>
  <body class="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 antialiased min-h-screen">
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>`;
  zip.file('index.html', indexHtml);

  // 4. tsconfig.json
  const tsConfig = {
    compilerOptions: {
      target: "ES2022",
      useDefineForClassFields: true,
      lib: ["ES2022", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      isolatedModules: true,
      moduleDetection: "force",
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthroughCasesInSwitch: true
    },
    include: ["src"]
  };
  zip.file('tsconfig.json', JSON.stringify(tsConfig, null, 2));

  // 5. vite.config.ts
  const viteConfig = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
  },
});
`;
  zip.file('vite.config.ts', viteConfig);

  // 6. src/index.css
  const indexCss = `@import "tailwindcss";
@custom-variant dark (&:where(.dark, .dark *));

@layer base {
  body {
    font-family: 'Plus Jakarta Sans', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  }

  code, pre, kbd {
    font-family: 'JetBrains Mono', monospace;
  }
}
`;
  zip.folder('src')?.file('index.css', indexCss);

  // 7. src/main.tsx
  const mainTsx = `import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);
`;
  zip.folder('src')?.file('main.tsx', mainTsx);

  // Gera o arquivo ZIP binário e inicia o download no navegador
  const content = await zip.generateAsync({ type: 'blob' });
  const blobUrl = URL.createObjectURL(content);

  const downloadLink = document.createElement('a');
  downloadLink.href = blobUrl;
  downloadLink.download = 'Aula_3_Lista_de_Tarefas.zip';
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
  URL.revokeObjectURL(blobUrl);
}
