import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME || "NewsletterSubscribers";

const saveEmail = async (email) => {
  const params = {
    TableName: TABLE_NAME,
    Item: {
      email,
      subscribedAt: new Date().toISOString(),
    },
  };

  try {
    await dynamo.put(params).promise();
  } catch (error) {
    console.error("Error saving email to DynamoDB:", error);
    throw new Error(`Failed to save email to DynamoDB, ${error.message}`);
  }
};

export default saveEmail;
