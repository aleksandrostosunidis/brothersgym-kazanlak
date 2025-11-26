// Structured Data (Schema.org JSON-LD) for SEO

export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": "SportsActivityLocation",
  "@id": "https://brothersgym-kazanlak.bg/#organization",
  "name": "Brothers Gym Казанлък",
  "alternateName": "Brothers GYM",
  "image": "https://brothersgym-kazanlak.bg/og-image.jpg",
  "url": "https://brothersgym-kazanlak.bg",
  "telephone": ["+359896780067", "+359894450256"],
  "email": "contact@brothersgym-kazanlak.bg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Искра 12",
    "addressLocality": "Казанлък",
    "postalCode": "6100",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.6167",
    "longitude": "25.4000"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "07:30",
      "closes": "21:30"
    },
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Saturday", "Sunday"],
      "opens": "09:00",
      "closes": "20:00"
    }
  ],
  "sameAs": [
    "https://www.facebook.com/profile.php?id=100063529961850",
    "https://www.instagram.com/brothers_gym_kazanlak/",
    "https://www.tiktok.com/@brothersgymkz"
  ],
  "priceRange": "50-110 BGN",
  "description": "Професионална фитнес зала и ММА център в Казанлък. Предлагаме фитнес, ММА тренировки, персонални тренировки и хранителни планове. Приемаме Мултиспорт карти."
});

export const getGymPageSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ExerciseGym",
  "@id": "https://brothersgym-kazanlak.bg/#gym",
  "name": "Brothers Gym Казанлък",
  "description": "Модерна фитнес зала с пълно оборудване за всички нива на подготовка в Казанлък",
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Фитнес зала",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "ММА тренировки",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Персонални тренировки",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Мултиспорт карти",
      "value": true
    }
  ]
});

export const getArticleSchema = (title: string, description: string, url: string) => ({
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": title,
  "description": description,
  "url": url,
  "publisher": {
    "@type": "Organization",
    "name": "Brothers Gym Казанлък",
    "logo": {
      "@type": "ImageObject",
      "url": "https://brothersgym-kazanlak.bg/logo.png"
    }
  }
});

export const getBreadcrumbSchema = (items: Array<{ name: string; url: string }>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": `https://brothersgym-kazanlak.bg${item.url}`
  }))
});
