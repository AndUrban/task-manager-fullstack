'use client';

import { FormEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUserContext } from '@/contexts/UserContext';
import { useTaskContext } from '@/contexts/TaskContext';
import {
  Box,
  Typography,
  TextField,
  Button,
  MenuItem,
  Alert,
  CircularProgress,
  Snackbar,
} from '@mui/material';

export default function CreateTaskPage() {
  const router = useRouter();
  const { users, loading, error } = useUserContext();
  const { createTask } = useTaskContext();

  const [descricao, setDescricao] = useState('');
  const [selectedUserId, setSelectedUserId] = useState<number | ''>('');
  const [feedback, setFeedback] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (!loading && users.length > 0 && selectedUserId === '') {
      setSelectedUserId(users[0].id);
    }
  }, [loading, users, selectedUserId]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (selectedUserId === '' || !descricao.trim()) {
      setFeedback({ message: 'Preencha a descrição e selecione um usuário.', severity: 'error' });
      return;
    }

    try {
      await createTask(Number(selectedUserId), descricao);
      setFeedback({ message: 'Tarefa criada com sucesso!', severity: 'success' });

      setTimeout(() => router.push('/tasks/list'), 1500);
    } catch {
      setFeedback({ message: 'Erro ao criar tarefa.', severity: 'error' });
    }
  };

  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: 500,
          mx: 'auto',
          mt: 4,
          p: 3,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" component="h1" gutterBottom>
          Criar Tarefa
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <TextField
          select
          fullWidth
          label="Usuário"
          value={selectedUserId}
          onChange={(e) => setSelectedUserId(Number(e.target.value))}
          disabled={loading || users.length === 0}
          sx={{ mb: 2 }}
          required
        >
          {loading ? (
            <MenuItem disabled>
              <CircularProgress size={20} sx={{ mr: 1 }} /> Carregando...
            </MenuItem>
          ) : users.length === 0 ? (
            <MenuItem disabled>Nenhum usuário disponível</MenuItem>
          ) : (
            users.map((u) => (
              <MenuItem key={u.id} value={u.id}>
                {u.name} ({u.email})
              </MenuItem>
            ))
          )}
        </TextField>

        <TextField
          fullWidth
          label="Descrição"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          placeholder="Descreva a tarefa..."
          sx={{ mb: 2 }}
          required
        />

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loading || users.length === 0}
          >
            Criar Tarefa
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="error"
            onClick={() => router.push('/tasks/list')}
            sx={{
              '&:hover': {
                backgroundColor: '#dc3545',
                color: '#fff',
              },
              borderColor: '#dc3545',
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={!!feedback}
        autoHideDuration={3000}
        onClose={() => setFeedback(null)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert severity={feedback?.severity ?? 'success'} sx={{ width: '100%' }}>
          {feedback?.message ?? ''}
        </Alert>
      </Snackbar>
    </>
  );
}
