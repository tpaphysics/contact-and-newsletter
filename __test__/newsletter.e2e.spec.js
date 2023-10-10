/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import credencials from "./credentials.json";

const { apiKey, confirmURL, subscribeURL, sendMail, validToken } = credencials;

describe("Token Functions", () => {
  it("Deve ocorrer o erro  'Forbidden'", async () => {
    const response = await fetch(`${subscribeURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: sendMail }), // Substitua isso conforme necessário
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
      body: JSON.stringify({ email: sendMail }), // Substitua isso conforme necessário
    });

    const data = await response.json();
    console.log(data);

    expect(response.status).toBe(200);
  });
  it("Deve confirmURLar o email relativo ao token válido e ter status 200", async () => {
    const response = await fetch(`${confirmURL}?token=${validToken}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Adicione outros cabeçalhos necessários, como x-api-key se estiver usando autenticação por chave de API
      },
    });

    const data = await response.json();
    console.log(data);

    expect(response.status).toBe(200);
  });
});
