import { useEffect } from 'react';
import { useRouter, useRootNavigationState } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/hooks/useAuth';

export default function IndexScreen() {
  const router = useRouter();
  const rootNavigationState = useRootNavigationState();
  const { isAuthenticated, hasCompletedOnboarding, hasCompletedKYC } = useAuth();

  useEffect(() => {
    // Wait for the root navigation to be ready before attempting navigation
    if (!rootNavigationState?.key) return;

    // Add a small delay to ensure state is properly loaded
    const checkAuthState = async () => {
      // Small delay to ensure localStorage has been read
      await new Promise(resolve => setTimeout(resolve, 100));
      
      console.log('Auth state:', { isAuthenticated, hasCompletedOnboarding, hasCompletedKYC });
      
      if (!isAuthenticated) {
        router.replace('/auth');
      } else if (!hasCompletedOnboarding) {
        router.replace('/onboarding');
      } else if (!hasCompletedKYC) {
        router.replace('/kyc');
      } else {
        router.replace('/(tabs)');
      }
    };

    checkAuthState();
  }, [isAuthenticated, hasCompletedOnboarding, hasCompletedKYC, rootNavigationState?.key, router]);

  return <View style={styles.container} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
});