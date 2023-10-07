// newsletterTemplate.js
const confirmationTemplate = `
<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
      body {
        font-family: Arial, sans-serif;
        padding: 20px;
        color: #333;
      }
      .container {
        padding: 20px;
        border-radius: 5px;
      }
      .header {
        text-align: start;
      }
      .header img {
        width: 150px;
        text-align: start;
      }
      .content {
        margin-top: 50px;
      }
      .footer {
        margin-top: 30px;
        text-align: start;
        font-size: 0.8em;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <h2>Newsletter: Portal Exploradores Modernos</h2>
      </div>
      <div class="content">
        <p>Olá, menssagem automática 🤖, não responda !</p>
        <p>
          Para confirmar ✔️ sua inscrição em nossa newsletter, acesse o link
          abaixo:
        </p>
        <p>[LINK]</p>
        <p>Nota: O link é válido por 24 horas. ⏳</p>
      </div>
      <div class="footer">
        Atenciosamente,<br />
        Portal Exploradores Modernos 🌍
      </div>
    </div>
  </body>
</html>

`;

export default confirmationTemplate;
