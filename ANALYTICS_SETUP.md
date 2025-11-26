# Analytics Setup Guide for Brothers Gym Website

## Google Analytics 4 Setup

To add Google Analytics tracking to your website and fix the "Analytics not detected" SEO issue:

### Step 1: Create Google Analytics Account
1. Go to https://analytics.google.com/
2. Sign in with your Google account
3. Click "Start measuring" and create a new property for Brothers Gym

### Step 2: Get Your Measurement ID
1. After creating the property, you'll receive a Measurement ID (format: G-XXXXXXXXXX)
2. Copy this ID

### Step 3: Add Analytics to Your Website

Add the following code to `index.html` in the `<head>` section, right after the existing meta tags:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

Replace `G-XXXXXXXXXX` with your actual Measurement ID.

### Step 4: Verify Installation
1. Visit your website
2. Go to Google Analytics > Reports > Realtime
3. You should see your visit showing up in real-time

## What You'll Track

Once installed, Google Analytics will automatically track:
- **Pageviews** - Which pages visitors view
- **Sessions** - How long visitors stay on your site
- **User demographics** - Age, gender, location (where allowed)
- **Traffic sources** - Where visitors come from (Google, Facebook, direct, etc.)
- **Device info** - Desktop vs mobile vs tablet
- **User engagement** - Which pages keep visitors longest
- **Conversion events** - Contact form submissions, phone clicks, etc.

## Enhanced Tracking (Optional)

For better insights, you can also track:

### Track Phone Clicks
```javascript
<a href="tel:+359896780067" 
   onclick="gtag('event', 'phone_click', {'phone_number': '+359896780067'})">
  089 678 0067
</a>
```

### Track Button Clicks
```javascript
<Button 
  onClick={() => gtag('event', 'booking_click', {'button_location': 'hero'})}
>
  ЗАПИШИ ТРЕНИРОВКА
</Button>
```

### Track Outbound Links (Social Media)
```javascript
<a href="https://www.facebook.com/..." 
   onclick="gtag('event', 'social_click', {'platform': 'facebook'})"
   target="_blank">
  Facebook
</a>
```

## Privacy Compliance

Make sure to:
1. Add a Privacy Policy page explaining cookie usage
2. Update your website to include a cookie consent banner (if required by GDPR/local law)
3. Configure Google Analytics to anonymize IP addresses (recommended for EU visitors)

## Alternative: Google Tag Manager

For more advanced tracking without editing code repeatedly:
1. Create a Google Tag Manager account at https://tagmanager.google.com/
2. Add the GTM snippet to your website
3. Configure all tracking (Analytics, Facebook Pixel, etc.) through the GTM dashboard

## Facebook Pixel (Optional)

To track Facebook ad performance:
1. Go to Facebook Events Manager
2. Create a Pixel
3. Add the Pixel code to `index.html` similar to Google Analytics
4. This will help track conversions from Facebook ads

## Monitoring Results

Check your analytics weekly to:
- See which pages get the most traffic
- Understand where visitors come from
- Identify which content works best
- Track conversions (contact form submissions, phone calls)
- Measure the impact of social media posts
- Optimize your marketing efforts

## Need Help?

If you need assistance setting this up:
- Contact the website developer (see Developer page)
- Hire a digital marketing consultant
- Follow Google's official Analytics setup guide: https://support.google.com/analytics/