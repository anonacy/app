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

export function pluralize(word: string) {
  return word.endsWith("s") || word.endsWith("x") ? word + "es" : word + "s";
}

export function unpluralize(word: string) {
  return word.endsWith("es") ? word.slice(0, -2) : word.slice(0, -1);
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}