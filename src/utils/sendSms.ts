import { HttpException, HttpStatus } from '@nestjs/common';
import { MessageBird } from 'messagebird/types';
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
  return new Promise((resolve, reject) => {
    messageBirdClient.messages.create(
      {
        datacoding: 'unicode',
        recipients,
        body,
        originator: process.env.MESSAGE_BIRD_ORIGINATOR,
      },
      function (err: any) {
        if (err) {
          reject(err.errors[0].description);
          // console.debug(err.errors[0].description);
          // throw new HttpException(`${err.errors[0].description}`, 400);
          // return console.log(err);
        }
        resolve('finished');
      },
    );

    // console.log(response);
  });
}
