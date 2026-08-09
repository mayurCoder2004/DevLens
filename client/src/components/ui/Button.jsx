export default function Button({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  disabled = false,
  type = "button",
  onClick,
  className = "",
}) {
  const baseStyles =
    "inline-flex min-w-0 max-w-full items-center justify-center gap-2 rounded-xl text-center font-medium whitespace-normal transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/40 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20",

    secondary:
      "border border-slate-700 bg-transparent text-slate-300 hover:border-blue-500 hover:text-white",

    ghost:
      "bg-transparent text-slate-300 hover:bg-slate-800 hover:text-white",

    danger:
      "bg-red-600 text-white hover:bg-red-700",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",

    md: "px-5 py-2.5 text-sm",

    lg: "px-6 py-3 text-base",
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? "w-full" : ""}
        ${className}
      `}
    >
      {children}
    </button>
  );
}
