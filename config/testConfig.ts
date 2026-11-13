export const testConfig = {
  baseURL: process.env.BASE_URL ?? 'https://automationexercise.com',
  timeout: 45_000,
  navigationTimeout: 30_000,
} as const;
