const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce.number().int().positive(),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  // Primary AI Provider (Gemini)
  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),

  GEMINI_MODEL: z.string().min(1).default("gemini-2.5-flash"),

  // Fallback AI Provider (OpenRouter)
  OPENROUTER_API_KEY: z.string().optional(),

  OPENROUTER_BASE_URL: z.string().url().default("https://openrouter.ai/api/v1"),

  OPENROUTER_MODEL_PRIMARY: z
    .string()
    .default("qwen/qwen-2.5-coder-32b-instruct:free"),

  OPENROUTER_MODEL_SECONDARY: z
    .string()
    .default("meta-llama/llama-3.3-70b-instruct:free"),

  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),

  REDIS_URL: z.string().url("REDIS_URL must be a valid URL"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("❌ Environment validation failed:\n");

  parsed.error.issues.forEach((issue) => {
    console.error(`- ${issue.path.join(".")}: ${issue.message}`);
  });

  process.exit(1);
}

module.exports = parsed.data;
