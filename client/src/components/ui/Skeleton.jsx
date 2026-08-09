/**
 * Base Skeleton Component
 *
 * A reusable skeleton loading component with animated pulse effect.
 * Used as the foundation for all skeleton loading states in the application.
 *
 * @example
 * <Skeleton className="h-6 w-40" />
 * <Skeleton className="h-12 w-full rounded-lg" />
 */

const Skeleton = ({ className = "" }) => {
  return (
    <div
      className={`bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 bg-[length:200%_100%] rounded ${className}`}
      style={{
        animation: "skeleton-pulse 1.5s ease-in-out infinite",
      }}
    />
  );
};

export default Skeleton;
