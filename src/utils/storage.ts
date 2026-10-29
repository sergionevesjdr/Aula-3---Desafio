/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: PERSISTÊNCIA COM LOCALSTORAGE
 * O LocalStorage é um banco de dados leve presente em todo navegador web moderno.
 * Ele guarda textos (strings). Por isso, usamos:
 * - JSON.stringify(dados) para transformar objetos/arrays em texto antes de salvar.
 * - JSON.parse(texto) para transformar o texto salvo de volta em objetos JavaScript.
 */

import { Task } from '../types/todo';

const STORAGE_KEY = 'minhas_tarefas_app_v1';

// Tarefas iniciais de exemplo para ajudar quem está aprendendo a explorar o app
export const INITIAL_TASKS: Task[] = [
  {
    id: 'tarefa-1',
    title: 'Adicionar minha primeira atividade nesta lista',
    description: 'Use a caixa de texto acima para digitar o título e clique em Adicionar.',
    completed: true,
    category: 'estudos',
    priority: 'alta',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    completedAt: new Date(Date.now() - 3600000 * 20).toISOString(),
  },
  {
    id: 'tarefa-2',
    title: 'Concluir ou desmarcar uma atividade clicando no círculo',
    description: 'Experimente clicar no marcador à esquerda para alternar o status entre pendente e concluída.',
    completed: false,
    category: 'estudos',
    priority: 'media',
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: 'tarefa-3',
    title: 'Explorar o botão "Como este código funciona?" no topo',
    description: 'Veja como componentes, estados (useState) e persistência (useEffect) funcionam na prática.',
    completed: false,
    category: 'estudos',
    priority: 'alta',
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
  {
    id: 'tarefa-4',
    title: 'Fazer uma pausa de 10 minutos e beber água',
    description: 'Equilíbrio e descanso são essenciais para manter o foco ao programar.',
    completed: false,
    category: 'saude',
    priority: 'baixa',
    createdAt: new Date().toISOString(),
  },
];

/**
 * Lê as tarefas salvas no navegador.
 * Caso o usuário esteja abrindo o app pela primeira vez, retorna as tarefas de exemplo.
 */
export function loadTasksFromStorage(): Task[] {
  try {
    const rawData = localStorage.getItem(STORAGE_KEY);
    if (!rawData) {
      return INITIAL_TASKS;
    }
    const parsed = JSON.parse(rawData);
    if (Array.isArray(parsed)) {
      return parsed;
    }
    return INITIAL_TASKS;
  } catch (error) {
    console.error('Erro ao ler tarefas do localStorage:', error);
    return INITIAL_TASKS;
  }
}

/**
 * Salva a lista atualizada de tarefas no localStorage.
 */
export function saveTasksToStorage(tasks: Task[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  } catch (error) {
    console.error('Erro ao salvar tarefas no localStorage:', error);
  }
}
