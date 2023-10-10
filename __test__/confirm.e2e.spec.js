/// <reference types="vitest" />

import { describe, it, expect } from "vitest";
import credencials from "./credentials.json";

const { confirmURL, validToken } = credencials;

// Exclui ou adiciona no dynamo
// Obtenha o token válido do email enviado e ensira no arquivo credentials.json

describe("Confirma insere ou deleta no dynamo", () => {
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
