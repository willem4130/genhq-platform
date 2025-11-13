import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  /**
   * Server-side environment variables schema
   */
  server: {
    NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),

    // Supabase
    SUPABASE_SERVICE_ROLE_KEY: z.string().optional(),

    // Upstash Redis for rate limiting
    UPSTASH_REDIS_REST_URL: z.string().url().optional(),
    UPSTASH_REDIS_REST_TOKEN: z.string().optional(),

    // API Key for protected routes (optional - can be replaced with Supabase Auth)
    API_SECRET_KEY: z.string().min(32).optional(),
  },

  /**
   * Client-side environment variables schema
   * Must be prefixed with NEXT_PUBLIC_
   */
  client: {
    NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
    // Add more public env vars as needed
  },

  /**
   * Runtime environment variables
   * You can't destructure `process.env` as a regular object in Next.js edge runtimes
   * so we need to destructure manually
   */
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    UPSTASH_REDIS_REST_URL: process.env.UPSTASH_REDIS_REST_URL,
    UPSTASH_REDIS_REST_TOKEN: process.env.UPSTASH_REDIS_REST_TOKEN,
    API_SECRET_KEY: process.env.API_SECRET_KEY,
  },

  /**
   * Skip validation of environment variables on build.
   * Use only in environments where env vars are validated externally (e.g. Vercel)
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,

  /**
   * Makes it so that empty strings are treated as undefined.
   * `SOME_VAR: z.string()` and `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
})
