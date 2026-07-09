export default function Button({
  children,
  onClick,
  type = "button",
  className = "",
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-5 py-2 ${className}`}
    >
      {children}
    </button>
  );
}