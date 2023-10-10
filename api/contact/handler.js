import AWS from "aws-sdk";

const sqs = new AWS.SQS();

export const handler = async (event) => {
  try {
    const body = JSON.parse(event.body);

    const { name, email, subject, message } = body;

    // Validação básica dos campos
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ message: "Campos inválidos" }),
      };
    }

    const params = {
      QueueUrl: process.env.CONTACT_QUEUE_URL,
      MessageBody: JSON.stringify(body),
    };

    await sqs.sendMessage(params).promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Mensagem enviada com sucesso" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Erro interno do servidor" }),
    };
  }
};
