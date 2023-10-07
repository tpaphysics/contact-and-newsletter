import AWS from "aws-sdk";

const sqs = new AWS.SQS();
const QUEUE_URL = process.env.SUBSCRIBE_QUEUE_URL;

export const handler = async (event) => {
  let body;

  try {
    body = JSON.parse(event.body);
  } catch (err) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid request format" }),
    };
  }

  const email = body.email;

  if (!email || !isValidEmail(email)) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Invalid email format" }),
    };
  }

  try {
    await sqs
      .sendMessage({
        QueueUrl: QUEUE_URL,
        MessageBody: JSON.stringify({ email }),
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email received and added to the queue",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: error.message }),
    };
  }
};

function isValidEmail(email) {
  const regex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  return regex.test(email);
}
