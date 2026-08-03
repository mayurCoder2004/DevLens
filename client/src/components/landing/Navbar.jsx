import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import Container from "../ui/Container";
import Button from "../ui/Button";
import { GITHUB_REPO_URL } from "../../constants/urls";
import { useMotionVariants } from "../../utils/motion";

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
  const [mobileOpen, setMobileOpen] = useState(false);
  const { fadeDown } = useMotionVariants();

  function handleNavClick(id) {
    scrollTo(id);
    setMobileOpen(false);
  }

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b border-slate-800 bg-[#0B0F19]"
      variants={fadeDown}
      initial="hidden"
      animate="visible"
    >
      <Container className="flex h-16 items-center justify-between">

        {/* Logo → scrolls to hero */}
        <div
          onClick={() => handleNavClick("hero")}
          className="flex cursor-pointer items-center gap-3"
        >
          <div
  onClick={() => handleNavClick("hero")}
  className="flex cursor-pointer items-center"
>
  <img
    src="/logo-dark.png"
    alt="DevLens"
    className="h-10 w-auto object-contain"
  />
</div>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden items-center gap-8 md:flex lg:gap-10">
          <li
            onClick={() => handleNavClick("features")}
            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            Features
          </li>

          <li
            onClick={() => handleNavClick("how-it-works")}
            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            Workflow
          </li>

          <li
            onClick={() => handleNavClick("workspace")}
            className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white"
          >
            Workspace
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

        {/* Desktop Actions */}
        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            Sign In
          </Button>
          <Button variant="primary" onClick={() => navigate("/login")}>
            Get Started
          </Button>
        </div>

        {/* Mobile: hamburger */}
        <button
          className="flex items-center justify-center rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-800 hover:text-white md:hidden"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>

      </Container>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          className="border-t border-slate-800 bg-[#0B0F19] md:hidden"
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Container className="flex flex-col gap-1 py-4">
            <button
              onClick={() => handleNavClick("features")}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Features
            </button>

            <button
              onClick={() => handleNavClick("how-it-works")}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Workflow
            </button>

            <button
              onClick={() => handleNavClick("workspace")}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              Workspace
            </button>

            <a
              href={GITHUB_REPO_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
            >
              GitHub
            </a>

            <div className="mt-3 flex flex-col gap-2 border-t border-slate-800 pt-3">
              <Button
                variant="ghost"
                fullWidth
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
              >
                Sign In
              </Button>
              <Button
                variant="primary"
                fullWidth
                onClick={() => { navigate("/login"); setMobileOpen(false); }}
              >
                Get Started
              </Button>
            </div>
          </Container>
        </motion.div>
      )}
    </motion.nav>
  );
}