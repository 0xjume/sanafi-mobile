import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight, CheckCircle } from 'lucide-react-native';

interface SettingsCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  verified?: boolean;
  isLast?: boolean;
}

export function SettingsCard({ icon, title, subtitle, onPress, verified, isLast }: SettingsCardProps) {
  return (
    <TouchableOpacity 
      style={[styles.container, !isLast && styles.borderBottom]} 
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        {icon}
      </View>
      
      <View style={styles.content}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
          {verified && (
            <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
          )}
        </View>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      
      <ChevronRight size={20} color="#666666" strokeWidth={2} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
});