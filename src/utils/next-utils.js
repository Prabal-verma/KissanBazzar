import { absoluteUrl } from 'next/dist/shared/absolute-url';

export function getNextAbsoluteUrl(relativeUrl) {
  return absoluteUrl(relativeUrl, process.env.NEXTAUTH_URL || 'http://localhost:3000');
}