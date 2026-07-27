const { z } = require("zod");

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),

  PORT: z.coerce.number().int().positive(),

  DATABASE_URL: z.string().min(1, "DATABASE_URL is required"),

  JWT_SECRET: z.string().min(32, "JWT_SECRET must be at least 32 characters"),

  GEMINI_API_KEY: z.string().min(1, "GEMINI_API_KEY is required"),

  GEMINI_MODEL: z.string().min(1).default("gemini-2.5-flash"),

  CLIENT_URL: z.string().url("CLIENT_URL must be a valid URL"),

  REDIS_HOST: z.string().min(1, "REDIS_HOST is required"),

  REDIS_PORT: z.coerce.number().int().positive(),
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