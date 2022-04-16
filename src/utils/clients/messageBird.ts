import messageBird from 'messagebird';

export const messageBirdClient = messageBird(process.env.MESSAGE_BIRD_LIVE_KEY);
