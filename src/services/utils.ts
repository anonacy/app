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

export function isDomainName(message = ""): boolean {
  const domainNameRegex = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)(\.(?!-)[a-zA-Z0-9-]{1,63}(?<!-))*$/;
  if (!domainNameRegex.test(message)) {
    error('Invalid domain name format');
    return false;
  }
  return true;
}

export function extractSubdomain(domain: string): string {
  const parts = domain.split('.');
  if (parts.length > 2) {
    return parts.slice(0, -2).join('.');
  } else {
    return '';
  }
}

export function pluralize(word: string) {
  return word.endsWith("s") || word.endsWith("x") || word.endsWith("z") ? word + "es" : word + "s";
}

export function unpluralize(word: string) {
  if (word.endsWith("es") && (word[word.length - 3] === 's' || word[word.length - 3] === 'x' || word[word.length - 3] === 'z')) {
    return word.slice(0, -2);
  } else if (word.endsWith("s")) {
    return word.slice(0, -1);
  }
  return word;
}

export function capitalize(word: string) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function convertTimestamp(timestamp: number) {
  // Convert the timestamp to milliseconds by multiplying by 1000
  const date = new Date(timestamp * 1000);

  // Array of month names
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Format the date
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()]; // Months are zero-based
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = ("0" + date.getMinutes()).slice(-2);
  const seconds = ("0" + date.getSeconds()).slice(-2);

  // Format hours in 12-hour format and set am/pm
  let period = "am";
  if (hours >= 12) {
    period = "pm";
  }
  let hour12 = hours % 12;
  if (hour12 === 0) {
    hour12 = 12;
  }

  return `${month} ${day}, ${hour12}:${minutes}${period}`;
  // return `${month} ${day} ${year}, ${hour12}:${minutes}:${seconds}${period}`; // includes year & seconds
}