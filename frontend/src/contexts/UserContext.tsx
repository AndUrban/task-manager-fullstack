'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';

interface User {
  id: number;
  name: string;
  email: string;
}

interface UserContextType {
  users: User[];
  loading: boolean;
  error: string | null;
  deleteUser: (id: number) => Promise<void>;
  createUser: (name: string, email: string) => Promise<void>;
  fetchUsers: () => Promise<void>; //Força reload manual
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get<User[]>(`${process.env.NEXT_PUBLIC_API_URL}/users`);
      setUsers(res.data);
    } catch {
      setError('Erro ao carregar usuários');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (id: number) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/users/${id}`);
      setUsers((prev) => prev.filter((user) => user.id !== id));
    } catch {
      setError('Erro ao excluir usuário');
    }
  };

  //Cria usuário e atualiza lista automaticamente
  const createUser = async (name: string, email: string) => {
    try {
      await axios.post<User>(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        name,
        email,
      });

      //Atualiza a partir do backend
      await fetchUsers();
    } catch {
      setError('Erro ao criar usuário');
    }
  };


  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UserContext.Provider value={{ users, loading, error, deleteUser, createUser, fetchUsers }}>
      {children}
    </UserContext.Provider>
  );
};

//Hook reutilizável
export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext deve ser usado dentro de um UserProvider.");
  }
  return context;
};
