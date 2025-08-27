'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  Snackbar,
} from '@mui/material';
import { useUserContext } from '@/contexts/UserContext';

export default function CreateUser() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [feedback, setFeedback] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);
  const router = useRouter();
  const { createUser } = useUserContext();

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFeedback(null);

    if (!name.trim()) {
      setFeedback({ message: 'O nome é obrigatório.', severity: 'error' });
      return;
    }

    if (!email.trim()) {
      setFeedback({ message: 'O email é obrigatório.', severity: 'error' });
      return;
    }

    if (!isValidEmail(email)) {
      setFeedback({ message: 'Formato de email inválido.', severity: 'error' });
      return;
    }

    try {
      await createUser(name, email);
      setFeedback({ message: 'Usuário criado com sucesso!', severity: 'success' });

      setTimeout(() => router.push('/users/list'), 1500);
    } catch {
      setFeedback({ message: 'Erro ao criar usuário.', severity: 'error' });
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
          Criar Usuário
        </Typography>

        <TextField
          fullWidth
          id="name"
          label="Nome"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Digite o nome do usuário"
          margin="normal"
          required
        />

        <TextField
          fullWidth
          id="email"
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Digite o email do usuário"
          margin="normal"
          required
        />

        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button type="submit" variant="contained" color="primary">
            Criar
          </Button>

          <Button
            variant="outlined"
            color="error"
            onClick={() => router.push('/users/list')}
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
