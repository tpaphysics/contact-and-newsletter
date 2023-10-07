/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import services from "../services/jwt/index.js";
const { generateToken, verifyToken } = services;

const email = "teste@email.com";
describe("Token Functions", () => {
  it("Deve criar um token", () => {
    const token = generateToken(email);
    console.log(token);
    expect(token).toBeDefined();
  });
  it("should verify se o token é válido", () => {
    const token = generateToken(email);
    console.log(token);
    const isValid = verifyToken(token);
    console.log(isValid);
    expect(isValid).toBeDefined();
  });
});
