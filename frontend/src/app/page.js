'use client';

import { Box, Button, Typography, Card, CardContent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { PersonAdd, People, Assignment, TaskAlt } from '@mui/icons-material';

export default function Home() {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100%',
        bgcolor: 'background.default',
        px: 2,
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: '100%',
          boxShadow: 6,
          borderRadius: 3,
          textAlign: 'center',
          p: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            GERENCIE SEUS USUÁRIOS E SUAS TAREFAS
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom>
            Bem-vindo! Escolha abaixo a operção que deseja realizar:
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
            {/*Cadastrar Usuário*/}
            <Button
              variant="contained"
              startIcon={<PersonAdd />}
              onClick={() => router.push('/users/create')}
              sx={{
                background: 'linear-gradient(90deg, #2563eb, #3b82f6)',
                '&:hover': { background: 'linear-gradient(90deg, #1e40af, #2563eb)' },
                fontWeight: 'bold',
              }}
            >
              Cadastrar Usuário
            </Button>

            {/*Visualizar Usuários*/}
            <Button
              variant="contained"
              startIcon={<People />}
              onClick={() => router.push('/users/list')}
              sx={{
                background: 'linear-gradient(90deg, #3b82f6, #60a5fa)',
                '&:hover': { background: 'linear-gradient(90deg, #2563eb, #3b82f6)' },
                fontWeight: 'bold',
              }}
            >
              Visualizar Usuários
            </Button>

            {/*Registrar Tarefa*/}
            <Button
              variant="contained"
              startIcon={<Assignment />}
              onClick={() => router.push('/tasks/create')}
              sx={{
                background: 'linear-gradient(90deg, #7e22ce, #9333ea)',
                '&:hover': { background: 'linear-gradient(90deg, #6b21a8, #7e22ce)' },
                fontWeight: 'bold',
              }}
            >
              Registrar Tarefa
            </Button>

            {/*Visualizar Tarefas*/}
            <Button
              variant="contained"
              startIcon={<TaskAlt />}
              onClick={() => router.push('/tasks/list')}
              sx={{
                background: 'linear-gradient(90deg, #9333ea, #a855f7)',
                '&:hover': { background: 'linear-gradient(90deg, #7e22ce, #9333ea)' },
                fontWeight: 'bold',
              }}
            >
              Visualizar Tarefas
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
