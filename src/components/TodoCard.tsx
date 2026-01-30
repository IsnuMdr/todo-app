import { useState, useRef, useEffect } from "react";
import { formatDate } from "@/utils";
import { Check, Edit2, EllipsisVertical, Plus, Trash } from "lucide-react";
import type { Todo } from "@/types";

interface TodoCardProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onEdit: (todo: Todo) => void;
  onDelete: (id: string) => void;
  onCreateSubTodo: (parentId: string) => void;
  onToggleSubTodoComplete: (todoId: string, subTodoId: string) => void;
  onDeleteSubTodo: (todoId: string, subTodoId: string) => void;
  onAddSubTodo: (todoId: string, title: string) => void;
  onEditSubTodo: (todoId: string, subTodoId: string, title: string) => void;
}

const TodoCard = ({
  todo,
  onToggleComplete,
  onEdit,
  onDelete,
  onCreateSubTodo,
  onToggleSubTodoComplete,
  onDeleteSubTodo,
  onAddSubTodo,
  onEditSubTodo,
}: TodoCardProps) => {
  const [newSubTodo, setNewSubTodo] = useState("");
  const [showSubTodoInput, setShowSubTodoInput] = useState(false);
  const [editingSubTodoId, setEditingSubTodoId] = useState<string | null>(null);
  const [editingSubTodoValue, setEditingSubTodoValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [showActions, setShowActions] = useState(false);
  const actionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!showActions) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        actionsRef.current &&
        !actionsRef.current.contains(event.target as Node)
      ) {
        setShowActions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showActions]);

  const handleAddSubTodo = () => {
    const title = newSubTodo.trim();
    if (title) {
      onAddSubTodo(todo.id, title);
      setNewSubTodo("");
      setShowSubTodoInput(false);
    }
  };

  const handleEditSubTodo = (subTodoId: string, value: string) => {
    if (value.trim()) {
      onEditSubTodo(todo.id, subTodoId, value.trim());
    }
    setEditingSubTodoId(null);
    setEditingSubTodoValue("");
  };

  const isOverdue = (dateTimeString: string) => {
    return new Date(dateTimeString) < new Date() && !todo.completed;
  };

  return (
    <div
      className={`
        bg-white border rounded-xl p-2 shadow-sm
        transition-all duration-200
        hover:shadow-md
        ${todo.completed ? "border-green-200 bg-green-50/30" : "border-gray-200"}
      `}
    >
      {/* Main Todo */}
      <div className="flex items-start gap-3 px-2.5 py-1.5">
        {/* Checkbox */}
        <button
          onClick={() => onToggleComplete(todo.id)}
          className={`
            shrink-0 w-5 h-5 mt-0.5 rounded border-2
            transition-all duration-200
            ${
              todo.completed
                ? "bg-green-500 border-green-500"
                : "border-gray-300 hover:border-green-500"
            }
          `}
        >
          {todo.completed && <Check className="w-4 h-4 text-white" />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-center gap-2">
            <h3
              className={`
                text-sm font-medium
                ${todo.completed ? "text-gray-500 line-through" : "text-gray-900"}
              `}
            >
              {todo.title}
            </h3>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <span
                  className={
                    isOverdue(todo.dateTime) ? "text-red-600 font-medium" : ""
                  }
                >
                  {isOverdue(todo.dateTime) && "Overdue - "}
                  {formatDate(todo.dateTime)}
                </span>
              </div>

              {/* Action */}
              <div className="relative" ref={actionsRef}>
                <button
                  onClick={() => setShowActions((prev) => !prev)}
                  className="p-1 rounded hover:bg-gray-100 transition-colors"
                  aria-label="Show actions"
                >
                  <EllipsisVertical className="w-5 h-5 text-gray-500" />
                </button>
                {showActions && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded shadow-lg z-10">
                    <button
                      onClick={() => {
                        setShowSubTodoInput(true);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      Create Sub To-do
                    </button>
                    <button
                      onClick={() => {
                        setShowActions(false);
                        onEdit(todo);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setShowActions(false);
                        onDelete(todo.id);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sub Todos */}
          <div className="space-y-2 -ml-2 -pl-2 mt-2">
            {todo.subTodos && todo.subTodos.length > 0 && (
              <>
                {todo.subTodos.map((subTodo) => (
                  <div
                    key={subTodo.id}
                    className="flex items-center gap-2 group p-2 border border-gray-200 rounded-lg"
                  >
                    {/* Sub Todo Checkbox */}
                    <button
                      onClick={() =>
                        onToggleSubTodoComplete(todo.id, subTodo.id)
                      }
                      className={`
                            shrink-0 w-4 h-4 rounded border-2
                            transition-all duration-200
                            ${
                              subTodo.completed
                                ? "bg-green-500 border-green-500"
                                : "border-gray-300 hover:border-green-500"
                            }
                          `}
                    >
                      {subTodo.completed && (
                        <Check className="w-3 h-3 text-white" />
                      )}
                    </button>

                    {/* Sub Todo Title (editable) */}
                    {editingSubTodoId === subTodo.id ? (
                      <input
                        className={`flex-1 text-sm bg-transparent outline-none ${
                          subTodo.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-700"
                        }`}
                        value={editingSubTodoValue}
                        autoFocus
                        onChange={(e) => setEditingSubTodoValue(e.target.value)}
                        onBlur={() =>
                          handleEditSubTodo(subTodo.id, editingSubTodoValue)
                        }
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleEditSubTodo(subTodo.id, editingSubTodoValue);
                          }
                        }}
                      />
                    ) : (
                      <span
                        className={`flex-1 text-sm ${
                          subTodo.completed
                            ? "text-gray-500 line-through"
                            : "text-gray-700"
                        }`}
                        onClick={() => {
                          setEditingSubTodoId(subTodo.id);
                          setEditingSubTodoValue(subTodo.title);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {subTodo.title}
                      </span>
                    )}

                    {/* Sub Todo Delete */}
                    <button
                      onClick={() => onDeleteSubTodo(todo.id, subTodo.id)}
                      className="p-1 hover:bg-red-50 rounded transition-all duration-200"
                      aria-label="Delete subtask"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </>
            )}
            {/* Inline Add SubTodo */}
            {showSubTodoInput && (
              <div className="flex items-center gap-2 p-2 border border-dashed border-gray-300 rounded-lg bg-gray-50 mt-2">
                <input
                  ref={inputRef}
                  type="text"
                  className="flex-1 text-sm bg-transparent outline-none"
                  placeholder="Add subtask..."
                  value={newSubTodo}
                  onChange={(e) => setNewSubTodo(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSubTodo();
                    }
                  }}
                  onBlur={handleAddSubTodo}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
