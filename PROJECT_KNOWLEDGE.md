# Brothers Gym Kazanlak - Project Knowledge Base

**Generated at T=0 (Project Baseline)**  
**Domain:** brothersgym-kazanlak.bg  
**Last Updated:** 2025-11-24

---

## 1. Project Overview

### Purpose
Professional website for Brothers Gym in Kazanlak, Bulgaria - a martial arts and fitness facility specializing in MMA, boxing, kickboxing, wrestling, grappling, and comprehensive fitness training.

### Target Audience
- Local community in Kazanlak, Bulgaria
- Martial arts enthusiasts (all age groups)
- Fitness seekers
- Rehabilitation clients
- Potential gym members

### Business Goals
- Showcase gym facilities and services
- Display coaching credentials and team expertise
- Enable customer reviews and testimonials
- Provide contact information and location
- Build brand presence online
- Support SEO for local discovery

---

## 2. Technical Architecture

### Frontend Stack
- **Framework:** React 18.3.1 with TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS with custom design system
- **UI Components:** shadcn/ui + Radix UI primitives
- **Routing:** React Router DOM v6
- **State Management:** TanStack Query (React Query)
- **Icons:** Lucide React
- **Animations:** tailwindcss-animate

### Backend Stack
- **Platform:** Lovable Cloud (Supabase-powered)
- **Database:** PostgreSQL via Supabase
- **Edge Functions:** Supabase Edge Functions (Deno runtime)
- **Authentication:** Supabase Auth (configured for future use)
- **Storage:** Supabase Storage (configured for future use)

### Infrastructure
- **Hosting:** Lovable/Netlify
- **Domain:** brothersgym-kazanlak.bg (via SuperHosting Bulgaria)
- **DNS:** Netlify nameservers
- **SSL:** Automatic via Netlify

---

## 3. Design System

### Color Palette (Dark Theme)
```css
/* Primary Colors */
--background: 0 0% 7%           /* Deep black background */
--foreground: 0 0% 98%          /* White text */
--primary: 0 72% 51%            /* Red accent */
--primary-foreground: 0 0% 98% /* White on red */

/* Secondary Colors */
--secondary: 0 0% 15%           /* Dark gray surfaces */
--secondary-foreground: 0 0% 98%

/* Accent & Muted */
--accent: 0 0% 15%
--muted: 0 0% 20%
--muted-foreground: 0 0% 65%

/* Borders & Inputs */
--border: 0 0% 20%
--input: 0 0% 20%
--ring: 0 72% 51%               /* Red focus rings */
```

### Typography
- **Font Family:** System UI stack (sans-serif)
- **Headings:** Bold with letter-spacing for readability
- **Body:** Regular weight with optimized line-height
- **Special Effects:** Text shadows, glows, and black outlines for visibility on dark backgrounds

### Design Principles
1. **High Contrast:** White text with black outlines for maximum visibility
2. **Minimal Red:** Red used sparingly as accent only (excessive red reduces readability)
3. **Letter Spacing:** Added to all titles to prevent letters appearing too close
4. **Responsive:** Mobile-first approach with breakpoints for tablet/desktop
5. **Dark Theme:** Primary aesthetic with black backgrounds

---

## 4. Page Structure

### Navigation Pages
1. **Home (/)** - Hero section, gym overview, key features
2. **About (/about)** - Gym history, mission, facilities
3. **Team (/team)** - Coach biographies and credentials
4. **Services (/services)** - Pricing, schedules, training programs
5. **Events (/events)** - Gym events, competitions, achievements
6. **Gallery (/gallery)** - Photo gallery of gym facilities and training
7. **Reviews (/reviews)** - Customer reviews with rating system
8. **Partners (/partners)** - Gym partnerships and sponsors
9. **Bar (/bar)** - Supplement bar menu and pricing
10. **Shop (/shop)** - Merchandise and equipment (planned)
11. **Wall of Fame (/wall-of-fame)** - Notable achievements and champions
12. **Contact (/contact)** - Contact form, location, hours
13. **Developer (/developer)** - Website creator credits and biography

### Error Pages
- **404 Not Found** - Custom branded error page with navigation

---

## 5. Core Features

### 5.1 Multilingual Support
- **Languages:** Bulgarian (default), English
- **Implementation:** React Context (`LanguageContext`)
- **Switcher:** Toggle button in navigation
- **Coverage:** All pages, UI components, and content
- **Translation Keys:** Organized by page/section

### 5.2 Reviews System
**Functionality:**
- Star rating (1-5 stars)
- Name input (required)
- Comment textarea (required)
- Selectable tags (badges)
- Timestamp display
- Real-time submission

**Backend Architecture:**
```sql
-- Table: reviews
Columns:
- id (UUID, primary key)
- name (TEXT, not null)
- rating (INTEGER, 1-5)
- comment (TEXT, not null)
- tags (TEXT[], nullable)
- ip_address (TEXT, not null)
- created_at (TIMESTAMP)

-- View: public_reviews (security_definer)
Exposes: id, name, rating, comment, tags, created_at
Hidden: ip_address (GDPR compliance)
```

**Security Features:**
- Rate limiting: 1 review per IP per 7 days
- Server-side IP detection via Edge Function
- Input sanitization with DOMPurify
- XSS protection
- RLS policies preventing direct table access
- Public view for read-only access

**Edge Function:** `submit-review`
- Validates input data
- Detects client IP from request headers
- Checks rate limiting (7-day window)
- Inserts review into database
- Returns success/error responses

### 5.3 Security Implementation

**Frontend Security:**
- Content Security Policy (CSP) via `_headers`
- Security headers:
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - X-XSS-Protection: 1; mode=block
  - Referrer-Policy: strict-origin-when-cross-origin
  - Permissions-Policy: camera=(), microphone=(), geolocation=()
  - Strict-Transport-Security (HSTS)
- Input sanitization library: `isomorphic-dompurify`
- URL sanitization utilities (`lib/security.ts`)
- Eval disabled in production (`main.tsx`)
- CSP violation reporting

**Backend Security:**
- Row Level Security (RLS) on all tables
- Server-side rate limiting
- IP-based access control
- Secure Edge Functions
- Environment variable protection

**Security Utilities:** `src/lib/security.ts`
```typescript
- sanitizeInput() // HTML/XSS sanitization
- validateEmail() // Email format validation
- sanitizeUrl() // URL validation & sanitization
- validatePhoneNumber() // Bulgarian phone validation
- rateLimit() // Client-side rate limiting helper
```

### 5.4 Responsive Design
- **Breakpoints:** Mobile-first (sm, md, lg, xl, 2xl)
- **Images:** Lazy loading, responsive sizing, WebP support
- **Navigation:** Mobile hamburger menu, desktop horizontal
- **Typography:** Fluid sizing based on viewport
- **Touch Targets:** Minimum 44x44px for mobile
- **PWA Features:** Meta tags, viewport configuration

### 5.5 SEO Optimization

**On-Page SEO:**
- Semantic HTML5 structure
- Single H1 per page with keywords
- Meta descriptions (max 160 chars)
- Title tags (max 60 chars, keyword-optimized)
- Alt text on all images
- Canonical tags
- Open Graph tags
- Twitter Card tags

**Technical SEO:**
- `robots.txt` with sitemap reference
- XML sitemap (`sitemap.xml`) with 13 pages
- Hreflang tags for Bulgarian/English
- Clean URL structure
- Mobile-friendly viewport
- Fast loading times

**Sitemap Structure:**
```xml
All pages with:
- <loc> URL
- <lastmod> timestamp
- <changefreq> monthly
- <priority> 0.8-1.0
- <xhtml:link> hreflang alternates (bg/en)
```

---

## 6. Content Details

### 6.1 Team Coaches

**Дориан Аниев Дерминджиев (Дори)**
- 22+ years training experience
- 8+ years professional coaching
- Vice-European MMA champion
- Balkan champion
- 8-time Bulgarian champion
- Master of Sport in MMA (2015)
- Honored MMA Coach (2021)
- Quote: "Когато дисциплината стане твой навик, успехът е само въпрос на време."
- Photo: `coach-dorian.jpg`

**Тенчо Караенев**
- Age: 31 years
- 23 years in sports
- National Military University graduate (2017)
- 2-time World Vice-Champion
- 2-time European bronze medalist
- Master of Sport in MMA (2015)
- Honored MMA Coach (2021)
- 2015 Athlete of the Year
- Photo: `coach-tencho.jpg`

**Йордан Кукушев**
- Age: 51 years
- 40 years in sports
- 20 years coaching experience
- Multi-discipline expertise: wrestling, judo, boxing, thai boxing
- Quote: "Старай се да бъдеш винаги най - доброто проявление на себе си!"
- Mission: Restore good feeling for life through training
- Photo: `coach-yordan-new.jpg`

### 6.2 Contact Information
- **Address:** ул Искра 12 (до Club Noar), Казанлък, България
- **Phone 1:** 089 678 0067 (Дориан)
- **Phone 2:** 089 445 0256 (Тенчо)
- **Facebook:** https://www.facebook.com/p/Brothers-GYM-100063529961850/?locale=bg_BG
- **Instagram:** https://www.instagram.com/brothers_gym_kazanlak/
- **TikTok:** https://www.tiktok.com/@brothersgymkz

### 6.3 Services & Pricing

**Training Programs:**
- MMA (Mixed Martial Arts)
- Boxing
- Kickboxing
- Wrestling and Grappling
- CrossFit
- Strength Training
- Conditioning
- Youth programs (separate pricing)

**VIP Training Sessions:**
- One-on-one coaching
- Sport-specific conditioning
- Recovery after surgery
- Injury rehabilitation (musculoskeletal)
- NFC (Neuro-Physical Complex) for spine health
- Recommended for back, neck, spine issues

**Terminology:**
- Age group: "Юноши" (Teens)
- Combined label: "Юнощи/Възрастни" (Teens/Adults)

### 6.4 Bar Menu
**Important:** Protein containers called "Протеинови кутии" (not "буркани")
- Protein shakes
- Energy drinks
- Supplements
- Healthy snacks
- Pre/post-workout nutrition

---

## 7. Asset Management

### Image Assets (`src/assets/`)
**Logos:**
- `brothers-gym-logo.jpg` - Main logo (two hands design)

**Coaches:**
- `coach-dorian.jpg` - Дориан with medal
- `coach-tencho.jpg` - Тенчо with Bulgarian flag and judge
- `coach-yordan-new.jpg` - Йордан head photo

**Facility:**
- `fitness-area.jpg`
- `fitness-gym.jpg`
- `hero-gym.jpg`
- `hero-banner.png`
- `training-session.jpg`

**Gallery:** (22 images)
- `gallery-1.png` through `gallery-22.jpg`

**Events:**
- `christmas-event.jpg`
- `team-parade.jpg`

**Team:**
- `about-team.jpg`
- `mma-athlete.jpg`

**Partners:**
- `partner-damascena.jpg`
- `partner-sdn.png`
- `partner-sesame.jpg`

**Developer:**
- `developer-alex.png`

### Logo Implementation Rules
- Position: Top-left corner of navigation
- Style: Softened edges synced with background
- Click behavior: Returns to homepage
- Adjacent title: White with glow effect (not red)
- No sharp edges or white background

---

## 8. Database Schema

### Reviews Table
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

-- RLS Policies
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Block direct public access
CREATE POLICY "Block direct access"
  ON public.reviews
  FOR ALL
  USING (false);
```

### Public Reviews View
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

-- Allow public read access to view
CREATE POLICY "Public can read reviews view"
  ON public.public_reviews
  FOR SELECT
  USING (true);
```

**Rationale:** `security_definer` ensures global visibility of reviews across all users/devices while maintaining PII protection.

---

## 9. Environment Configuration

### Environment Variables (.env)
```bash
VITE_SUPABASE_URL=https://kvgzaoiyyqxdqvyqdpfx.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGc...
VITE_SUPABASE_PROJECT_ID=kvgzaoiyyqxdqvyqdpfx
```

**Important:** These are auto-managed by Lovable Cloud - never edit manually.

### Supabase Configuration
- **Project ID:** kvgzaoiyyqxdqvyqdpfx
- **Region:** Auto-assigned
- **Auth:** Configured (not yet implemented in UI)
- **Storage:** Available (not yet utilized)
- **Edge Functions:** Enabled (`submit-review`)

---

## 10. Component Architecture

### Layout Components
- `Navigation.tsx` - Main navigation with mobile/desktop views
- `Footer.tsx` - Site footer with links and contact
- `NavLink.tsx` - Active link styling utility

### UI Components (shadcn/ui)
Full set of Radix UI primitives customized to design system:
- Accordion, Alert, Avatar, Badge, Button, Card
- Checkbox, Calendar, Carousel, Chart, Dialog
- Dropdown, Form, Input, Label, Select, Sheet
- Tabs, Table, Toast, Tooltip, and more

### Context Providers
- `LanguageContext` - Manages Bulgarian/English translations
- `QueryClientProvider` - TanStack Query setup
- `TooltipProvider` - Global tooltip configuration
- `Toaster` & `Sonner` - Toast notifications

---

## 11. Routing Structure

```typescript
<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/about" element={<About />} />
  <Route path="/team" element={<Team />} />
  <Route path="/services" element={<Services />} />
  <Route path="/events" element={<Events />} />
  <Route path="/gallery" element={<Gallery />} />
  <Route path="/reviews" element={<Reviews />} />
  <Route path="/partners" element={<Partners />} />
  <Route path="/bar" element={<Bar />} />
  <Route path="/shop" element={<Shop />} />
  <Route path="/wall-of-fame" element={<WallOfFame />} />
  <Route path="/contact" element={<Contact />} />
  <Route path="/developer" element={<Developer />} />
  <Route path="*" element={<NotFound />} />
</Routes>
```

---

## 12. Key Technical Decisions

### Why Security-Definer View?
**Problem:** Using `security_invoker = true` caused reviews to be filtered by user's IP address, preventing global visibility.

**Solution:** Use `security_definer` (default) to bypass RLS policies while maintaining PII protection by only exposing non-sensitive fields.

**Trade-off:** View operates with elevated privileges but is safe because it's read-only and only exposes public data.

### Why Edge Functions for Reviews?
**Problem:** Client-side IP detection is unreliable and vulnerable to spoofing.

**Solution:** Server-side IP extraction from request headers in Edge Function ensures accurate rate limiting and security.

**Benefits:** 
- Cannot be bypassed by client
- Accurate IP logging
- Centralized validation logic
- GDPR-compliant data handling

### Why DOMPurify?
**Problem:** User-submitted reviews could contain malicious HTML/scripts.

**Solution:** `isomorphic-dompurify` sanitizes all user input before rendering and before submission.

**Implementation:** Both client-side (display) and server-side (storage) sanitization.

---

## 13. Future Enhancement Opportunities

### Planned Features
1. **Authentication System** - User accounts, login, member dashboard
2. **Booking System** - Class scheduling and reservations
3. **Shop E-commerce** - Online merchandise sales
4. **Payment Integration** - Online membership payments
5. **Mobile App** - Native iOS/Android companion
6. **Member Portal** - Personal training logs, progress tracking
7. **Live Class Updates** - Real-time schedule changes
8. **Push Notifications** - Event reminders, promotions
9. **Video Gallery** - Training videos and tutorials
10. **Blog Section** - Fitness tips, gym news, articles

### Technical Debt
- None currently identified (project is well-structured)

### Performance Optimizations
- Image CDN integration
- Code splitting for faster initial load
- Service worker for offline support
- Database query optimization as data grows

---

## 14. Development Workflow

### Local Development
```bash
npm install          # Install dependencies
npm run dev          # Start dev server
npm run build        # Production build
npm run preview      # Preview production build
```

### Deployment
- **Method:** Automatic via Lovable platform
- **Trigger:** Code changes pushed to main branch
- **Frontend:** Requires "Update" click in publish dialog
- **Backend:** Deploys immediately (Edge Functions, migrations)

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Tailwind CSS (no custom CSS files except index.css)
- Functional React components (hooks, no classes)
- Props destructuring
- Named exports for components

---

## 15. Analytics & Monitoring

### Available Metrics
- Page views (via platform)
- Review submissions
- Error tracking (console logs, CSP violations)
- Edge Function invocations

### SEO Monitoring
- Google Search Console integration (pending domain verification)
- Sitemap submission status
- Indexing status
- Search performance metrics

---

## 16. Content Management

### How to Update Content

**Text Content:**
- Edit page components in `src/pages/`
- Update translations in `LanguageContext.tsx`

**Images:**
- Add to `src/assets/`
- Import in relevant component
- Use optimized formats (WebP preferred)

**Prices/Services:**
- Update `Services.tsx` component
- Maintain consistency in Bulgarian/English

**Team Bios:**
- Edit `Team.tsx` component
- Ensure photos match names

**Gallery:**
- Add images to `src/assets/`
- Update `Gallery.tsx` imports

---

## 17. Troubleshooting Guide

### Common Issues

**Sitemap Not Accessible:**
- Check domain verification status
- Wait for DNS propagation (up to 72 hours)
- Verify domain is live before submitting to Google

**Reviews Not Showing:**
- Check RLS policies on `public_reviews` view
- Verify Edge Function is deployed
- Check browser console for errors

**IP Rate Limiting Not Working:**
- Verify Edge Function is receiving correct headers
- Check 7-day window calculation
- Test with different IP addresses

**Images Not Loading:**
- Verify file paths in `src/assets/`
- Check import statements
- Ensure images are optimized and not too large

**Translation Missing:**
- Add keys to `LanguageContext.tsx`
- Ensure both `bg` and `en` versions exist
- Check for typos in translation keys

---

## 18. Dependencies Overview

### Core Dependencies
```json
{
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.30.1",
  "@tanstack/react-query": "^5.83.0",
  "@supabase/supabase-js": "^2.80.0",
  "lucide-react": "^0.462.0",
  "isomorphic-dompurify": "^2.31.0",
  "tailwindcss": "latest",
  "typescript": "latest"
}
```

### UI Component Libraries
- `@radix-ui/*` - Accessible component primitives
- `class-variance-authority` - Component variant management
- `tailwind-merge` - Utility class merging
- `tailwindcss-animate` - Animation utilities

---

## 19. Browser Support

### Supported Browsers
- Chrome 90+ ✓
- Firefox 88+ ✓
- Safari 14+ ✓
- Edge 90+ ✓
- Opera 76+ ✓

### Mobile Browsers
- Chrome Mobile (Android) ✓
- Safari (iOS) ✓
- Samsung Internet ✓

### Fallbacks
- CSS Grid with flexbox fallback
- Modern JavaScript with polyfills via Vite
- WebP images with JPEG fallbacks

---

## 20. Legal & Compliance

### GDPR Compliance
- IP addresses not publicly exposed
- Data minimization (only collect necessary fields)
- User cannot be identified from public reviews
- No cookies used (except essential session)
- Privacy-first architecture

### Accessibility
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- High contrast text
- Touch-friendly mobile UI
- Screen reader compatible

---

## Knowledge Base Maintenance

**Last Updated:** 2025-11-24  
**Version:** 1.0.0  
**Next Review:** When major features are added

**Update Triggers:**
- New features implemented
- Architecture changes
- Content additions
- Security updates
- Performance optimizations

---

*This knowledge base serves as the T=0 reference point for the Brothers Gym Kazanlak website project. All future development should reference this document for consistency and context.*
