import AWS from "aws-sdk";

const dynamo = new AWS.DynamoDB.DocumentClient();
const TABLE_NAME = process.env.DYNAMO_TABLE_NAME || "NewsletterSubscribers";

const saveEmail = async ({ email, action }) => {
  if (action === "subscribe") {
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
  } else if (action === "unsubscribe") {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        email,
      },
    };

    try {
      await dynamo.delete(params).promise();
    } catch (error) {
      console.error("Error deleting email from DynamoDB:", error);
      throw new Error(`Failed to delete email from DynamoDB, ${error.message}`);
    }
  } else {
    throw new Error(`Invalid action provided: ${action}`);
  }
};

export default saveEmail;
