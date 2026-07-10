import { useNavigate } from "react-router-dom";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { GITHUB_REPO_URL } from "../../constants/urls";

/**
 * Scrolls to a section by ID with smooth behavior.
 * Falls back gracefully if the element doesn't exist.
 */
function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const navigate = useNavigate();

  return (
   <nav className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B0F19]">
      <Container className="flex h-16 items-center justify-between">

        {/* Logo → scrolls to hero */}
        <div
          onClick={() => scrollTo("hero")}
          className="flex cursor-pointer items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-600/20">
            DL
          </div>

          <span className="text-2xl font-bold tracking-tight text-white">
            DevLens
          </span>
        </div>

        {/* Navigation */}
        <ul className="hidden items-center gap-10 md:flex">

          <li
            onClick={() => scrollTo("features")}
            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            Features
          </li>

          <li
            onClick={() => scrollTo("how-it-works")}
            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            How It Works
          </li>

          <li>
            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
            >
              GitHub
            </a>
          </li>

        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Button
            variant="ghost"
            onClick={() => navigate("/login")}
          >
            Sign In
          </Button>

          <Button
            variant="primary"
            onClick={() => navigate("/login")}
          >
            Get Started
          </Button>

        </div>

      </Container>
    </nav>
  );
}