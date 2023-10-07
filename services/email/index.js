import AWS from "aws-sdk";
import confirmationTemplate from "./template.js";

const ses = new AWS.SES();

const SES_EMAIL_SOURCE = process.env.SES_EMAIL_SOURCE;

const sendEmail = async (recipientEmail, confirmationLink) => {
  const emailBody = confirmationTemplate.replace("[LINK]", confirmationLink);

  const params = {
    Destination: {
      ToAddresses: [recipientEmail],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: emailBody,
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Confirmação de Inscrição na Newsletter",
      },
    },
    Source: `${SES_EMAIL_SOURCE}`,
  };

  try {
    await ses.sendEmail(params).promise();
  } catch (error) {
    console.error("Error sending email via SES:", error);
    throw error;
  }
};

export default sendEmail;
