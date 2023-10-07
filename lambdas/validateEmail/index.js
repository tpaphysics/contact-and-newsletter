import sendEmail from "../../services/email/index.js";
import services from "../../services/jwt/index.js";
const { generateToken } = services;

const BASE_URL_LINK = process.env.BASE_URL_LINK;

export const handler = async (event) => {
  // Se não houver registros, retorne rapidamente
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
  const { email } = JSON.parse(record.body);

  if (!isValidEmail(email)) {
    return { statusCode: 400, message: "Invalid email format" };
  }

  const token = generateToken(email);
  const confirmationLink = `${BASE_URL_LINK}/api/newsletter?token=${token}`;

  try {
    await sendEmail(email, confirmationLink);
    return { statusCode: 200, message: "Confirmation email sent" };
  } catch (error) {
    console.error("Error sending email:", error);
    return { statusCode: 500, message: error.message };
  }
}

function isValidEmail(email) {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return regex.test(email);
}
