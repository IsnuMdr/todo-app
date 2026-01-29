import { createContext, useState } from "react";
import Toast from "@/components/ui/Toast";

interface ToastOptions {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  message: string;
  duration?: number;
  position?:
    | "top-right"
    | "top-center"
    | "top-left"
    | "bottom-right"
    | "bottom-center"
    | "bottom-left";
}

interface ToastItem extends ToastOptions {
  id: string;
}

interface ToastContextValue {
  showToast: (options: ToastOptions) => void;
  hideToast: (id: string) => void;
  showSuccess: (message: string, title?: string) => void;
  showError: (message: string, title?: string) => void;
  showWarning: (message: string, title?: string) => void;
  showInfo: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = (options: ToastOptions) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...options, id }]);
  };

  const hideToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showSuccess = (message: string, title?: string) => {
    showToast({ variant: "success", message, title });
  };

  const showError = (message: string, title?: string) => {
    showToast({ variant: "error", message, title });
  };

  const showWarning = (message: string, title?: string) => {
    showToast({ variant: "warning", message, title });
  };

  const showInfo = (message: string, title?: string) => {
    showToast({ variant: "info", message, title });
  };

  return (
    <ToastContext.Provider
      value={{
        showToast,
        hideToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          variant={toast.variant}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          position={toast.position}
          onClose={() => hideToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default ToastContext;
