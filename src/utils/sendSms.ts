import { twilio } from './clients';

export default async function sendSms(to: string, body: string) {
  const msgData = {
    from: process.env.TWILIO_PHONE_NUMBER,
    to,
    body,
  };

  await twilio.messages.create(msgData);
}
