'use client';

import { useEffect, useState } from 'react';
import { useTaskContext } from '@/contexts/TaskContext';
import { useRouter } from 'next/navigation';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Alert,
  CircularProgress,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Snackbar,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

export default function TaskListPage() {
  const { tasks, loading, error, toggleStatus, deleteTask, fetchTasks } = useTaskContext();
  const router = useRouter();

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<{ id: number; descricao: string } | null>(null);

  
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDeleteClick = (id: number, descricao: string) => {
    setTaskToDelete({ id, descricao });
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (taskToDelete !== null) {
      try {
        await deleteTask(taskToDelete.id);
        setFeedback({ type: 'success', message: `Tarefa "${taskToDelete.descricao}" excluída com sucesso!` });
      } catch (err) {
        setFeedback({ type: 'error', message: 'Erro ao excluir a tarefa. Tente novamente.' });
      }
    }
    setConfirmOpen(false);
    setTaskToDelete(null);
  };

  const handleToggleStatus = async (id: number, status: string) => {
    try {
      await toggleStatus(id, status);
      setFeedback({
        type: 'success',
        message: `Tarefa marcada como ${status === 'pendente' ? 'Feita' : 'Pendente'}!`,
      });
    } catch (err) {
      setFeedback({ type: 'error', message: 'Erro ao atualizar status da tarefa.' });
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      {/*Cabeçalho*/}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">Lista de Tarefas</Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button variant="contained" color="primary" onClick={() => router.push('/tasks/create')}>
            Criar Tarefa
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => router.push('/')}
            sx={{ '&:hover': { backgroundColor: '#8a009cff', color: '#fff' }, borderColor: '#8a009cff' }}
          >
            Página Principal
          </Button>
        </Box>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {loading ? (
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Carregando tarefas...</Typography>
        </Box>
      ) : tasks.length === 0 ? (
        <Typography>Nenhuma tarefa encontrada.</Typography>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {tasks.map((task) => (
            <Card key={task.id} sx={{ bgcolor: 'background.paper', boxShadow: 3 }}>
              <CardContent>
                <Typography variant="body1"><strong>Descrição:</strong> {task.descricao}</Typography>
                <Typography variant="body2" color="text.secondary"><strong>Usuário:</strong> {task.user?.name ?? 'Desconhecido'}</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                  <Typography variant="body2" component="span"><strong>Status:</strong></Typography>
                  <Chip label={task.status} color={task.status === 'pendente' ? 'warning' : 'success'} size="small" />
                </Box>
              </CardContent>
              <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button
                  variant="contained"
                  color={task.status === 'pendente' ? 'primary' : 'warning'}
                  onClick={() => handleToggleStatus(task.id, task.status)}
                >
                  Marcar como {task.status === 'pendente' ? 'Feito' : 'Pendente'}
                </Button>
                <Tooltip title="Excluir Tarefa">
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteClick(task.id, task.descricao)}
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
            Tem certeza de que deseja excluir a tarefa <strong>{taskToDelete?.descricao}</strong>? <br />
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
      {feedback && (
        <Snackbar
          open={!!feedback}
          autoHideDuration={3000}
          onClose={() => setFeedback(null)}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        </Snackbar>
      )}
    </Box>
  );
}
