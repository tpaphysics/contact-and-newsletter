import saveEmail from "../../models/index.js";

export const handler = async (event) => {
  // Se não houver registros, retorne rapidamente
  if (!event.Records || event.Records.length === 0) {
    return { statusCode: 204, message: "No records provided" };
  }

  const results = await Promise.all(event.Records.map(processRecord));

  const failedResponses = results.filter((res) => res.statusCode !== 200);
  if (failedResponses.length === 0) {
    return { statusCode: 200, message: "All emails saved successfully" };
  } else {
    return { statusCode: 500, message: "Some emails failed to save" };
  }
};

async function processRecord(record) {
  const payload = JSON.parse(record.body);

  if (!payload.email) {
    return { statusCode: 400, message: "Email not present in payload" };
  }

  try {
    await saveEmail(payload.email);
    return { statusCode: 200, message: payload.email };
  } catch (error) {
    console.error("Error:", error);
    if (error.message.includes("Email not present in payload")) {
      return { statusCode: 400, message: error.message };
    }
    return { statusCode: 500, message: "Internal server error" };
  }
}
