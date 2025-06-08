import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { User, Shield, FileText, Globe, Bell, Palette, CircleHelp as HelpCircle, LogOut, ChevronRight, CircleCheck as CheckCircle } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { SettingsCard } from '@/components/SettingsCard';
import { ProfileCard } from '@/components/ProfileCard';
import { useAuth } from '@/hooks/useAuth';

export default function SettingsScreen() {
  const router = useRouter();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace('/auth');
  };

  const settingsGroups = [
    {
      title: 'Account',
      items: [
        {
          icon: <User size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Personal Information',
          subtitle: 'Update your profile details',
          onPress: () => {},
        },
        {
          icon: <CheckCircle size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'KYC Verification',
          subtitle: 'Verified • Emirates ID',
          onPress: () => {},
          verified: true,
        },
      ],
    },
    {
      title: 'Security',
      items: [
        {
          icon: <Shield size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Security Settings',
          subtitle: 'Biometric, PIN, 2FA',
          onPress: () => {},
        },
        {
          icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Multi-Signature',
          subtitle: 'Manage wallet approvers',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Preferences',
      items: [
        {
          icon: <Bell size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Notifications',
          subtitle: 'Manage alert preferences',
          onPress: () => {},
        },
        {
          icon: <Globe size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Language & Region',
          subtitle: 'English (UAE)',
          onPress: () => {},
        },
        {
          icon: <Palette size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Appearance',
          subtitle: 'Light mode',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Support',
      items: [
        {
          icon: <HelpCircle size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Help & Support',
          subtitle: 'Get help and contact us',
          onPress: () => {},
        },
        {
          icon: <FileText size={20} color="#1B4D3E" strokeWidth={2} />,
          title: 'Legal & Privacy',
          subtitle: 'Terms, privacy policy',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Settings</Text>
        </View>

        {/* Profile Card */}
        <ProfileCard />

        {/* Settings Groups */}
        {settingsGroups.map((group, groupIndex) => (
          <View key={groupIndex} style={styles.group}>
            <Text style={styles.groupTitle}>{group.title}</Text>
            <View style={styles.groupContainer}>
              {group.items.map((item, itemIndex) => (
                <SettingsCard
                  key={itemIndex}
                  icon={item.icon}
                  title={item.title}
                  subtitle={item.subtitle}
                  onPress={item.onPress}
                  verified={item.verified}
                  isLast={itemIndex === group.items.length - 1}
                />
              ))}
            </View>
          </View>
        ))}

        {/* Logout Button */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <LogOut size={20} color="#DC2626" strokeWidth={2} />
          <Text style={styles.logoutText}>Sign Out</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <View style={styles.versionContainer}>
          <Text style={styles.versionText}>Sanafi Wallet v1.0.0</Text>
          <Text style={styles.versionSubtext}>Built for UAE Central Bank compliance</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  group: {
    marginBottom: 24,
  },
  groupTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  groupContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 24,
    gap: 12,
    borderWidth: 1,
    borderColor: '#DC2626',
  },
  logoutText: {
    color: '#DC2626',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  versionContainer: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  versionText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  versionSubtext: {
    fontSize: 11,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
});