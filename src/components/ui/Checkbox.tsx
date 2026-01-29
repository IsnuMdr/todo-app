import { forwardRef } from "react";

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            ref={ref}
            type="checkbox"
            className={`
            w-4 h-4
            text-blue-600
            border-gray-300
            rounded
            focus:ring-2 
            focus:ring-blue-500
            focus:ring-offset-0
            cursor-pointer
            transition-all duration-200
            ${error ? "border-red-500" : ""}
            ${className}
          `}
            {...props}
          />
        </div>
        {label && (
          <div className="ml-3 text-sm">
            <label className="text-gray-700 cursor-pointer select-none">
              {label}
            </label>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>
        )}
      </div>
    );
  },
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
