import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { TrendingUp, TrendingDown } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Token } from '@/data/mockData';

interface TokenBalanceCardProps {
  token: Token;
  isVisible: boolean;
}

export function TokenBalanceCard({ token, isVisible }: TokenBalanceCardProps) {
  const router = useRouter();
  const totalValue = token.balance * token.price;
  const isPositive = token.change24h >= 0;

  const handlePress = () => {
    router.push(`/tokens/${token.symbol}`);
  };

  const renderIcon = () => {
    if (token.icon.startsWith('http')) {
      return (
        <Image 
          source={{ uri: token.icon }} 
          style={styles.iconImage}
          resizeMode="cover"
        />
      );
    }
    return <Text style={styles.icon}>{token.icon}</Text>;
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      <View style={styles.header}>
        <View style={styles.tokenInfo}>
          <View style={styles.iconContainer}>
            {renderIcon()}
          </View>
          <View style={styles.nameContainer}>
            <Text style={styles.name}>{token.name}</Text>
            <Text style={styles.symbol}>{token.symbol}</Text>
          </View>
        </View>
        <View style={styles.changeContainer}>
          {isPositive ? (
            <TrendingUp size={16} color="#22C55E" strokeWidth={2} />
          ) : (
            <TrendingDown size={16} color="#EF4444" strokeWidth={2} />
          )}
          <Text style={[styles.change, { color: isPositive ? '#22C55E' : '#EF4444' }]}>
            {isPositive ? '+' : ''}{token.change24h.toFixed(2)}%
          </Text>
        </View>
      </View>
      
      <View style={styles.balanceContainer}>
        <Text style={styles.balance}>
          {isVisible ? `${token.balance.toFixed(2)} ${token.symbol}` : '••••••'}
        </Text>
        <Text style={styles.value}>
          {isVisible 
            ? `${totalValue.toLocaleString('en-AE', { style: 'currency', currency: 'AED' })}`
            : '••••••'
          }
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
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
    marginBottom: 12,
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    fontSize: 24,
  },
  iconImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  nameContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  symbol: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  change: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },
  balanceContainer: {
    alignItems: 'flex-end',
  },
  balance: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
});