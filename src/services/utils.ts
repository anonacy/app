import { error } from "./dialog";

export function isEmail(message = ""): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(message)) {
    // throw new Error('Invalid email format');
    error('Invalid email format');
    return false;
  }
  return true;
}