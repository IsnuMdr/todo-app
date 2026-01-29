import { useContext, useEffect, useState } from "react";
import { Modal, SubTodoForm, TodoCard, TodoForm } from "@/components";
import { Button } from "@/components/ui";
import { useToast } from "@/hooks/useToast";
import { Plus } from "lucide-react";
import TodoContext from "@/contexts/TodoContext";
import type { Todo } from "@/types";
import type { TodoFormData } from "@/utils/validationSchemas";

const TodoListPage = () => {
  const { showSuccess, showError } = useToast();
  const {
    todos,
    loadTodos,
    createTodo,
    createSubTodo,
    updateTodo,
    deleteTodo,
    deleteSubTodo,
    toggleTodoStatus,
    toggleSubTodoStatus,
  } = useContext(TodoContext)!;

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSubTodoModalOpen, setIsSubTodoModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [selectedTodoForSubTask, setSelectedTodoForSubTask] = useState<
    string | null
  >(null);

  useEffect(() => {
    loadTodos();
  }, []);

  const handleCreateTodo = (data: TodoFormData) => {
    createTodo(data);
    setIsCreateModalOpen(false);
    showSuccess("Todo created successfully!");
  };

  const handleEditTodo = (data: TodoFormData) => {
    if (!editingTodo) return;

    updateTodo(editingTodo.id, data);

    setIsEditModalOpen(false);
    setEditingTodo(null);
    showSuccess("Todo updated successfully!");
  };

  const handleDeleteTodo = (id: string) => {
    if (window.confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
      showSuccess("Todo deleted successfully!");
    }
  };

  const handleToggleComplete = (id: string) => {
    toggleTodoStatus(id);
  };

  const handleCreateSubTodo = (parentId: string) => {
    setSelectedTodoForSubTask(parentId);
    setIsSubTodoModalOpen(true);
  };

  const handleSubmitSubTodo = (title: string) => {
    if (!selectedTodoForSubTask) return;

    createSubTodo(selectedTodoForSubTask, title);

    setIsSubTodoModalOpen(false);
    setSelectedTodoForSubTask(null);
    showSuccess("Subtask created successfully!");
  };

  const handleToggleSubTodoComplete = (todoId: string, subTodoId: string) => {
    toggleSubTodoStatus!(todoId, subTodoId);
  };

  const handleDeleteSubTodo = (todoId: string, subTodoId: string) => {
    if (window.confirm("Are you sure you want to delete this subtask?")) {
      deleteSubTodo!(todoId, subTodoId);
      showSuccess("Subtask deleted successfully!");
    }
  };

  const handleOpenEditModal = (todo: Todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const activeTodos = todos.filter((todo) => !todo.completed);
  const checkedTodos = todos.filter((todo) => todo.completed);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Todo</h1>
        </div>
        <Button
          variant="outline"
          icon={Plus}
          onClick={() => setIsCreateModalOpen(true)}
          iconPosition="right"
        >
          Create Todo
        </Button>
      </div>

      {/* Todo Grid */}
      {todos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <img src="/todo-empty.png" alt="No todos" className="w-64 mb-4" />
          <p className="text-gray-500">You Dont Have a Todo Yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Active Todos */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Not Checked
              </h2>
            </div>

            <div className="space-y-3">
              {activeTodos.length > 0 ? (
                activeTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTodo}
                    onCreateSubTodo={handleCreateSubTodo}
                    onToggleSubTodoComplete={handleToggleSubTodoComplete}
                    onDeleteSubTodo={handleDeleteSubTodo}
                  />
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No active tasks</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Create a new task to get started
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="border border-gray-300 rounded-lg p-4">
            <div className="mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Checked</h2>
            </div>

            <div className="space-y-3">
              {checkedTodos.length > 0 ? (
                checkedTodos.map((todo) => (
                  <TodoCard
                    key={todo.id}
                    todo={todo}
                    onToggleComplete={handleToggleComplete}
                    onEdit={handleOpenEditModal}
                    onDelete={handleDeleteTodo}
                    onCreateSubTodo={handleCreateSubTodo}
                    onToggleSubTodoComplete={handleToggleSubTodoComplete}
                    onDeleteSubTodo={handleDeleteSubTodo}
                  />
                ))
              ) : (
                <div className="bg-white border border-gray-200 rounded-lg p-8 text-center">
                  <p className="text-gray-500">No completed tasks</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Complete a task to see it here
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Create Todo Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Todo"
      >
        <TodoForm
          onSubmit={handleCreateTodo}
          onCancel={() => setIsCreateModalOpen(false)}
        />
      </Modal>

      {/* Edit Todo Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        title="Edit Todo"
      >
        {editingTodo && (
          <TodoForm
            initialData={{
              title: editingTodo.title,
              dateTime: editingTodo.dateTime,
            }}
            onSubmit={handleEditTodo}
            onCancel={() => {
              setIsEditModalOpen(false);
              setEditingTodo(null);
            }}
          />
        )}
      </Modal>

      {/* Create SubTodo Modal */}
      <Modal
        isOpen={isSubTodoModalOpen}
        onClose={() => {
          setIsSubTodoModalOpen(false);
          setSelectedTodoForSubTask(null);
        }}
        title="Create Subtask"
      >
        <SubTodoForm
          onSubmit={handleSubmitSubTodo}
          onCancel={() => {
            setIsSubTodoModalOpen(false);
            setSelectedTodoForSubTask(null);
          }}
        />
      </Modal>
    </div>
  );
};

export default TodoListPage;
