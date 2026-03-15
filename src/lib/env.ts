import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    RESEND_API_KEY: z.string().min(1),
    LEADS_TO_EMAIL: z.string().email(),
    LEADS_FROM_EMAIL: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_URL: z.string().url().optional(),
  },
  runtimeEnv: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEADS_TO_EMAIL: process.env.LEADS_TO_EMAIL,
    LEADS_FROM_EMAIL: process.env.LEADS_FROM_EMAIL,
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  },
  // Important for Vercel build-time: allow missing values during build output generation.
  // Runtime will still require these when the API route is invoked.
  skipValidation:
    process.env.VERCEL === "1" &&
    (process.env.VERCEL_ENV === "production" || process.env.VERCEL_ENV === "preview"),
});
