import saveEmail from "../../models/index.js";

export const handler = async (event) => {
  if (!event.Records || event.Records.length === 0) {
    return { statusCode: 204, message: "No records provided" };
  }

  const results = await Promise.all(event.Records.map(processRecord));

  const failedResponses = results.filter((res) => res.statusCode !== 200);
  if (failedResponses.length === 0) {
    return {
      statusCode: 200,
      message: "All email actions processed successfully",
    };
  } else {
    return { statusCode: 500, message: "Some email actions failed to process" };
  }
};

async function processRecord(record) {
  const { email, action } = JSON.parse(record.body);

  if (!email || !action) {
    return {
      statusCode: 400,
      message: "Email or action not present in payload",
    };
  }

  try {
    await saveEmail({ email, action }); // Pass the action to saveEmail function
    if (action === "subscribe") {
      return { statusCode: 200, message: `Subscribed: ${email}` };
    } else {
      return { statusCode: 200, message: `Unsubscribed: ${email}` };
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.message.includes("Email or action not present in payload")) {
      return { statusCode: 400, message: error.message };
    }
    return { statusCode: 500, message: "Internal server error" };
  }
}
