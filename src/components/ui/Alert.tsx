interface AlertProps {
  variant?: "info" | "success" | "warning" | "error";
  title?: string;
  children: React.ReactNode;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  onClose?: () => void;
  className?: string;
}

const Alert = ({
  variant = "info",
  title,
  children,
  icon: CustomIcon,
  onClose,
  className = "",
}: AlertProps) => {
  const variants = {
    info: {
      container: "bg-blue-50 border-blue-200 text-blue-900",
      icon: "text-blue-600",
      title: "text-blue-900",
      close: "text-blue-600 hover:text-blue-800 hover:bg-blue-100",
    },
    success: {
      container: "bg-green-50 border-green-200 text-green-900",
      icon: "text-green-600",
      title: "text-green-900",
      close: "text-green-600 hover:text-green-800 hover:bg-green-100",
    },
    warning: {
      container: "bg-yellow-50 border-yellow-200 text-yellow-900",
      icon: "text-yellow-600",
      title: "text-yellow-900",
      close: "text-yellow-600 hover:text-yellow-800 hover:bg-yellow-100",
    },
    error: {
      container: "bg-red-50 border-red-200 text-red-900",
      icon: "text-red-600",
      title: "text-red-900",
      close: "text-red-600 hover:text-red-800 hover:bg-red-100",
    },
  };

  const InfoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
        clipRule="evenodd"
      />
    </svg>
  );

  const SuccessIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  const WarningIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
        clipRule="evenodd"
      />
    </svg>
  );

  const ErrorIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
        clipRule="evenodd"
      />
    </svg>
  );

  const defaultIcons: Record<
    NonNullable<AlertProps["variant"]>,
    React.ComponentType<React.SVGProps<SVGSVGElement>>
  > = {
    info: InfoIcon,
    success: SuccessIcon,
    warning: WarningIcon,
    error: ErrorIcon,
  };

  const Icon = CustomIcon || defaultIcons[variant];

  return (
    <div
      className={`
        rounded-lg border p-4
        ${variants[variant].container}
        ${className}
      `}
      role="alert"
    >
      <div className="flex items-start gap-3">
        <div className={` ${variants[variant].icon}`}>
          <Icon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0">
          {title && (
            <h3
              className={`text-sm font-semibold mb-1 ${variants[variant].title}`}
            >
              {title}
            </h3>
          )}
          <div className="text-sm">{children}</div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className={`
              flex-shrink-0 rounded-md p-1.5
              transition-colors duration-150
              focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-transparent
              ${variants[variant].close}
            `}
            aria-label="Close alert"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Alert;
