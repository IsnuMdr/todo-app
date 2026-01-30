import React, { useState, useEffect, createContext } from "react";
import { TodoService } from "@/services";
import type { Todo } from "@/types";
import type { TodoFormData, TodoUpdateData } from "@/utils/validationSchemas";
import { useAuth } from "@/hooks/useAuth";

export interface TodoContextType {
  todos: Todo[];
  loading: boolean;
  loadTodos: () => void;
  createTodo: (todoData: TodoFormData) => Todo;
  createSubTodo: (todoId: string, title: string) => Todo | null;
  updateTodo: (id: string, todoData: TodoUpdateData) => Todo | null;
  deleteTodo: (id: string) => boolean;
  updateSubTodo?: (
    todoId: string,
    subTodoId: string,
    title: string,
  ) => Todo | null;
  deleteSubTodo?: (todoId: string, subTodoId: string) => Todo | null;
  toggleTodoStatus: (id: string) => Todo | null;
  toggleSubTodoStatus?: (todoId: string, subTodoId: string) => Todo | null;
  getTodoById: (id: string) => Todo | null;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setTodos([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const userTodos = TodoService.getTodos();
      setTodos(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  }, [user]);

  const loadTodos = () => {
    if (!user) {
      setTodos([]);
      return;
    }

    setLoading(true);
    try {
      const userTodos = TodoService.getTodos();
      setTodos(userTodos);
    } catch (error) {
      console.error("Error loading todos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createTodo = (todoData: TodoFormData) => {
    try {
      const newTodo = TodoService.createTodo(todoData);
      setTodos((prev) => [newTodo, ...prev]);
      return newTodo;
    } catch (error) {
      console.error("Error creating todo:", error);
      throw error;
    }
  };

  const createSubTodo = (todoId: string, title: string) => {
    try {
      const todo = TodoService.getTodoById(todoId);
      if (!todo) return null;

      const newSubTodo = {
        id: TodoService.generateId(),
        title,
        completed: false,
      };

      const updatedTodo = TodoService.updateTodo(todoId, {
        ...todo,
        subTodos: [...(todo.subTodos || []), newSubTodo],
      });

      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todoId ? updatedTodo : t)),
        );
      }

      return updatedTodo;
    } catch (error) {
      console.error("Error creating sub-todo:", error);
      throw error;
    }
  };

  const updateTodo = (id: string, todoData: TodoUpdateData) => {
    try {
      const updatedTodo = TodoService.updateTodo(id, todoData);
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      }
      return updatedTodo;
    } catch (error) {
      console.error("Error updating todo:", error);
      throw error;
    }
  };

  const deleteTodo = (id: string) => {
    try {
      const success = TodoService.deleteTodo(id);
      if (success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
      return success;
    } catch (error) {
      console.error("Error deleting todo:", error);
      throw error;
    }
  };

  const deleteSubTodo = (todoId: string, subTodoId: string) => {
    try {
      const todo = TodoService.getTodoById(todoId);
      if (!todo || !todo.subTodos) return null;

      const updatedSubTodos = todo.subTodos.filter(
        (subTodo) => subTodo.id !== subTodoId,
      );

      const updatedTodo = TodoService.updateTodo(todoId, {
        ...todo,
        subTodos: updatedSubTodos,
      });

      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todoId ? updatedTodo : t)),
        );
      }

      return updatedTodo;
    } catch (error) {
      console.error("Error deleting sub-todo:", error);
      throw error;
    }
  };

  const toggleTodoStatus = (id: string) => {
    try {
      const todo = TodoService.getTodoById(id);
      if (!todo) return null;
      const willBeCompleted = !todo.completed;
      let updatedSubTodos = todo.subTodos;
      if (willBeCompleted && todo.subTodos && todo.subTodos.length > 0) {
        updatedSubTodos = todo.subTodos.map((subTodo) => ({
          ...subTodo,
          completed: true,
        }));
      }
      const updatedTodo = TodoService.updateTodo(id, {
        ...todo,
        completed: willBeCompleted,
        subTodos: updatedSubTodos,
      });
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? updatedTodo : todo)),
        );
      }
      return updatedTodo;
    } catch (error) {
      console.error("Error toggling todo status:", error);
      throw error;
    }
  };

  const toggleSubTodoStatus = (todoId: string, subTodoId: string) => {
    try {
      const todo = TodoService.getTodoById(todoId);
      if (!todo || !todo.subTodos) return null;

      // Toggle the subTodo's completed status
      const updatedSubTodos = todo.subTodos.map((subTodo) =>
        subTodo.id === subTodoId
          ? { ...subTodo, completed: !subTodo.completed }
          : subTodo,
      );

      // If all subTodos are checked, main todo must be checked
      const allSubCompleted = updatedSubTodos.every((st) => st.completed);
      const mainCompleted = allSubCompleted ? true : false;

      const updatedTodo = TodoService.updateTodo(todoId, {
        ...todo,
        subTodos: updatedSubTodos,
        completed: mainCompleted,
      });

      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todoId ? updatedTodo : t)),
        );
      }

      return updatedTodo;
    } catch (error) {
      console.error("Error toggling sub-todo status:", error);
      throw error;
    }
  };

  const updateSubTodo = (todoId: string, subTodoId: string, title: string) => {
    try {
      const todo = TodoService.getTodoById(todoId);
      if (!todo || !todo.subTodos) return null;
      const updatedSubTodos = todo.subTodos.map((subTodo) =>
        subTodo.id === subTodoId ? { ...subTodo, title } : subTodo,
      );
      const updatedTodo = TodoService.updateTodo(todoId, {
        ...todo,
        subTodos: updatedSubTodos,
      });
      if (updatedTodo) {
        setTodos((prev) =>
          prev.map((t) => (t.id === todoId ? updatedTodo : t)),
        );
      }
      return updatedTodo;
    } catch (error) {
      console.error("Error updating sub-todo:", error);
      throw error;
    }
  };

  const getTodoById = (id: string) => {
    return todos.find((todo) => todo.id === id) || null;
  };

  const value = {
    todos,
    loading,
    createTodo,
    createSubTodo,
    updateTodo,
    deleteTodo,
    deleteSubTodo,
    toggleTodoStatus,
    toggleSubTodoStatus,
    updateSubTodo,
    getTodoById,
    loadTodos,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};

export default TodoContext;
