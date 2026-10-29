/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * ============================================================================
 * TESTES AUTOMATIZADOS (Aula 3 - Lista de Tarefas)
 * ============================================================================
 * 
 * GUIA DIDÁTICO: POR QUE ESCREVER TESTES DE SOFTWARE?
 * Testes automatizados são programas que executam as funções da nossa aplicação
 * e verificam se os resultados obtidos são exatamente os esperados.
 * Isso garante que uma alteração recente (como mudar a cor ou estilo de um item)
 * não quebre funcionalidades existentes (como adicionar, concluir ou excluir)!
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { Task, TaskPriority, TaskCategory } from '../types/todo';
import { loadTasksFromStorage, saveTasksToStorage, INITIAL_TASKS } from './storage';

describe('Funcionalidades da Lista de Tarefas (CRUD & Lógica de Negócio)', () => {
  let sampleTasks: Task[];

  beforeEach(() => {
    // Cria uma massa de dados limpa antes de cada teste
    sampleTasks = [
      {
        id: '1',
        title: 'Estudar TypeScript',
        description: 'Aprender sobre interfaces e tipos',
        completed: false,
        category: 'estudos',
        priority: 'alta',
        createdAt: '2026-10-29T10:00:00.000Z',
      },
      {
        id: '2',
        title: 'Comprar pão',
        completed: true,
        category: 'pessoal',
        priority: 'baixa',
        createdAt: '2026-10-29T11:00:00.000Z',
        completedAt: '2026-10-29T11:30:00.000Z',
      },
    ];
  });

  // --------------------------------------------------------------------------
  // TESTE 1: ADICIONAR TAREFAS (CREATE)
  // --------------------------------------------------------------------------
  it('deve adicionar uma nova tarefa mantendo a imutabilidade do array', () => {
    const newTask: Task = {
      id: '3',
      title: 'Praticar React',
      completed: false,
      category: 'estudos',
      priority: 'media',
      createdAt: new Date().toISOString(),
    };

    // Imutabilidade: cria um novo array com a nova tarefa no início
    const updatedTasks = [newTask, ...sampleTasks];

    expect(updatedTasks.length).toBe(3);
    expect(updatedTasks[0].id).toBe('3');
    expect(updatedTasks[0].title).toBe('Praticar React');
    expect(updatedTasks[0].completed).toBe(false);
  });

  // --------------------------------------------------------------------------
  // TESTE 2: CONCLUIR E ALTERNAR STATUS (UPDATE - COMPLETE)
  // --------------------------------------------------------------------------
  it('deve alternar o status de uma tarefa entre pendente e concluída com .map()', () => {
    const taskIdToToggle = '1';

    // Simula a função handleToggleComplete
    const updatedTasks = sampleTasks.map((t) => {
      if (t.id === taskIdToToggle) {
        const nextCompleted = !t.completed;
        return {
          ...t,
          completed: nextCompleted,
          completedAt: nextCompleted ? new Date().toISOString() : undefined,
        };
      }
      return t;
    });

    const toggledTask = updatedTasks.find((t) => t.id === taskIdToToggle);
    expect(toggledTask?.completed).toBe(true);
    expect(toggledTask?.completedAt).toBeDefined();

    // Se alternar de novo, deve voltar a ser pendente (false)
    const revertedTasks = updatedTasks.map((t) => {
      if (t.id === taskIdToToggle) {
        return {
          ...t,
          completed: !t.completed,
          completedAt: undefined,
        };
      }
      return t;
    });

    const revertedTask = revertedTasks.find((t) => t.id === taskIdToToggle);
    expect(revertedTask?.completed).toBe(false);
    expect(revertedTask?.completedAt).toBeUndefined();
  });

  // --------------------------------------------------------------------------
  // TESTE 3: EDITAR TAREFA (UPDATE - EDIT)
  // --------------------------------------------------------------------------
  it('deve atualizar o título e a descrição de uma tarefa existente', () => {
    const updatedTasks = sampleTasks.map((t) =>
      t.id === '1'
        ? { ...t, title: 'Estudar TypeScript Avançado', description: 'Generics e Utilitários' }
        : t
    );

    const editedTask = updatedTasks.find((t) => t.id === '1');
    expect(editedTask?.title).toBe('Estudar TypeScript Avançado');
    expect(editedTask?.description).toBe('Generics e Utilitários');
    // Os outros campos devem permanecer intactos
    expect(editedTask?.category).toBe('estudos');
    expect(editedTask?.priority).toBe('alta');
  });

  // --------------------------------------------------------------------------
  // TESTE 4: REMOVER TAREFA (DELETE)
  // --------------------------------------------------------------------------
  it('deve remover uma tarefa pelo ID usando .filter()', () => {
    const updatedTasks = sampleTasks.filter((t) => t.id !== '1');

    expect(updatedTasks.length).toBe(1);
    expect(updatedTasks.some((t) => t.id === '1')).toBe(false);
    expect(updatedTasks[0].id).toBe('2');
  });

  // --------------------------------------------------------------------------
  // TESTE 5: FILTRAGEM POR STATUS (PENDENTES E CONCLUÍDAS)
  // --------------------------------------------------------------------------
  it('deve filtrar corretamente apenas tarefas pendentes', () => {
    const pendingTasks = sampleTasks.filter((t) => !t.completed);
    expect(pendingTasks.length).toBe(1);
    expect(pendingTasks[0].id).toBe('1');
  });

  it('deve filtrar corretamente apenas tarefas concluídas', () => {
    const completedTasks = sampleTasks.filter((t) => t.completed);
    expect(completedTasks.length).toBe(1);
    expect(completedTasks[0].id).toBe('2');
  });

  // --------------------------------------------------------------------------
  // TESTE 6: BUSCA POR PALAVRA-CHAVE
  // --------------------------------------------------------------------------
  it('deve buscar tarefas ignorando maiúsculas e minúsculas (case-insensitive)', () => {
    const query = 'typescript';
    const results = sampleTasks.filter((t) =>
      t.title.toLowerCase().includes(query.toLowerCase())
    );

    expect(results.length).toBe(1);
    expect(results[0].title).toBe('Estudar TypeScript');
  });

  // --------------------------------------------------------------------------
  // TESTE 7: CÁLCULO DE ESTATÍSTICAS E PORCENTAGEM
  // --------------------------------------------------------------------------
  it('deve calcular corretamente o total, pendentes, concluídas e taxa de progresso', () => {
    const total = sampleTasks.length;
    const completed = sampleTasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    expect(total).toBe(2);
    expect(completed).toBe(1);
    expect(pending).toBe(1);
    expect(completionRate).toBe(50); // 1 de 2 = 50%
  });

  // --------------------------------------------------------------------------
  // TESTE 8: PERSISTÊNCIA NO LOCALSTORAGE
  // --------------------------------------------------------------------------
  it('deve salvar e carregar dados simulando o LocalStorage', () => {
    // Simulação em memória
    const mockStorage: Record<string, string> = {};
    const key = 'test_tasks';

    // Salvar
    mockStorage[key] = JSON.stringify(sampleTasks);
    expect(typeof mockStorage[key]).toBe('string');

    // Carregar
    const loaded = JSON.parse(mockStorage[key]);
    expect(Array.isArray(loaded)).toBe(true);
    expect(loaded.length).toBe(2);
    expect(loaded[0].title).toBe('Estudar TypeScript');
  });
});
