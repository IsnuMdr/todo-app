import StorageService from "./StorageService";
import AuthService from "./AuthService";
import { STORAGE_KEYS, TODO_STATUS } from "@constants";
import type { Todo, TodoStatus } from "@/types";
import type { TodoFormData, TodoUpdateData } from "@/utils/validationSchemas";

/**
 * Service untuk mengelola todos
 */
class TodoService {
  /**
   * Get todos untuk user yang sedang login
   * @returns {Array}
   */
  getTodos(): Todo[] {
    const user = AuthService.getCurrentUser();
    if (!user) return [];

    const allTodos: Todo[] = StorageService.get(STORAGE_KEYS.TODOS) || [];
    return allTodos.filter((todo) => todo.userId === user.id);
  }

  /**
   * Get todo by ID
   * @param {string} id
   * @returns {Object|null}
   */
  getTodoById(id: string): Todo | null {
    const todos = this.getTodos();
    return todos.find((todo) => todo.id === id) || null;
  }

  /**
   * Create todo baru
   * @param {Object} todoData
   * @returns {Object} Todo yang baru dibuat
   */
  createTodo(todoData: TodoFormData): Todo {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const allTodos = StorageService.get(STORAGE_KEYS.TODOS) || [];
    const newTodo = {
      id: this.generateId(),
      userId: user.id,
      ...todoData,
      status: todoData.status || TODO_STATUS.PENDING,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      description: todoData.description ?? "",
      dueDate: todoData.dueDate ?? "",
    };

    allTodos.push(newTodo);
    StorageService.set(STORAGE_KEYS.TODOS, allTodos);
    return newTodo;
  }

  /**
   * Update todo
   * @param {string} id
   * @param {Object} todoData
   * @returns {Object|null} Updated todo atau null jika tidak ditemukan
   */
  updateTodo(id: string, todoData: TodoUpdateData): Todo | null {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const allTodos: Todo[] = StorageService.get(STORAGE_KEYS.TODOS) || [];
    const todoIndex = allTodos.findIndex(
      (todo) => todo.id === id && todo.userId === user.id,
    );

    if (todoIndex === -1) return null;

    allTodos[todoIndex] = {
      ...allTodos[todoIndex],
      ...todoData,
      updatedAt: new Date().toISOString(),
    };

    StorageService.set(STORAGE_KEYS.TODOS, allTodos);
    return allTodos[todoIndex];
  }

  /**
   * Delete todo
   * @param {string} id
   * @returns {boolean}
   */
  deleteTodo(id: string): boolean {
    const user = AuthService.getCurrentUser();
    if (!user) throw new Error("User not authenticated");

    const allTodos: Todo[] = StorageService.get(STORAGE_KEYS.TODOS) || [];
    const filteredTodos = allTodos.filter(
      (todo) => !(todo.id === id && todo.userId === user.id),
    );

    if (filteredTodos.length === allTodos.length) return false;

    StorageService.set(STORAGE_KEYS.TODOS, filteredTodos);
    return true;
  }

  /**
   * Toggle todo status
   * @param {string} id
   * @returns {Object|null}
   */
  toggleTodoStatus(id: string): Todo | null {
    const todo = this.getTodoById(id);
    if (!todo) return null;

    const newStatus =
      todo.status === TODO_STATUS.COMPLETED
        ? TODO_STATUS.PENDING
        : TODO_STATUS.COMPLETED;

    return this.updateTodo(id, { ...todo, status: newStatus as TodoStatus });
  }

  /**
   * Get todos statistics
   * @returns {Object}
   */
  getTodosStats() {
    const todos = this.getTodos();
    return {
      total: todos.length,
      completed: todos.filter((t) => t.status === TODO_STATUS.COMPLETED).length,
      pending: todos.filter((t) => t.status === TODO_STATUS.PENDING).length,
      inProgress: todos.filter((t) => t.status === TODO_STATUS.IN_PROGRESS)
        .length,
    };
  }

  /**
   * Generate ID unik
   * @returns {string}
   */
  generateId() {
    return `todo_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
}

export default new TodoService();
