import React from 'react';
import Head from 'expo-router/head';
import { Platform } from 'react-native';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  noIndex?: boolean;
}

export function SEOHead({
  title = "Sanafi - AI-Driven Ethical Onchain Banking",
  description = "The world's first AI-driven ethical onchain banking platform. Experience secure digital payments, multi-currency support, and intelligent financial management with UAE Central Bank compliance.",
  keywords = "digital wallet, cryptocurrency, blockchain, UAE banking, fintech, AI banking, ethical finance, onchain banking, digital payments, multi-currency",
  image = "https://sanafi.com/og-image.jpg",
  url = "https://sanafi.com/",
  type = "website",
  noIndex = false,
}: SEOHeadProps) {
  if (Platform.OS !== 'web') {
    return null;
  }

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {noIndex && <meta name="robots" content="noindex, nofollow" />}
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      
      {/* Canonical */}
      <link rel="canonical" href={url} />
    </Head>
  );
}