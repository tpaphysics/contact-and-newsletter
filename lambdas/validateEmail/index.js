import sendEmail from "../../services/email/index.js";
import services from "../../services/jwt/index.js";
const { generateToken } = services;

const BASE_URL_LINK = process.env.BASE_URL_LINK;

export const handler = async (event) => {
  if (!event.Records || event.Records.length === 0) {
    return { statusCode: 204, message: "No records provided" };
  }

  const results = await Promise.all(event.Records.map(processRecord));

  const successResponses = results.filter((res) => res.statusCode === 200);
  if (successResponses.length === event.Records.length) {
    return { statusCode: 200, message: "All emails processed successfully" };
  } else {
    return { statusCode: 500, message: "Some emails failed to process" };
  }
};

async function processRecord(record) {
  const { email, action } = JSON.parse(record.body);

  if (!isValidEmail(email)) {
    return { statusCode: 400, message: "Invalid email format" };
  }
  if (!action) {
    return { statusCode: 400, message: "Invalid action" };
  }

  const token = generateToken({ email, action });
  const actionLink = `${BASE_URL_LINK}/api/newsletter?token=${token}`;

  try {
    await sendEmail(email, actionLink, action); // Adicionando 'action' como terceiro argumento

    if (action === "subscribe") {
      return {
        statusCode: 200,
        message: "Subscription confirmation email sent",
      };
    } else {
      return { statusCode: 200, message: "Unsubscription email sent" };
    }
  } catch (error) {
    console.error(`Error sending ${action} email:`, error);
    return { statusCode: 500, message: error.message };
  }
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
