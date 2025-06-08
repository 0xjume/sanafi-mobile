import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { PriceData } from '@/data/mockData';

interface PriceCardProps {
  priceData: PriceData;
}

export function PriceCard({ priceData }: PriceCardProps) {
  const router = useRouter();
  const isPositive = priceData.change24h >= 0;

  const handlePress = () => {
    router.push(`/tokens/${priceData.symbol}`);
  };

  const renderIcon = () => {
    if (priceData.icon.startsWith('http')) {
      return (
        <Image 
          source={{ uri: priceData.icon }} 
          style={styles.iconImage}
          resizeMode="cover"
        />
      );
    }
    return <Text style={styles.icon}>{priceData.icon}</Text>;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.tokenInfo}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.symbol}>{priceData.symbol}</Text>
            <Text style={styles.name}>{priceData.name}</Text>
          </View>
        </View>
        
        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            AED {priceData.price.toFixed(priceData.symbol === 'AEDS' ? 2 : 3)}
          </Text>
          <View style={styles.changeContainer}>
            {isPositive ? (
              <TrendingUp size={12} color="#22C55E" strokeWidth={2} />
            ) : (
              <TrendingDown size={12} color="#EF4444" strokeWidth={2} />
            )}
            <Text style={[styles.change, { color: isPositive ? '#22C55E' : '#EF4444' }]}>
              {isPositive ? '+' : ''}{priceData.change24h.toFixed(2)}%
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  nameContainer: {
    flex: 1,
  },
  symbol: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  name: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  priceContainer: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontSize: 12,
    fontFamily: 'Poppins-SemiBold',
  },
});