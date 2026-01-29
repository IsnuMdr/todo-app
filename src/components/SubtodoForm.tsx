import { useState } from "react";
import { Button, Input } from "./ui";

interface SubTodoFormProps {
  onSubmit: (title: string) => void;
  onCancel: () => void;
  isSubmitting?: boolean;
}

const SubTodoForm = ({
  onSubmit,
  onCancel,
  isSubmitting = false,
}: SubTodoFormProps) => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Subtask title is required");
      return;
    }

    onSubmit(title.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Subtask Title"
        type="text"
        placeholder="Enter subtask title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          if (error) setError("");
        }}
        error={error}
        autoFocus
      />

      <div className="flex gap-3">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          disabled={isSubmitting}
          fullWidth
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
          fullWidth
        >
          Create Subtask
        </Button>
      </div>
    </form>
  );
};

export default SubTodoForm;
