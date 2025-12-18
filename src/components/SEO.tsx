import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: object | object[];
  articlePublishedTime?: string;
  articleModifiedTime?: string;
  articleAuthor?: string;
  ogType?: string;
  noindex?: boolean;
}

// Always use the production domain for canonical URLs
const SITE_URL = 'https://brothersgym-kazanlak.bg';

// Check if we're on the lovable.app domain (should not be indexed)
const isLovableDomain = typeof window !== 'undefined' && 
  window.location.hostname.includes('lovable.app');

export const SEO = ({ 
  title, 
  description, 
  keywords,
  ogImage = `${SITE_URL}/og-image.jpg`,
  canonicalUrl,
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  ogType = 'website',
  noindex = false
}: SEOProps) => {
  const fullTitle = `${title} | Brothers Gym Казанлък`;
  const canonical = canonicalUrl ? `${SITE_URL}${canonicalUrl}` : SITE_URL;
  
  // Force noindex on lovable.app domain to prevent duplicate indexing
  const shouldNoindex = noindex || isLovableDomain;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta - noindex for lovable.app, index for production */}
      {shouldNoindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      <meta name="googlebot" content={shouldNoindex ? "noindex, nofollow" : "index, follow"} />
      
      {/* Geo Targeting */}
      <meta name="geo.region" content="BG-26" />
      <meta name="geo.placename" content="Казанлък" />
      <meta name="geo.position" content="42.6167;25.4000" />
      <meta name="ICBM" content="42.6167, 25.4000" />
      
      {/* Language */}
      <meta httpEquiv="content-language" content="bg" />
      <link rel="alternate" hrefLang="bg" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="Brothers Gym Казанлък" />
      <meta property="og:locale" content="bg_BG" />
      
      {/* Article Meta Tags */}
      {articlePublishedTime && <meta property="article:published_time" content={articlePublishedTime} />}
      {articleModifiedTime && <meta property="article:modified_time" content={articleModifiedTime} />}
      {articleAuthor && <meta property="article:author" content={articleAuthor} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@brothersgymkz" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={title} />
      
      {/* Additional SEO Tags */}
      <meta name="author" content="Brothers Gym Казанлък" />
      <meta name="publisher" content="Brothers Gym Казанлък" />
      <meta name="copyright" content="Brothers Gym Казанлък" />
      <meta name="rating" content="general" />
      <meta name="distribution" content="global" />

      {/* Structured Data */}
      {structuredData && (
        Array.isArray(structuredData) ? (
          structuredData.map((data, index) => (
            <script key={index} type="application/ld+json">
              {JSON.stringify(data)}
            </script>
          ))
        ) : (
          <script type="application/ld+json">
            {JSON.stringify(structuredData)}
          </script>
        )
      )}
    </Helmet>
  );
};
