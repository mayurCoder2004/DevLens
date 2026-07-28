import { ArrowUpRight, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import Container from "../ui/Container";
import { GITHUB_REPO_URL, LINKEDIN_URL } from "../../constants/urls";
import { useMotionVariants, defaultViewport } from "../../utils/motion";

const currentYear = new Date().getFullYear();

/**
 * Footer navigation links.
 * - external: opens in a new tab (uses <a>)
 * - internal: React Router <Link> (no page reload)
 */
const links = [
  {
    title: "GitHub",
    href: GITHUB_REPO_URL,
    external: true,
  },
  {
    title: "Contact",
    href: LINKEDIN_URL,
    external: true,
  },
  {
    title: "Privacy",
    href: "/privacy",
    external: false,
  },
  {
    title: "Terms",
    href: "/terms",
    external: false,
  },
];

export default function Footer() {
  const { fadeUp } = useMotionVariants();
  return (
    <motion.footer
      className="border-t border-slate-800 bg-[#0B0F19]"
      variants={fadeUp}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport}
    >
      <Container>
        {/* Top */}

        <div className="flex flex-col gap-10 py-12 sm:gap-12 sm:py-14 lg:flex-row lg:items-start lg:justify-between">
          {/* Branding */}

          <div className="max-w-md">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
  <img
    src="/favicon.png"
    alt="DevLens"
    className="h-11 w-11"
  />

  <div>
    <h3 className="text-xl font-bold text-white">DevLens</h3>

    <p className="text-sm text-slate-400">
      AI Engineering Intelligence Platform
    </p>
  </div>
</div>
            </div>

            <p className="mt-5 text-sm leading-7 text-slate-400 sm:mt-6">
              Analyze repositories, understand architecture,
              detect technical debt, evaluate deployment readiness,
              and generate AI-powered engineering insights from one platform.
            </p>
          </div>

          {/* Navigation — wraps to 2×2 on mobile, row on lg */}

          <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:flex sm:flex-wrap sm:gap-8">
            {links.map((link) =>
              link.external ? (
                <a
                  key={link.title}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.title}

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              ) : (
                <Link
                  key={link.title}
                  to={link.href}
                  className="group flex items-center gap-1 text-sm text-slate-400 transition-colors hover:text-white"
                >
                  {link.title}

                  <ArrowUpRight
                    size={15}
                    className="transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </Link>
              )
            )}
          </div>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center gap-3 border-t border-slate-800 py-6 text-sm text-slate-500 sm:gap-4 md:flex-row md:justify-between">
          <span>
            © {currentYear} DevLens. All rights reserved.
          </span>

          <div className="flex items-center gap-2">
            <span>Designed &amp; Developed with</span>

            <Heart
              size={15}
              className="fill-red-500 text-red-500"
            />

            <span>by Mayur Pawar</span>
          </div>
        </div>
      </Container>
    </motion.footer>
  );
}