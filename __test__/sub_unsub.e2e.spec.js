/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import credencials from "./credentials.json";

const { apiKey, subscribeURL, sendMail } = credencials;

// Insira a ação que você deseja executar sunscribe ou unsubscribe
const action = "subscription";

describe("Token Functions", () => {
  it("Deve ocorrer o erro  'Forbidden'", async () => {
    const response = await fetch(`${subscribeURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sendMail, action }), // Substitua isso conforme necessário
    });

    const data = await response.json();
    console.log(data);

    expect(response.status).toBe(403);
  });
  it("Deve subscrever o email e ter status 200", async () => {
    const response = await fetch(`${subscribeURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
      body: JSON.stringify({ email: sendMail, action }), // Substitua isso conforme necessário
    });

    const data = await response.json();
    console.log(data);

    expect(response.status).toBe(200);
  });
});
