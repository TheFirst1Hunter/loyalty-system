import { twilio, messageBirdClient } from './clients';

// Deprecated
// export default async function sendSms(to: string, body: string) {
//   const msgData = {
//     from: process.env.TWILIO_PHONE_NUMBER,
//     to,
//     body,
//   };

//   await twilio.messages.create(msgData);
// }

export const convertToInternational = (value: string): string => {
  const iraqiInternationalCode = '+964';

  if (value.startsWith(iraqiInternationalCode)) {
    return value;
  }

  const newPhoneNumber = value.startsWith('0')
    ? value.replace('0', iraqiInternationalCode)
    : iraqiInternationalCode + value;

  return newPhoneNumber;
};

export default function sendSMS(recipients: string[], body: string) {
  const params = {
    originator: process.env.MESSAGE_BIRD_ORIGINATOR,
    recipients,
    body,
  };

  messageBirdClient.messages.create(params, function (err, response) {
    if (err) {
      return console.log(err);
    }
    console.log(response);
  });
}
