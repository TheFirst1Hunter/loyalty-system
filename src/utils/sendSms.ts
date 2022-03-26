import { twilio } from './clients';

export default async function sendSms(to: string, body: string) {
  const msgData = {
    from: process.env.TWILIO_PHONE_NUMBER,
    to: '+9647707757022',
    body,
  };

  await twilio.messages.create(msgData);
}
