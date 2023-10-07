import AWS from "aws-sdk";
import services from "../../services/jwt/index.js";
const { verifyToken } = services;

const sqs = new AWS.SQS();
const VERIFICATION_QUEUE_URL = process.env.VERIFICATION_QUEUE_URL;

export const handler = async (event) => {
  const token = event.queryStringParameters.token;

  try {
    const email = verifyToken(token);

    await sqs
      .sendMessage({
        QueueUrl: VERIFICATION_QUEUE_URL,
        MessageBody: JSON.stringify({ email }),
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email confirmation is in progress!" }),
    };
  } catch (error) {
    console.error("Error:", error);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
