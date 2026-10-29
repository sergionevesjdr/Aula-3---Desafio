/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * GUIA DIDÁTICO: TIPAGEM COM TYPESCRIPT
 * Uma "interface" define a forma ou contrato dos dados no nosso aplicativo.
 * Ela garante que cada tarefa sempre possua os campos necessários (como id, título e status).
 */

export type TaskCategory = 'trabalho' | 'estudos' | 'pessoal' | 'saude';

export type TaskPriority = 'baixa' | 'media' | 'alta';

export interface Task {
  id: string;              // Identificador único (ex: 'task_1714000000000')
  title: string;           // O que precisa ser feito (título da tarefa)
  description?: string;     // Detalhes opcionais
  completed: boolean;      // Verdadeiro (feita) ou falso (pendente)
  category: TaskCategory;  // Categoria para organização
  priority: TaskPriority;  // Nível de urgência
  createdAt: string;       // Data de criação formatada em ISO
  completedAt?: string;    // Data de conclusão quando finalizada
}

export type FilterStatus = 'todas' | 'pendentes' | 'concluidas';

export type SortOrder = 'recentes' | 'antigas' | 'prioridade' | 'alfabetica';

export interface TaskStatistics {
  total: number;
  completed: number;
  pending: number;
  completionRate: number; // Porcentagem de 0 a 100
}
