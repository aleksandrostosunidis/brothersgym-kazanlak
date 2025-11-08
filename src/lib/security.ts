import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  });
};

/**
 * Validate and sanitize text input
 */
export const validateTextInput = (input: string, maxLength: number = 1000): string => {
  if (!input || typeof input !== 'string') {
    return '';
  }
  
  const trimmed = input.trim();
  const sanitized = sanitizeInput(trimmed);
  
  return sanitized.slice(0, maxLength);
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate name (letters, spaces, hyphens only)
 */
export const isValidName = (name: string): boolean => {
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']{2,100}$/;
  return nameRegex.test(name);
};

/**
 * Rate limiting helper - checks if action is allowed based on timestamp
 */
export const isRateLimited = (
  lastAction: number | null,
  cooldownMs: number
): boolean => {
  if (!lastAction) return false;
  return Date.now() - lastAction < cooldownMs;
};

/**
 * Secure string comparison to prevent timing attacks
 */
export const secureCompare = (a: string, b: string): boolean => {
  if (a.length !== b.length) return false;
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
};

/**
 * Generate a random token
 */
export const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export const sanitizeUrl = (url: string): string => {
  const sanitized = url.trim().toLowerCase();
  
  if (sanitized.startsWith('javascript:') || 
      sanitized.startsWith('data:') ||
      sanitized.startsWith('vbscript:')) {
    return '';
  }
  
  try {
    const parsed = new URL(url);
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return '';
    }
    return url;
  } catch {
    return '';
  }
};
