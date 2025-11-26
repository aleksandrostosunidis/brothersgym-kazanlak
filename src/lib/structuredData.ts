// Comprehensive Structured Data (Schema.org JSON-LD) for Maximum SEO Impact

// Main Organization Schema with Enhanced Details
export const getOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://brothersgym-kazanlak.bg/#organization",
  "name": "Brothers Gym Казанлък",
  "alternateName": ["Brothers GYM", "Brothers Gym Kazanlak"],
  "url": "https://brothersgym-kazanlak.bg",
  "logo": "https://brothersgym-kazanlak.bg/logo.png",
  "image": "https://brothersgym-kazanlak.bg/og-image.jpg",
  "description": "Професионална фитнес зала и ММА център в Казанлък с над 20 години опит. Предлагаме MMA тренировки, фитнес, персонални тренировки, кикбокс, бокс, кросфит и хранителни планове.",
  "foundingDate": "2003",
  "telephone": ["+359896780067", "+359894450256"],
  "email": "contact@brothersgym-kazanlak.bg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Искра 12 (до Club Noar)",
    "addressLocality": "Казанлък",
    "addressRegion": "Стара Загора",
    "postalCode": "6100",
    "addressCountry": "BG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "42.6167",
    "longitude": "25.4000"
  },
  "areaServed": {
    "@type": "City",
    "name": "Казанлък"
  },
  "sameAs": [
    "https://www.facebook.com/p/Brothers-GYM-100063529961850/",
    "https://www.instagram.com/brothers_gym_kazanlak/",
    "https://www.tiktok.com/@brothersgymkz"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+359896780067",
    "contactType": "customer service",
    "availableLanguage": ["Bulgarian", "English"]
  }
});

// Enhanced Local Business Schema with Reviews
export const getLocalBusinessSchema = () => ({
  "@context": "https://schema.org",
  "@type": ["SportsActivityLocation", "ExerciseGym", "HealthAndBeautyBusiness"],
  "@id": "https://brothersgym-kazanlak.bg/#localbusiness",
  "name": "Brothers Gym Казанлък",
  "alternateName": "Brothers GYM",
  "image": [
    "https://brothersgym-kazanlak.bg/og-image.jpg",
    "https://brothersgym-kazanlak.bg/gallery-1.jpg",
    "https://brothersgym-kazanlak.bg/gallery-2.jpg"
  ],
  "url": "https://brothersgym-kazanlak.bg",
  "telephone": ["+359896780067", "+359894450256"],
  "email": "contact@brothersgym-kazanlak.bg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Искра 12 (до Club Noar)",
    "addressLocality": "Казанлък",
    "addressRegion": "Стара Загора",
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
  "priceRange": "50-110 BGN",
  "paymentAccepted": ["Cash", "Card", "Multisport Card"],
  "currenciesAccepted": "BGN",
  "description": "Професионална фитнес зала и ММА център в Казанлък с над 20 години опит. Предлагаме MMA тренировки, фитнес, персонални тренировки, кикбокс, бокс, кросфит и хранителни планове. Приемаме Мултиспорт карти.",
  "hasMap": "https://www.google.com/maps/search/?api=1&query=42.6167,25.4000",
  "sameAs": [
    "https://www.facebook.com/p/Brothers-GYM-100063529961850/",
    "https://www.instagram.com/brothers_gym_kazanlak/",
    "https://www.tiktok.com/@brothersgymkz"
  ],
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
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Кикбокс",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Бокс",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Кросфит",
      "value": true
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "127",
    "bestRating": "5",
    "worstRating": "1"
  }
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

// WebSite Schema with Search Action
export const getWebSiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://brothersgym-kazanlak.bg/#website",
  "url": "https://brothersgym-kazanlak.bg",
  "name": "Brothers Gym Казанлък",
  "description": "Професионална фитнес зала и ММА център в Казанлък",
  "publisher": {
    "@id": "https://brothersgym-kazanlak.bg/#organization"
  },
  "inLanguage": ["bg", "en"]
});

// Service Schema for Different Training Types
export const getServiceSchema = (serviceName: string, description: string, price: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": serviceName,
  "provider": {
    "@id": "https://brothersgym-kazanlak.bg/#organization"
  },
  "description": description,
  "areaServed": {
    "@type": "City",
    "name": "Казанлък"
  },
  "offers": {
    "@type": "Offer",
    "price": price,
    "priceCurrency": "BGN"
  }
});

// Person Schema for Coaches
export const getPersonSchema = (name: string, role: string, description: string, image?: string) => ({
  "@context": "https://schema.org",
  "@type": "Person",
  "name": name,
  "jobTitle": role,
  "description": description,
  "image": image,
  "worksFor": {
    "@id": "https://brothersgym-kazanlak.bg/#organization"
  },
  "alumniOf": "Brothers Gym Казанлък"
});

// FAQ Schema
export const getFAQSchema = (faqs: Array<{ question: string; answer: string }>) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
});

// Event Schema for Training Sessions
export const getEventSchema = (name: string, startDate: string, endDate: string, description: string) => ({
  "@context": "https://schema.org",
  "@type": "Event",
  "name": name,
  "startDate": startDate,
  "endDate": endDate,
  "description": description,
  "location": {
    "@id": "https://brothersgym-kazanlak.bg/#localbusiness"
  },
  "organizer": {
    "@id": "https://brothersgym-kazanlak.bg/#organization"
  },
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled"
});

// Review Schema
export const getReviewSchema = (reviewBody: string, rating: number, author: string, datePublished: string) => ({
  "@context": "https://schema.org",
  "@type": "Review",
  "itemReviewed": {
    "@id": "https://brothersgym-kazanlak.bg/#localbusiness"
  },
  "reviewRating": {
    "@type": "Rating",
    "ratingValue": rating,
    "bestRating": "5",
    "worstRating": "1"
  },
  "author": {
    "@type": "Person",
    "name": author
  },
  "reviewBody": reviewBody,
  "datePublished": datePublished
});
