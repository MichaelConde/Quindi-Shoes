"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getEnvVar = getEnvVar;
// src/utils/env.ts
function getEnvVar(name) {
    const value = process.env[name];
    if (!value) {
        throw new Error(`La variable de entorno "${name}" no está definida`);
    }
    return value;
}
