/// <reference types="vitest" />

import { config } from "dotenv";
config();

//console.log(process.env.JWT_SECRET); // Isso deve exibir o valor de JWT_SECRET se tudo estiver correto

export default {
  env: process.env,
};
