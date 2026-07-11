import { Activity } from "lucide-react";
import { Link } from "react-router-dom";

export default function DevLensLogo() {
  return (
    <Link
      to="/dashboard"
      className="flex items-center gap-3"
    >
      <div
  className="
    flex
    h-10
    w-10
          items-center
          justify-center
          rounded-xl
          bg-blue-500/10
          border
          border-blue-500/20
        "
      >
        <Activity
          size={22}
          className="text-blue-400"
        />
      </div>

      <div>
        <h2 className="text-[18px] font-bold tracking-tight text-white">
          DevLens
        </h2>

        <p className="text-[11px] text-slate-400">
          Engineering Intelligence
        </p>
      </div>
    </Link>
  );
}