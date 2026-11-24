/**
 * MBY Studio — R2.21-H.11
 * Shared, side-effect-free LinkedIn profile URL validation.
 * Syntax/domain checks only; this does NOT verify profile ownership or existence.
 */

const PROFILE_PATH = /^\/in\/([A-Za-z0-9][A-Za-z0-9._-]{1,99})\/?$/;

export function normalizeLinkedInProfileUrl(input: string): string | null {
  const raw = input.trim();
  if (!raw || raw.length > 500 || /[\s\\\u0000-\u001f\u007f]/.test(raw)) return null;

  let candidate = raw;
  if (/^in\//i.test(candidate)) {
    candidate = `https://www.linkedin.com/${candidate}`;
  } else if (/^(?:www\.)?linkedin\.com(?:\/|$)/i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  let url: URL;
  try {
    url = new URL(candidate);
  } catch {
    return null;
  }

  // Prevent lookalike domains, unexpected protocols, credentials and ports.
  if (url.protocol !== "https:" ||
      !["linkedin.com", "www.linkedin.com"].includes(url.hostname.toLowerCase()) ||
      url.username || url.password || url.port || url.search || url.hash ||
      !PROFILE_PATH.test(url.pathname)) {
    return null;
  }

  const slug = url.pathname.match(PROFILE_PATH)?.[1];
  return slug ? `https://www.linkedin.com/in/${slug}` : null;
}
