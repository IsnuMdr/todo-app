import { useMemo } from "react";
// ...existing code...
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
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Dashboard</h1>
        <p className="text-gray-600 text-lg">
          Selamat datang kembali, {user?.email}!
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Total Todos"
          value={stats.total}
          icon={
            <span className="material-symbols-outlined text-4xl text-blue-600">
              list_alt
            </span>
          }
          color="blue"
        />
        <StatCard
          title="Selesai"
          value={stats.completed}
          icon={
            <span className="material-symbols-outlined text-4xl text-green-600">
              check_circle
            </span>
          }
          color="green"
        />
        <StatCard
          title="Pending"
          value={stats.pending}
          icon={
            <span className="material-symbols-outlined text-4xl text-yellow-600">
              pending
            </span>
          }
          color="yellow"
        />
        <StatCard
          title="Dalam Progress"
          value={stats.inProgress}
          icon={
            <span className="material-symbols-outlined text-4xl text-cyan-600">
              hourglass_empty
            </span>
          }
          color="cyan"
        />
      </div>
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-semibold mb-4">Aktivitas Terbaru</h2>
        {todos.length === 0 ? (
          <div className="py-8 text-center text-gray-500">
            Belum ada todo. Mulai tambahkan todo pertama Anda!
          </div>
        ) : (
          <div>
            {todos.slice(0, 5).map((todo) => (
              <div key={todo.id} className="py-2 border-b last:border-b-0">
                <div className="font-semibold">{todo.title}</div>
                <div className="text-sm text-gray-500">
                  Status: {todo.status} | Priority: {todo.priority}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;
