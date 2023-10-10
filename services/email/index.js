import AWS from "aws-sdk";
import subscription from "./subscription.js";
import unsubscription from "./unsubscription.js";

const ses = new AWS.SES();

const NEWSLETTER_SES_EMAIL_SOURCE = process.env.NEWSLETTER_SES_EMAIL_SOURCE;

const sendEmail = async (recipientEmail, confirmationLink, action) => {
  const template = action === "subscription" ? subscription : unsubscription;

  const emailBody = template.replace("[LINK]", confirmationLink);

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
    Source: `${NEWSLETTER_SES_EMAIL_SOURCE}`,
  };

  try {
    await ses.sendEmail(params).promise();
  } catch (error) {
    console.error("Error sending email via SES:", error);
    throw error;
  }
};

export default sendEmail;
