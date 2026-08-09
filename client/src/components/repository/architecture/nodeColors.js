/**
 * Professional color schemes for different file types
 * Following design systems from Linear, Vercel, and GitHub
 */

/**
 * Detect file type from filename and path
 * @param {string} filename - File name or path
 * @returns {string} File type category
 */
export function detectFileType(filename) {
  const lower = filename.toLowerCase();
  const ext = filename.split(".").pop()?.toLowerCase();

  // React Components (highest priority)
  if (ext === "jsx" || ext === "tsx") {
    return "react";
  }

  // TypeScript
  if (ext === "ts" && ext !== "tsx") {
    return "typescript";
  }

  // JavaScript
  if (["js", "mjs", "cjs", "es", "es6"].includes(ext)) {
    return "javascript";
  }

  // Configuration files
  if (
    [
      "json",
      "yaml",
      "yml",
      "toml",
      "ini",
      "config",
      "rc",
      "conf",
      "lock",
    ].includes(ext) ||
    lower.includes("config") ||
    lower.includes(".eslintrc") ||
    lower.includes(".prettierrc") ||
    (lower.startsWith(".") && !lower.includes("/"))
  ) {
    return "config";
  }

  // Docker
  if (
    lower.includes("docker") ||
    lower === "dockerfile" ||
    ext === "dockerfile"
  ) {
    return "docker";
  }

  // Security & Auth
  if (
    lower.includes("auth") ||
    lower.includes("security") ||
    lower.includes("secret") ||
    ext === "env" ||
    lower === ".env" ||
    lower.includes("password") ||
    lower.includes("token")
  ) {
    return "security";
  }

  // Test files
  if (
    lower.includes("test") ||
    lower.includes("spec") ||
    lower.includes(".test.") ||
    lower.includes(".spec.") ||
    lower.includes("__tests__")
  ) {
    return "test";
  }

  // Utilities & Helpers
  if (
    lower.includes("util") ||
    lower.includes("helper") ||
    lower.includes("lib") ||
    lower.includes("common")
  ) {
    return "utility";
  }

  // Styles
  if (["css", "scss", "sass", "less", "styl", "stylus"].includes(ext)) {
    return "style";
  }

  // Documentation
  if (["md", "mdx", "txt", "doc", "pdf"].includes(ext) || lower === "readme") {
    return "documentation";
  }

  // Database
  if (
    ["sql", "db", "sqlite", "prisma"].includes(ext) ||
    lower.includes("database")
  ) {
    return "database";
  }

  // API/Routes
  if (
    lower.includes("api") ||
    lower.includes("route") ||
    lower.includes("controller") ||
    lower.includes("service")
  ) {
    return "api";
  }

  // Build tools
  if (
    lower.includes("webpack") ||
    lower.includes("vite") ||
    lower.includes("rollup") ||
    lower.includes("babel") ||
    lower.includes("esbuild")
  ) {
    return "build";
  }

  // Assets
  if (["png", "jpg", "jpeg", "gif", "svg", "ico", "webp"].includes(ext)) {
    return "asset";
  }

  return "default";
}

/**
 * Get user-friendly label for file type
 * @param {string} fileType - File type category
 * @returns {string} Display label
 */
export function getFileTypeLabel(fileType) {
  const labels = {
    react: "React Component",
    javascript: "JavaScript",
    typescript: "TypeScript",
    config: "Configuration",
    docker: "Docker",
    security: "Security",
    test: "Test File",
    utility: "Utility",
    style: "Stylesheet",
    documentation: "Documentation",
    database: "Database",
    api: "API",
    build: "Build Config",
    asset: "Asset",
    default: "File",
  };

  return labels[fileType] || "File";
}

/**
 * Get icon emoji for file type
 * @param {string} filename - File name
 * @returns {string} Emoji icon
 */
export function getFileIcon(filename) {
  const fileType = detectFileType(filename);

  const icons = {
    react: "⚛️",
    javascript: "📜",
    typescript: "📘",
    config: "⚙️",
    docker: "🐳",
    security: "🔐",
    test: "🧪",
    utility: "🔧",
    style: "🎨",
    documentation: "📝",
    database: "🗄️",
    api: "🔌",
    build: "📦",
    asset: "🖼️",
    default: "📄",
  };

  return icons[fileType] || "📄";
}

/**
 * Get professional color scheme for node based on file type
 * Colors inspired by Linear, Vercel, and modern dev tools
 *
 * @param {string} filename - File name or path
 * @returns {Object} Color scheme with border, background, and hover states
 */
export function getNodeColorScheme(filename) {
  const fileType = detectFileType(filename);

  const colorSchemes = {
    // React - Cyan (brand color)
    react: {
      border: "rgb(34, 211, 238)",
      borderHover: "rgb(103, 232, 249)",
      background: "rgba(34, 211, 238, 0.08)",
      backgroundHover: "rgba(34, 211, 238, 0.15)",
      glow: "rgba(34, 211, 238, 0.3)",
      badge: "rgba(34, 211, 238, 0.12)",
      text: "rgb(103, 232, 249)",
    },

    // JavaScript - Blue
    javascript: {
      border: "rgb(59, 130, 246)",
      borderHover: "rgb(96, 165, 250)",
      background: "rgba(59, 130, 246, 0.08)",
      backgroundHover: "rgba(59, 130, 246, 0.15)",
      glow: "rgba(59, 130, 246, 0.3)",
      badge: "rgba(59, 130, 246, 0.12)",
      text: "rgb(96, 165, 250)",
    },

    // TypeScript - Blue (darker shade)
    typescript: {
      border: "rgb(96, 165, 250)",
      borderHover: "rgb(147, 197, 253)",
      background: "rgba(96, 165, 250, 0.08)",
      backgroundHover: "rgba(96, 165, 250, 0.15)",
      glow: "rgba(96, 165, 250, 0.3)",
      badge: "rgba(96, 165, 250, 0.12)",
      text: "rgb(147, 197, 253)",
    },

    // Configuration - Orange
    config: {
      border: "rgb(251, 146, 60)",
      borderHover: "rgb(253, 186, 116)",
      background: "rgba(251, 146, 60, 0.08)",
      backgroundHover: "rgba(251, 146, 60, 0.15)",
      glow: "rgba(251, 146, 60, 0.3)",
      badge: "rgba(251, 146, 60, 0.12)",
      text: "rgb(253, 186, 116)",
    },

    // Docker - Purple
    docker: {
      border: "rgb(168, 85, 247)",
      borderHover: "rgb(192, 132, 252)",
      background: "rgba(168, 85, 247, 0.08)",
      backgroundHover: "rgba(168, 85, 247, 0.15)",
      glow: "rgba(168, 85, 247, 0.3)",
      badge: "rgba(168, 85, 247, 0.12)",
      text: "rgb(192, 132, 252)",
    },

    // Security - Red
    security: {
      border: "rgb(239, 68, 68)",
      borderHover: "rgb(248, 113, 113)",
      background: "rgba(239, 68, 68, 0.08)",
      backgroundHover: "rgba(239, 68, 68, 0.15)",
      glow: "rgba(239, 68, 68, 0.3)",
      badge: "rgba(239, 68, 68, 0.12)",
      text: "rgb(248, 113, 113)",
    },

    // Test - Yellow
    test: {
      border: "rgb(234, 179, 8)",
      borderHover: "rgb(250, 204, 21)",
      background: "rgba(234, 179, 8, 0.08)",
      backgroundHover: "rgba(234, 179, 8, 0.15)",
      glow: "rgba(234, 179, 8, 0.3)",
      badge: "rgba(234, 179, 8, 0.12)",
      text: "rgb(250, 204, 21)",
    },

    // Utility - Green
    utility: {
      border: "rgb(34, 197, 94)",
      borderHover: "rgb(74, 222, 128)",
      background: "rgba(34, 197, 94, 0.08)",
      backgroundHover: "rgba(34, 197, 94, 0.15)",
      glow: "rgba(34, 197, 94, 0.3)",
      badge: "rgba(34, 197, 94, 0.12)",
      text: "rgb(74, 222, 128)",
    },

    // Style - Pink
    style: {
      border: "rgb(236, 72, 153)",
      borderHover: "rgb(244, 114, 182)",
      background: "rgba(236, 72, 153, 0.08)",
      backgroundHover: "rgba(236, 72, 153, 0.15)",
      glow: "rgba(236, 72, 153, 0.3)",
      badge: "rgba(236, 72, 153, 0.12)",
      text: "rgb(244, 114, 182)",
    },

    // Documentation - Slate
    documentation: {
      border: "rgb(148, 163, 184)",
      borderHover: "rgb(203, 213, 225)",
      background: "rgba(148, 163, 184, 0.08)",
      backgroundHover: "rgba(148, 163, 184, 0.15)",
      glow: "rgba(148, 163, 184, 0.3)",
      badge: "rgba(148, 163, 184, 0.12)",
      text: "rgb(203, 213, 225)",
    },

    // Database - Indigo
    database: {
      border: "rgb(99, 102, 241)",
      borderHover: "rgb(129, 140, 248)",
      background: "rgba(99, 102, 241, 0.08)",
      backgroundHover: "rgba(99, 102, 241, 0.15)",
      glow: "rgba(99, 102, 241, 0.3)",
      badge: "rgba(99, 102, 241, 0.12)",
      text: "rgb(129, 140, 248)",
    },

    // API - Emerald
    api: {
      border: "rgb(16, 185, 129)",
      borderHover: "rgb(52, 211, 153)",
      background: "rgba(16, 185, 129, 0.08)",
      backgroundHover: "rgba(16, 185, 129, 0.15)",
      glow: "rgba(16, 185, 129, 0.3)",
      badge: "rgba(16, 185, 129, 0.12)",
      text: "rgb(52, 211, 153)",
    },

    // Build - Amber
    build: {
      border: "rgb(245, 158, 11)",
      borderHover: "rgb(251, 191, 36)",
      background: "rgba(245, 158, 11, 0.08)",
      backgroundHover: "rgba(245, 158, 11, 0.15)",
      glow: "rgba(245, 158, 11, 0.3)",
      badge: "rgba(245, 158, 11, 0.12)",
      text: "rgb(251, 191, 36)",
    },

    // Asset - Rose
    asset: {
      border: "rgb(244, 63, 94)",
      borderHover: "rgb(251, 113, 133)",
      background: "rgba(244, 63, 94, 0.08)",
      backgroundHover: "rgba(244, 63, 94, 0.15)",
      glow: "rgba(244, 63, 94, 0.3)",
      badge: "rgba(244, 63, 94, 0.12)",
      text: "rgb(251, 113, 133)",
    },

    // Default - Gray
    default: {
      border: "rgb(100, 116, 139)",
      borderHover: "rgb(148, 163, 184)",
      background: "rgba(100, 116, 139, 0.08)",
      backgroundHover: "rgba(100, 116, 139, 0.15)",
      glow: "rgba(100, 116, 139, 0.3)",
      badge: "rgba(100, 116, 139, 0.12)",
      text: "rgb(148, 163, 184)",
    },
  };

  return colorSchemes[fileType] || colorSchemes.default;
}
