// src/utils/env.ts
export function getEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`La variable de entorno "${name}" no está definida`);
  }
  return value;
}
