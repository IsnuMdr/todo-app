import { useMemo } from "react";
import { Container, Grid, Paper, Typography, Box } from "@mui/material";
import {
  Assignment as AssignmentIcon,
  CheckCircle as CheckCircleIcon,
  Pending as PendingIcon,
  HourglassEmpty as HourglassEmptyIcon,
} from "@mui/icons-material";
import { useTodos } from "@/hooks/useTodos";
import { useAuth } from "@/hooks/useAuth";
import StatCard from "@/components/StatCard";

const DashboardPage = () => {
  const { todos } = useTodos();
  const { user } = useAuth();

  console.log({
    user,
    todos,
  });

  const stats = useMemo(() => {
    const total = todos.length;
    const completed = todos.filter((t) => t.status === "completed").length;
    const pending = todos.filter((t) => t.status === "pending").length;
    const inProgress = todos.filter((t) => t.status === "in_progress").length;

    return { total, completed, pending, inProgress };
  }, [todos]);

  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Selamat datang kembali, {user?.name}!
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Todos"
            value={stats.total}
            icon={
              <AssignmentIcon sx={{ fontSize: 40, color: "primary.main" }} />
            }
            color="primary"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Selesai"
            value={stats.completed}
            icon={
              <CheckCircleIcon sx={{ fontSize: 40, color: "success.main" }} />
            }
            color="success"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pending"
            value={stats.pending}
            icon={<PendingIcon sx={{ fontSize: 40, color: "warning.main" }} />}
            color="warning"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Dalam Progress"
            value={stats.inProgress}
            icon={
              <HourglassEmptyIcon sx={{ fontSize: 40, color: "info.main" }} />
            }
            color="info"
          />
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Aktivitas Terbaru
            </Typography>
            {todos.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography color="text.secondary">
                  Belum ada todo. Mulai tambahkan todo pertama Anda!
                </Typography>
              </Box>
            ) : (
              <Box>
                {todos.slice(0, 5).map((todo) => (
                  <Box
                    key={todo.id}
                    sx={{
                      py: 2,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    <Typography variant="subtitle1">{todo.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Status: {todo.status} | Priority: {todo.priority}
                    </Typography>
                  </Box>
                ))}
              </Box>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;
