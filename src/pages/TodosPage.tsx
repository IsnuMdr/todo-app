import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TODO_STATUS, TODO_PRIORITY, MESSAGES } from "@constants";
import { useTodos } from "@/hooks/useTodos";
import {
  capitalize,
  formatDateShort,
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
    <div className="max-w-5xl mx-auto p-4">
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-3xl font-bold">Todos</h1>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
          onClick={() => handleOpenDialog()}
        >
          <span className="material-symbols-outlined">add</span> Tambah Todo
        </button>
      </div>

      {todos.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-lg text-gray-500 mb-2">Belum ada todo</div>
          <div className="text-gray-400 mb-4">
            Mulai tambahkan todo pertama Anda!
          </div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded flex items-center gap-2"
            onClick={() => handleOpenDialog()}
          >
            <span className="material-symbols-outlined">add</span> Tambah Todo
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col h-full"
            >
              <div className="mb-2">
                <div className="font-semibold text-lg mb-1">{todo.title}</div>
                {todo.description && (
                  <div className="text-gray-500 text-sm mb-2">
                    {todo.description}
                  </div>
                )}
              </div>
              <div className="flex gap-2 flex-wrap mb-2">
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700`}
                >
                  {capitalize(todo.status.replace("_", " "))}
                </span>
                <span
                  className={`px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-700`}
                >
                  {capitalize(todo.priority)}
                </span>
              </div>
              {todo.dueDate && (
                <div
                  className={`text-xs ${isOverdue(todo.dueDate) && todo.status !== "completed" ? "text-red-500" : "text-gray-400"}`}
                >
                  Due: {formatDateShort(todo.dueDate)}
                  {isOverdue(todo.dueDate) &&
                    todo.status !== "completed" &&
                    " (Terlambat)"}
                </div>
              )}
              <div className="flex justify-between mt-auto pt-4">
                <div className="flex gap-2">
                  <button
                    className="text-green-600 hover:text-green-800"
                    title={
                      todo.status === "completed"
                        ? "Tandai belum selesai"
                        : "Tandai selesai"
                    }
                    onClick={() => handleToggleStatus(todo.id)}
                  >
                    <span className="material-symbols-outlined">
                      check_circle
                    </span>
                  </button>
                  <button
                    className="text-blue-600 hover:text-blue-800"
                    onClick={() => handleOpenDialog(todo)}
                  >
                    <span className="material-symbols-outlined">edit</span>
                  </button>
                </div>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(todo.id)}
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Dialog for add/edit todo */}
      {openDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 relative">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={handleCloseDialog}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
            <h2 className="text-xl font-semibold mb-4">
              {editingTodo ? "Edit Todo" : "Tambah Todo Baru"}
            </h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <input
                  className={`w-full border rounded px-3 py-2 ${errors.title ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Judul"
                  {...register("title")}
                />
                {errors.title && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.title.message}
                  </div>
                )}
              </div>
              <div>
                <textarea
                  className={`w-full border rounded px-3 py-2 ${errors.description ? "border-red-500" : "border-gray-300"}`}
                  placeholder="Deskripsi"
                  rows={3}
                  {...register("description")}
                />
                {errors.description && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.description.message}
                  </div>
                )}
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1">
                    Status
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    {...register("status")}
                  >
                    <option value={TODO_STATUS.PENDING}>Pending</option>
                    <option value={TODO_STATUS.IN_PROGRESS}>In Progress</option>
                    <option value={TODO_STATUS.COMPLETED}>Completed</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium mb-1">
                    Priority
                  </label>
                  <select
                    className="w-full border rounded px-2 py-1"
                    {...register("priority")}
                  >
                    <option value={TODO_PRIORITY.LOW}>Low</option>
                    <option value={TODO_PRIORITY.MEDIUM}>Medium</option>
                    <option value={TODO_PRIORITY.HIGH}>High</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium mb-1">
                  Due Date
                </label>
                <input
                  className={`w-full border rounded px-3 py-2 ${errors.dueDate ? "border-red-500" : "border-gray-300"}`}
                  type="date"
                  {...register("dueDate")}
                />
                {errors.dueDate && (
                  <div className="text-red-500 text-xs mt-1">
                    {errors.dueDate.message}
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
                  onClick={handleCloseDialog}
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingTodo ? "Update" : "Tambah"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodosPage;
