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
  alternateLanguages?: Array<{ lang: string; url: string }>;
}

export const SEO = ({ 
  title, 
  description, 
  keywords,
  ogImage = 'https://brothersgym-kazanlak.bg/og-image.jpg',
  canonicalUrl,
  structuredData,
  articlePublishedTime,
  articleModifiedTime,
  articleAuthor,
  ogType = 'website',
  noindex = false,
  alternateLanguages
}: SEOProps) => {
  const siteUrl = 'https://brothersgym-kazanlak.bg';
  const fullTitle = `${title} | Brothers Gym Казанлък`;
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={canonical} />
      
      {/* Robots Meta */}
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      )}
      
      {/* Geo Targeting */}
      <meta name="geo.region" content="BG-26" />
      <meta name="geo.placename" content="Казанлък" />
      <meta name="geo.position" content="42.6167;25.4000" />
      <meta name="ICBM" content="42.6167, 25.4000" />
      
      {/* Language & Alternate URLs */}
      <meta httpEquiv="content-language" content="bg" />
      {alternateLanguages && alternateLanguages.map((alt) => (
        <link key={alt.lang} rel="alternate" hrefLang={alt.lang} href={`${siteUrl}${alt.url}`} />
      ))}

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
      <meta property="og:locale:alternate" content="en_US" />
      
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
