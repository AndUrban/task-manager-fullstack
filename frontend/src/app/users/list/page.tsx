'use client';

import { useUserContext } from '@/contexts/UserContext';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useEffect, useState } from 'react';

export default function UserListPage() {
  const { users, loading, error, deleteUser } = useUserContext();
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<{ id: number; name: string } | null>(null);

  const [feedback, setFeedback] = useState<{ message: string; severity: 'success' | 'error' } | null>(null);

  const handleDeleteClick = (id: number, name: string) => {
    setUserToDelete({ id, name });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (userToDelete !== null) {
      try {
        await deleteUser(userToDelete.id);
        setFeedback({ message: `Usuário "${userToDelete.name}" excluído com sucesso!`, severity: 'success' });
      } catch (err) {
        setFeedback({ message: `Erro ao excluir o usuário "${userToDelete.name}".`, severity: 'error' });
      }
    }
    setConfirmOpen(false);
    setUserToDelete(null);
  };

  useEffect(() => {
    if (feedback) {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/*Cabeçalho*/}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Lista de Usuários
        </Typography>

        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/users/create')}
          >
            Criar Usuário
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push('/')}
            sx={{
              '&:hover': { backgroundColor: '#8a009cff', color: '#fff' },
              borderColor: '#8a009cff',
            }}
          >
            Página Principal
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Carregando usuários...</Typography>
        </Box>
      ) : users.length === 0 ? (
        <Typography>Nenhum usuário encontrado.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {users.map((user) => (
            <Card key={user.id} sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="body1"><strong>Nome:</strong> {user.name}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Email:</strong> {user.email}</Typography>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
                <Tooltip title="Excluir Usuário">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(user.id, user.name)}
                    sx={{ '&:hover': { backgroundColor: 'rgba(220, 53, 69, 0.1)' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}

      {/*Alerta de confirmação*/}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirmar Exclusão</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Tem certeza de que deseja excluir o usuário <strong>{userToDelete?.name}</strong>? <br />
            Esta ação não pode ser desfeita.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)} color="secondary" sx={{
            '&:hover': { backgroundColor: '#8a009cff', color: '#fff' },
          }}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmDelete} color="error" sx={{
            '&:hover': { backgroundColor: '#dc3545', color: '#fff' },
          }}>
            Excluir
          </Button>
        </DialogActions>
      </Dialog>

      {/*Janela de feedback*/}
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
    </Box>
  );
}
