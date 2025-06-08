import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useFrameworkReady } from '@/hooks/useFrameworkReady';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { SplashScreen } from 'expo-router';
import { Platform } from 'react-native';
import Head from 'expo-router/head';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useFrameworkReady();

  const [fontsLoaded, fontError] = useFonts({
    'Poppins-Regular': Poppins_400Regular,
    'Poppins-SemiBold': Poppins_600SemiBold,
    'Poppins-Bold': Poppins_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {Platform.OS === 'web' && (
        <Head>
          {/* Primary Meta Tags */}
          <title>Sanafi - AI-Driven Ethical Onchain Banking | Digital Wallet & Cryptocurrency Platform</title>
          <meta name="title" content="Sanafi - AI-Driven Ethical Onchain Banking | Digital Wallet & Cryptocurrency Platform" />
          <meta name="description" content="Experience the future of banking with Sanafi - the world's first AI-driven ethical onchain banking platform. Secure digital payments, multi-currency support, UAE Central Bank compliant, and intelligent financial management." />
          <meta name="keywords" content="digital wallet, cryptocurrency, blockchain, UAE banking, fintech, AI banking, ethical finance, onchain banking, digital payments, multi-currency, AED Sanafi, USDC, USDT, Solana, DeFi, Web3, financial technology, secure payments, biometric authentication, KYC verification, Central Bank Digital Currency, CBDC" />
          <meta name="author" content="Sanafi Technologies" />
          <meta name="robots" content="index, follow" />
          <meta name="language" content="English" />
          <meta name="revisit-after" content="7 days" />
          
          {/* Geo Tags */}
          <meta name="geo.region" content="AE" />
          <meta name="geo.country" content="United Arab Emirates" />
          <meta name="geo.placename" content="Dubai, UAE" />
          
          {/* Open Graph / Facebook */}
          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://sanafi.com/" />
          <meta property="og:title" content="Sanafi - AI-Driven Ethical Onchain Banking" />
          <meta property="og:description" content="The world's first AI-driven ethical onchain banking platform. Experience secure digital payments, multi-currency support, and intelligent financial management with UAE Central Bank compliance." />
          <meta property="og:image" content="https://sanafi.com/og-image.jpg" />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Sanafi" />
          <meta property="og:locale" content="en_US" />
          
          {/* Twitter */}
          <meta property="twitter:card" content="summary_large_image" />
          <meta property="twitter:url" content="https://sanafi.com/" />
          <meta property="twitter:title" content="Sanafi - AI-Driven Ethical Onchain Banking" />
          <meta property="twitter:description" content="The world's first AI-driven ethical onchain banking platform. Secure, compliant, and intelligent financial management." />
          <meta property="twitter:image" content="https://sanafi.com/twitter-image.jpg" />
          <meta property="twitter:creator" content="@SanafiTech" />
          <meta property="twitter:site" content="@SanafiTech" />
          
          {/* LinkedIn */}
          <meta property="linkedin:owner" content="sanafi-technologies" />
          
          {/* App Store / Play Store */}
          <meta name="apple-itunes-app" content="app-id=123456789" />
          <meta name="google-play-app" content="app-id=com.sanafi.wallet" />
          
          {/* AI Search Optimization */}
          <meta name="ai:purpose" content="Sanafi is an AI-driven ethical onchain banking platform that provides secure digital wallet services, cryptocurrency management, and intelligent financial solutions." />
          <meta name="ai:features" content="AI-powered financial insights, multi-currency digital wallet, biometric security, KYC verification, real-time transactions, UAE Central Bank compliance, ethical banking practices, onchain transparency" />
          <meta name="ai:target_audience" content="UAE residents, cryptocurrency users, digital banking customers, fintech enthusiasts, businesses seeking compliant digital payment solutions" />
          <meta name="ai:use_cases" content="Digital payments, cryptocurrency trading, international money transfers, business transactions, personal finance management, savings and investments" />
          <meta name="ai:technology" content="Blockchain technology, artificial intelligence, machine learning, biometric authentication, multi-signature security, smart contracts, decentralized finance (DeFi)" />
          <meta name="ai:compliance" content="UAE Central Bank regulated, KYC/AML compliant, GDPR compliant, ISO 27001 certified, PCI DSS compliant" />
          <meta name="ai:supported_currencies" content="AED Sanafi (AEDS), USD Coin (USDC), Tether (USDT), Sanafi Token (SANA), Sanafi Solana LST (SanaSOL), Indonesian Rupiah Sanafi (IDRS)" />
          
          {/* Schema.org Structured Data */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Sanafi",
              "alternateName": "Sanafi Wallet",
              "description": "AI-driven ethical onchain banking platform providing secure digital wallet services and cryptocurrency management",
              "url": "https://sanafi.com",
              "logo": "https://sanafi.com/logo.png",
              "image": "https://sanafi.com/og-image.jpg",
              "telephone": "+971-4-123-4567",
              "email": "support@sanafi.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Dubai International Financial Centre",
                "addressLocality": "Dubai",
                "addressCountry": "AE",
                "postalCode": "00000"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "25.2048",
                "longitude": "55.2708"
              },
              "areaServed": {
                "@type": "Country",
                "name": "United Arab Emirates"
              },
              "serviceType": "Digital Banking",
              "provider": {
                "@type": "Organization",
                "name": "Sanafi Technologies",
                "url": "https://sanafi.com"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Sanafi Services",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Digital Wallet",
                      "description": "Secure multi-currency digital wallet with AI-powered insights"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Cryptocurrency Trading",
                      "description": "Trade and manage various cryptocurrencies with real-time market data"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "International Transfers",
                      "description": "Fast and secure international money transfers with competitive rates"
                    }
                  }
                ]
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "2547",
                "bestRating": "5",
                "worstRating": "1"
              },
              "review": [
                {
                  "@type": "Review",
                  "reviewRating": {
                    "@type": "Rating",
                    "ratingValue": "5",
                    "bestRating": "5"
                  },
                  "author": {
                    "@type": "Person",
                    "name": "Ahmed Al-Rashid"
                  },
                  "reviewBody": "Sanafi has revolutionized my banking experience. The AI insights help me make better financial decisions."
                }
              ],
              "sameAs": [
                "https://twitter.com/SanafiTech",
                "https://linkedin.com/company/sanafi-technologies",
                "https://facebook.com/SanafiTech",
                "https://instagram.com/sanafi_official"
              ]
            })}
          </script>
          
          {/* Mobile App Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MobileApplication",
              "name": "Sanafi Wallet",
              "operatingSystem": "iOS, Android, Web",
              "applicationCategory": "FinanceApplication",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "ratingCount": "2547"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "downloadUrl": [
                "https://apps.apple.com/app/sanafi-wallet/id123456789",
                "https://play.google.com/store/apps/details?id=com.sanafi.wallet"
              ]
            })}
          </script>
          
          {/* Cryptocurrency Schema */}
          <script type="application/ld+json">
            {JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Product",
              "name": "AED Sanafi (AEDS)",
              "description": "Digital representation of UAE Dirham on the blockchain, fully backed and regulated",
              "category": "Cryptocurrency",
              "brand": {
                "@type": "Brand",
                "name": "Sanafi"
              },
              "offers": {
                "@type": "Offer",
                "availability": "https://schema.org/InStock",
                "price": "3.67",
                "priceCurrency": "AED"
              }
            })}
          </script>
          
          {/* Canonical URL */}
          <link rel="canonical" href="https://sanafi.com/" />
          
          {/* Alternate Languages */}
          <link rel="alternate" hrefLang="en" href="https://sanafi.com/" />
          <link rel="alternate" hrefLang="ar" href="https://sanafi.com/ar/" />
          
          {/* Preconnect to external domains */}
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://images.pexels.com" />
          
          {/* DNS Prefetch */}
          <link rel="dns-prefetch" href="//api.sanafi.com" />
          <link rel="dns-prefetch" href="//cdn.sanafi.com" />
          
          {/* Theme Color */}
          <meta name="theme-color" content="#1B4D3E" />
          <meta name="msapplication-TileColor" content="#1B4D3E" />
          
          {/* Apple Touch Icon */}
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          
          {/* Manifest */}
          <link rel="manifest" href="/manifest.json" />
          
          {/* Security Headers */}
          <meta httpEquiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' data:; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' https://fonts.gstatic.com;" />
          <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
          <meta httpEquiv="X-Frame-Options" content="DENY" />
          <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
          
          {/* Viewport */}
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
        </Head>
      )}
      
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        <Stack.Screen name="kyc" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="tokens/[symbol]" options={{ headerShown: false }} />
        <Stack.Screen name="card" options={{ headerShown: false }} />
        <Stack.Screen name="rewards" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}