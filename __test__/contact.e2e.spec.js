/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import credencials from "./credentials.json";

const { apiKey, contactURL } = credencials;

const mockContactBody = {
  name: "Elon Musk",
  email: "x@x.com",
  subject: "Contrato a Space X",
  message:
    "Olá Sr. Duane, a nossa equipe que fechar um contrato milionário contigo.",
};

describe("Token Functions", () => {
  it("Deve enviar um email para mim mesmo com a menssagem de contato'", async () => {
    const response = await fetch(`${contactURL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": `${apiKey}`,
      },
      body: JSON.stringify(mockContactBody), // Substitua isso conforme necessário
    });
    console.log(response.error);
    expect(response.status).toBe(200);
  });
});
