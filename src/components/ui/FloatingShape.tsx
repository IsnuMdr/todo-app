interface FloatingShapeProps {
  variant?: "circle" | "square" | "blob" | "triangle";
  color?: "blue" | "purple" | "pink" | "orange" | "green";
  position?: "top-right" | "top-left" | "bottom-right" | "bottom-left";
  size?: "sm" | "md" | "lg" | "xl";
  animate?: boolean;
  className?: string;
}

const FloatingShape = ({
  variant = "circle",
  className = "",
  color = "blue",
  position = "top-right",
  size = "md",
  animate = true,
}: FloatingShapeProps) => {
  const shapes = {
    circle: "rounded-full",
    square: "rounded-xl rotate-45",
    blob: "rounded-[40%_60%_70%_30%/40%_50%_60%_50%]",
    triangle: "clip-triangle",
  };

  const colors = {
    blue: "bg-gradient-to-br from-blue-400 to-blue-600",
    purple: "bg-gradient-to-br from-purple-400 to-purple-600",
    pink: "bg-gradient-to-br from-pink-400 to-pink-600",
    orange: "bg-gradient-to-br from-orange-400 to-orange-600",
    green: "bg-gradient-to-br from-green-400 to-green-600",
  };

  const sizes = {
    sm: "w-24 h-24",
    md: "w-40 h-40",
    lg: "w-56 h-56",
    xl: "w-72 h-72",
  };

  const positions = {
    "top-right": "top-0 right-0 translate-x-1/4 -translate-y-1/4",
    "top-left": "top-0 left-0 -translate-x-1/4 -translate-y-1/4",
    "bottom-right": "bottom-0 right-0 translate-x-1/4 translate-y-1/4",
    "bottom-left": "bottom-0 left-0 -translate-x-1/4 translate-y-1/4",
  };

  const animations = animate ? "animate-float" : "";

  return (
    <div
      className={`
        absolute
        ${shapes[variant]}
        ${colors[color]}
        ${sizes[size]}
        ${positions[position]}
        ${animations}
        opacity-20
        blur-3xl
        pointer-events-none
        ${className}
      `}
    />
  );
};

export default FloatingShape;
