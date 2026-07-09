import Button from "../ui/Button";

export default function Navbar() {
  return (
    <nav className="w-full h-20">
    <div className="mx-auto flex h-full max-w-7xl items-center justify-between">

        {/* Logo */}
        <div className="flex items-center">
          <div></div>
          <span>DevLens</span>
        </div>

        {/* Navigation */}
        <ul className="flex">
          <li>Features</li>
          <li>How It Works</li>
          <li>GitHub</li>
        </ul>

        {/* Actions */}
        <div className="flex">
          <Button>
    Sign In
</Button>
          <Button>
    Get Started
</Button>
        </div>

      </div>
    </nav>
  );
}