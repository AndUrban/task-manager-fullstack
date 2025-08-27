'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import { useUserContext } from './UserContext';

interface Task {
  id: number;
  descricao: string;
  status: string;
  user_id: number;
  user?: {
    id: number;
    name: string;
    email: string;
  };
}

interface TaskContextType {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  success: string | null;
  fetchTasks: () => Promise<void>;
  toggleStatus: (taskId: number, currentStatus: string) => Promise<void>;
  deleteTask: (taskId: number) => Promise<void>;
  createTask: (userId: number, descricao: string) => Promise<void>;
  clearMessages: () => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider = ({ children }: { children: ReactNode }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { users } = useUserContext(); //Lista de usuários já carregada

  //Carregar tarefas e enriquece com usuários
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`);
      const enrichedTasks = res.data.map((task) => {
        const user = users.find((u) => u.id === task.user_id);
        return {
          ...task,
          status: task.status || 'pendente', // Valor padrão
          user: user ? { ...user } : undefined,
        };
      });
      setTasks(enrichedTasks);
    } catch {
      setError('Erro ao carregar tarefas.');
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (taskId: number, currentStatus: string) => {
    const newStatus = currentStatus === 'pendente' ? 'feito' : 'pendente';
    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}/status`, {
        status: newStatus,
      });

      setTasks((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
      setSuccess(`Tarefa marcada como ${newStatus}.`);
    } catch {
      setError('Erro ao atualizar status da tarefa.');
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`);
      setTasks((prev) => prev.filter((task) => task.id !== taskId));
      setSuccess('Tarefa excluída com sucesso.');
    } catch {
      setError('Erro ao excluir tarefa.');
    }
  };

  //Cria tarefa e enriquece com usuário
  const createTask = async (userId: number, descricao: string) => {
    try {
      await axios.post<Task>(
        `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}/tasks`,
        { descricao, status: 'pendente' }
      );

      //Recarrega lista diretamente do backend
      await fetchTasks();

      setSuccess('Tarefa criada com sucesso.');
    } catch {
      setError('Erro ao criar tarefa.');
    }
  };

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  useEffect(() => {
    if (users.length > 0) {
      fetchTasks();
    }
  }, [users.length]); //Atualiza quando muda a quantidade de usuários


  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        success,
        fetchTasks,
        toggleStatus,
        deleteTask,
        createTask,
        clearMessages,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext deve ser usado dentro de um TaskProvider');
  }
  return context;
};
