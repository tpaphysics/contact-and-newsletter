// lambdas/sendContactEmail/index.js
import AWS from "aws-sdk";

const ses = new AWS.SES();

export const handler = async (event) => {
  const sendEmailPromises = event.Records.map(async (record) => {
    const { name, email, subject, message } = JSON.parse(record.body);

    const params = {
      Source: process.env.CONTACT_SES_EMAIL_SOURCE,
      Destination: {
        ToAddresses: [process.env.CONTACT_RECEIVER_EMAIL], // Enviar para si mesmo ou para algum e-mail administrativo
      },
      Message: {
        Subject: {
          Data: subject,
        },
        Body: {
          Text: {
            Data: `Nome: ${name}\nEmail: ${email}\nMensagem:\n\n ${message}`,
          },
        },
      },
    };

    return ses.sendEmail(params).promise();
  });

  try {
    await Promise.all(sendEmailPromises);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "E-mails enviados com sucesso" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro interno ao enviar e-mails" }),
    };
  }
};
