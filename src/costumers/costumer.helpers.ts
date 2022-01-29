import { genSalt, hash } from 'bcrypt';

export const hashPassword = async (text: string) => {
  const salt = await genSalt(12);
  return await hash(text, salt);
};
