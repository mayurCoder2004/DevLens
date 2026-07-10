import { ArrowUpRight, Heart } from "lucide-react";

import Container from "../ui/Container";

const currentYear = new Date().getFullYear();

const links = [
  {
    title: "GitHub",
    href: "#",
  },
  {
    title: "Documentation",
    href: "#",
  },
  {
    title: "Contact",
    href: "#",
  },
  {
    title: "Privacy",
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-[#0B0F19]">
      <Container>
        {/* Top */}

        <div className="flex flex-col gap-12 py-14 lg:flex-row lg:items-center lg:justify-between">
          {/* Branding */}

          <div>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-lg font-bold text-white shadow-lg shadow-blue-500/20">
                DL
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white">
                  DevLens
                </h3>

                <p className="text-sm text-slate-400">
                  AI Engineering Intelligence Platform
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-slate-400">
              Analyze repositories, understand architecture,
              detect technical debt, evaluate deployment readiness,
              and generate AI-powered engineering insights from one platform.
            </p>
          </div>

          {/* Navigation */}

          <div className="flex flex-wrap gap-8">
            {links.map((link) => (
              <a
                key={link.title}
                href={link.href}
                className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.title}

                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-800 py-6 text-sm text-slate-500 md:flex-row">
          <span>
            © {currentYear} DevLens. All rights reserved.
          </span>

          <div className="flex items-center gap-2">
            <span>Designed & Developed with</span>

            <Heart
              size={15}
              className="fill-red-500 text-red-500"
            />

            <span>by Mayur Pawar</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}