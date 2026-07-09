import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <nav className="w-full h-20 border-b border-slate-800 bg-[#0B0F19]">
      <Container className="flex h-full items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">

          {/* Temporary Logo */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500 text-sm font-bold text-white">
            DL
          </div>

          <span className="text-xl font-bold text-white">
            DevLens
          </span>
        </div>

        {/* Navigation */}
        <ul className="flex items-center gap-8">

          <li className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200">
            Features
          </li>

          <li className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200">
            How It Works
          </li>

          <li className="cursor-pointer text-sm font-medium text-slate-300 transition-colors duration-200">
            GitHub
          </li>

        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">

          <Button className="text-slate-300">
            Sign In
          </Button>

          <Button className="text-slate-300">
            Get Started
          </Button>

        </div>

      </Container>
    </nav>
  );
}