import AWS from "aws-sdk";

const sqs = new AWS.SQS();
const QUEUE_URL = process.env.SUBSCRIPTION_ACTION_QUEUE_URL;

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
  const { email, action } = body;

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
        MessageBody: JSON.stringify({ email, action }),
      })
      .promise();

    const responseMessage =
      action === "subscribe"
        ? "Email received and added to the subscription queue"
        : "Email received and added to the unsubscription queue";

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: responseMessage,
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
