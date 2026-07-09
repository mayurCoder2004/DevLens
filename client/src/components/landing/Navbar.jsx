import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Navbar() {
  return (
    <nav className="w-full h-20">
      <Container className="flex h-full items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-md"></div>

          <span className="text-xl font-semibold">
            DevLens
          </span>
        </div>

        {/* Navigation */}
        <ul className="flex items-center gap-8">
          <li className="text-sm">Features</li>
          <li className="text-sm">How It Works</li>
          <li className="text-sm">GitHub</li>
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Button>Sign In</Button>

          <Button>Get Started</Button>
        </div>

      </Container>
    </nav>
  );
}