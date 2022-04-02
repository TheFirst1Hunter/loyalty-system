import { twilio } from './clients';

export default async function sendSms(to: string, body: string) {
  const msgData = {
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body,
  };

  await twilio.messages.create(msgData);
}

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
