import { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
} from "@mui/icons-material";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TODO_STATUS, TODO_PRIORITY, MESSAGES } from "@constants";
import { useTodos } from "@/hooks/useTodos";
import {
  capitalize,
  formatDateShort,
  getPriorityColor,
  getStatusColor,
  isOverdue,
  todoSchema,
  type TodoFormData,
} from "@/utils";

const TodosPage = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const { todos, createTodo, updateTodo, deleteTodo, toggleTodoStatus } =
    useTodos();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TODO_STATUS.PENDING,
      priority: TODO_PRIORITY.MEDIUM,
      dueDate: "",
    },
  });

  const handleOpenDialog = (todo = null) => {
    if (todo) {
      setEditingTodo(todo);
      reset({
        title: todo.title,
        description: todo.description || "",
        status: todo.status,
        priority: todo.priority,
        dueDate: todo.dueDate || "",
      });
    } else {
      setEditingTodo(null);
      reset({
        title: "",
        description: "",
        status: TODO_STATUS.PENDING,
        priority: TODO_PRIORITY.MEDIUM,
        dueDate: "",
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTodo(null);
    reset();
  };

  const onSubmit = (data: TodoFormData) => {
    try {
      if (editingTodo) {
        updateTodo(editingTodo.id, data);
        // showNotification(MESSAGES.TODO_UPDATED, "success");
      } else {
        createTodo(data);
        // showNotification(MESSAGES.TODO_CREATED, "success");
      }
      handleCloseDialog();
    } catch (error) {
      // showNotification("Terjadi kesalahan", "error");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Apakah Anda yakin ingin menghapus todo ini?")) {
      deleteTodo(id);
      // showNotification(MESSAGES.TODO_DELETED, "success");
    }
  };

  const handleToggleStatus = (id) => {
    toggleTodoStatus(id);
  };

  return (
    <Container maxWidth="lg">
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h4">Todos</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Tambah Todo
        </Button>
      </Box>

      {todos.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            Belum ada todo
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3 }}>
            Mulai tambahkan todo pertama Anda!
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Tambah Todo
          </Button>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {todos.map((todo) => (
            <Grid item xs={12} sm={6} md={4} key={todo.id}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {todo.title}
                    </Typography>
                    {todo.description && (
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                      >
                        {todo.description}
                      </Typography>
                    )}
                  </Box>

                  <Box
                    sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 1 }}
                  >
                    <Chip
                      label={capitalize(todo.status.replace("_", " "))}
                      color={getStatusColor(todo.status)}
                      size="small"
                    />
                    <Chip
                      label={capitalize(todo.priority)}
                      color={getPriorityColor(todo.priority)}
                      size="small"
                      variant="outlined"
                    />
                  </Box>

                  {todo.dueDate && (
                    <Typography
                      variant="caption"
                      color={
                        isOverdue(todo.dueDate) && todo.status !== "completed"
                          ? "error"
                          : "text.secondary"
                      }
                    >
                      Due: {formatDateShort(todo.dueDate)}
                      {isOverdue(todo.dueDate) &&
                        todo.status !== "completed" &&
                        " (Terlambat)"}
                    </Typography>
                  )}
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                  <Box>
                    <IconButton
                      size="small"
                      color="success"
                      onClick={() => handleToggleStatus(todo.id)}
                      title={
                        todo.status === "completed"
                          ? "Tandai belum selesai"
                          : "Tandai selesai"
                      }
                    >
                      <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={() => handleOpenDialog(todo)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={() => handleDelete(todo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>
          {editingTodo ? "Edit Todo" : "Tambah Todo Baru"}
        </DialogTitle>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogContent>
            <TextField
              fullWidth
              label="Judul"
              margin="normal"
              error={!!errors.title}
              helperText={errors.title?.message}
              {...register("title")}
            />

            <TextField
              fullWidth
              label="Deskripsi"
              margin="normal"
              multiline
              rows={3}
              error={!!errors.description}
              helperText={errors.description?.message}
              {...register("description")}
            />

            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Status</InputLabel>
                  <Select {...field} label="Status">
                    <MenuItem value={TODO_STATUS.PENDING}>Pending</MenuItem>
                    <MenuItem value={TODO_STATUS.IN_PROGRESS}>
                      In Progress
                    </MenuItem>
                    <MenuItem value={TODO_STATUS.COMPLETED}>Completed</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <FormControl fullWidth margin="normal">
                  <InputLabel>Priority</InputLabel>
                  <Select {...field} label="Priority">
                    <MenuItem value={TODO_PRIORITY.LOW}>Low</MenuItem>
                    <MenuItem value={TODO_PRIORITY.MEDIUM}>Medium</MenuItem>
                    <MenuItem value={TODO_PRIORITY.HIGH}>High</MenuItem>
                  </Select>
                </FormControl>
              )}
            />

            <TextField
              fullWidth
              label="Due Date"
              type="date"
              margin="normal"
              InputLabelProps={{ shrink: true }}
              error={!!errors.dueDate}
              helperText={errors.dueDate?.message}
              {...register("dueDate")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Batal</Button>
            <Button type="submit" variant="contained">
              {editingTodo ? "Update" : "Tambah"}
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Container>
  );
};

export default TodosPage;
