import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, TrendingUp, TrendingDown, Send, Download, RefreshCw, Star, StarOff, Info, ChartBar as BarChart3, Clock, DollarSign, Users, Globe, Shield } from 'lucide-react-native';
import { mockTokens, mockTransactions, Token } from '@/data/mockData';

const { width } = Dimensions.get('window');

interface PricePoint {
  time: string;
  price: number;
}

interface TokenStats {
  marketCap: number;
  volume24h: number;
  circulatingSupply: number;
  totalSupply: number;
  allTimeHigh: number;
  allTimeLow: number;
  holders: number;
  website: string;
  verified: boolean;
}

export default function TokenDetailsScreen() {
  const { symbol } = useLocalSearchParams<{ symbol: string }>();
  const router = useRouter();
  const [token, setToken] = useState<Token | null>(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedTimeframe, setSelectedTimeframe] = useState('24H');
  const [priceHistory, setPriceHistory] = useState<PricePoint[]>([]);
  const [tokenStats, setTokenStats] = useState<TokenStats | null>(null);

  const timeframes = ['1H', '24H', '7D', '30D', '1Y'];

  useEffect(() => {
    const foundToken = mockTokens.find(t => t.symbol === symbol);
    if (foundToken) {
      setToken(foundToken);
      generatePriceHistory(foundToken);
      generateTokenStats(foundToken);
    }
  }, [symbol]);

  const generatePriceHistory = (token: Token) => {
    const points: PricePoint[] = [];
    const basePrice = token.price;
    const volatility = 0.05; // 5% volatility
    
    for (let i = 23; i >= 0; i--) {
      const variation = (Math.random() - 0.5) * volatility;
      const price = basePrice * (1 + variation);
      points.push({
        time: `${23 - i}:00`,
        price: price,
      });
    }
    setPriceHistory(points);
  };

  const generateTokenStats = (token: Token) => {
    setTokenStats({
      marketCap: token.balance * token.price * 1000000,
      volume24h: token.balance * token.price * 50000,
      circulatingSupply: token.balance * 1000000,
      totalSupply: token.balance * 1200000,
      allTimeHigh: token.price * 1.5,
      allTimeLow: token.price * 0.3,
      holders: Math.floor(Math.random() * 100000) + 50000,
      website: `https://${token.symbol.toLowerCase()}.com`,
      verified: true,
    });
  };

  const handleAction = (action: string) => {
    switch (action) {
      case 'send':
        router.push('/transfer');
        break;
      case 'receive':
        Alert.alert('Receive', `Generate QR code for ${token?.symbol}`);
        break;
      case 'swap':
        Alert.alert('Swap', `Exchange ${token?.symbol} for other tokens`);
        break;
      default:
        break;
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const renderTokenIcon = () => {
    if (!token) return null;
    
    if (token.icon.startsWith('http')) {
      return (
        <Image 
          source={{ uri: token.icon }} 
          style={styles.tokenIcon}
          resizeMode="cover"
        />
      );
    }
    return <Text style={styles.tokenIconEmoji}>{token.icon}</Text>;
  };

  const renderPriceChart = () => {
    if (priceHistory.length === 0) return null;

    const maxPrice = Math.max(...priceHistory.map(p => p.price));
    const minPrice = Math.min(...priceHistory.map(p => p.price));
    const priceRange = maxPrice - minPrice;

    return (
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Price Chart</Text>
          <View style={styles.timeframeSelector}>
            {timeframes.map((timeframe) => (
              <TouchableOpacity
                key={timeframe}
                style={[
                  styles.timeframeButton,
                  selectedTimeframe === timeframe && styles.activeTimeframe,
                ]}
                onPress={() => setSelectedTimeframe(timeframe)}
              >
                <Text
                  style={[
                    styles.timeframeText,
                    selectedTimeframe === timeframe && styles.activeTimeframeText,
                  ]}
                >
                  {timeframe}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.chart}>
          <View style={styles.chartArea}>
            {priceHistory.map((point, index) => {
              const height = ((point.price - minPrice) / priceRange) * 100;
              const isPositive = index === 0 || point.price >= priceHistory[index - 1].price;
              
              return (
                <View
                  key={index}
                  style={[
                    styles.chartBar,
                    {
                      height: `${Math.max(height, 2)}%`,
                      backgroundColor: isPositive ? '#22C55E' : '#EF4444',
                    },
                  ]}
                />
              );
            })}
          </View>
        </View>
      </View>
    );
  };

  const renderTokenInfo = () => {
    if (!tokenStats) return null;

    const infoItems = [
      {
        label: 'Market Cap',
        value: `AED ${tokenStats.marketCap.toLocaleString()}`,
        icon: <DollarSign size={16} color="#666666" strokeWidth={2} />,
      },
      {
        label: '24h Volume',
        value: `AED ${tokenStats.volume24h.toLocaleString()}`,
        icon: <BarChart3 size={16} color="#666666" strokeWidth={2} />,
      },
      {
        label: 'Holders',
        value: `${tokenStats.holders.toLocaleString()}`,
        icon: <Users size={16} color="#666666" strokeWidth={2} />,
      },
      {
        label: 'Circulating Supply',
        value: `${tokenStats.circulatingSupply.toLocaleString()} ${token?.symbol}`,
        icon: <RefreshCw size={16} color="#666666" strokeWidth={2} />,
      },
      {
        label: 'Total Supply',
        value: `${tokenStats.totalSupply.toLocaleString()} ${token?.symbol}`,
        icon: <Info size={16} color="#666666" strokeWidth={2} />,
      },
      {
        label: 'All Time High',
        value: `AED ${tokenStats.allTimeHigh.toFixed(3)}`,
        icon: <TrendingUp size={16} color="#22C55E" strokeWidth={2} />,
      },
      {
        label: 'All Time Low',
        value: `AED ${tokenStats.allTimeLow.toFixed(3)}`,
        icon: <TrendingDown size={16} color="#EF4444" strokeWidth={2} />,
      },
      {
        label: 'Website',
        value: tokenStats.website,
        icon: <Globe size={16} color="#666666" strokeWidth={2} />,
      },
    ];

    return (
      <View style={styles.infoSection}>
        <Text style={styles.sectionTitle}>Token Information</Text>
        <View style={styles.infoGrid}>
          {infoItems.map((item, index) => (
            <View key={index} style={styles.infoItem}>
              <View style={styles.infoHeader}>
                {item.icon}
                <Text style={styles.infoLabel}>{item.label}</Text>
              </View>
              <Text style={styles.infoValue} numberOfLines={1}>
                {item.value}
              </Text>
            </View>
          ))}
        </View>
      </View>
    );
  };

  const renderRecentTransactions = () => {
    const tokenTransactions = mockTransactions.filter(tx => tx.token === symbol);

    if (tokenTransactions.length === 0) {
      return (
        <View style={styles.transactionsSection}>
          <Text style={styles.sectionTitle}>Recent Transactions</Text>
          <View style={styles.noTransactions}>
            <Clock size={48} color="#CCCCCC" strokeWidth={1} />
            <Text style={styles.noTransactionsText}>No recent transactions</Text>
            <Text style={styles.noTransactionsSubtext}>
              Your {token?.symbol} transactions will appear here
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.transactionsSection}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {tokenTransactions.slice(0, 3).map((transaction) => (
          <View key={transaction.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              {transaction.type === 'sent' ? (
                <Send size={16} color="#EF4444" strokeWidth={2} />
              ) : transaction.type === 'received' ? (
                <Download size={16} color="#22C55E" strokeWidth={2} />
              ) : (
                <RefreshCw size={16} color="#3B82F6" strokeWidth={2} />
              )}
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.transactionTitle}>
                {transaction.type === 'sent' ? 'Sent' : 
                 transaction.type === 'received' ? 'Received' : 'Exchanged'}
              </Text>
              <Text style={styles.transactionTime}>
                {transaction.timestamp.toLocaleDateString()} • {transaction.timestamp.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}
              </Text>
            </View>
            <Text style={[
              styles.transactionAmount,
              {
                color: transaction.type === 'sent' ? '#EF4444' : 
                       transaction.type === 'received' ? '#22C55E' : '#1B4D3E'
              }
            ]}>
              {transaction.type === 'sent' ? '-' : transaction.type === 'received' ? '+' : ''}
              {transaction.amount.toFixed(2)} {transaction.token}
            </Text>
          </View>
        ))}
        
        <TouchableOpacity 
          style={styles.viewAllTransactions}
          onPress={() => router.push('/activity')}
        >
          <Text style={styles.viewAllText}>View All Transactions</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (!token) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
            <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Token Details</Text>
          <View style={styles.placeholder} />
        </View>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Token not found</Text>
          <Text style={styles.errorSubtext}>The requested token could not be found</Text>
        </View>
      </SafeAreaView>
    );
  }

  const isPositive = token.change24h >= 0;
  const totalValue = token.balance * token.price;

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
        </TouchableOpacity>
        
        <View style={styles.headerCenter}>
          <View style={styles.headerTokenInfo}>
            <View style={styles.headerIconContainer}>
              {renderTokenIcon()}
            </View>
            <View>
              <Text style={styles.headerTitle}>{token.name}</Text>
              <View style={styles.headerSubtitleRow}>
                <Text style={styles.headerSubtitle}>{token.symbol}</Text>
                {tokenStats?.verified && (
                  <Shield size={14} color="#22C55E" strokeWidth={2} />
                )}
              </View>
            </View>
          </View>
        </View>
        
        <TouchableOpacity style={styles.favoriteButton} onPress={toggleFavorite}>
          {isFavorite ? (
            <Star size={24} color="#F59E0B" strokeWidth={2} fill="#F59E0B" />
          ) : (
            <StarOff size={24} color="#666666" strokeWidth={2} />
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Price Section */}
        <View style={styles.priceSection}>
          <View style={styles.priceContainer}>
            <Text style={styles.currentPrice}>
              AED {token.price.toFixed(token.symbol === 'AEDS' || token.symbol === 'IDRS' ? 2 : 4)}
            </Text>
            <View style={styles.changeContainer}>
              {isPositive ? (
                <TrendingUp size={20} color="#22C55E" strokeWidth={2} />
              ) : (
                <TrendingDown size={20} color="#EF4444" strokeWidth={2} />
              )}
              <Text style={[styles.changeText, { color: isPositive ? '#22C55E' : '#EF4444' }]}>
                {isPositive ? '+' : ''}{token.change24h.toFixed(2)}% (24h)
              </Text>
            </View>
          </View>
          
          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Your Balance</Text>
            <Text style={styles.balanceAmount}>
              {token.balance.toLocaleString()} {token.symbol}
            </Text>
            <Text style={styles.balanceValue}>
              ≈ {totalValue.toLocaleString('en-AE', { style: 'currency', currency: 'AED' })}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleAction('send')}
          >
            <Send size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Send</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleAction('receive')}
          >
            <Download size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Receive</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={() => handleAction('swap')}
          >
            <RefreshCw size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.actionButtonText}>Swap</Text>
          </TouchableOpacity>
        </View>

        {/* Price Chart */}
        {renderPriceChart()}

        {/* Token Information */}
        {renderTokenInfo()}

        {/* Recent Transactions */}
        {renderRecentTransactions()}

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0EADA',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  errorText: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0EADA',
  },
  tokenIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  tokenIconEmoji: {
    fontSize: 24,
  },
  headerTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  headerSubtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholder: {
    width: 44,
  },
  scrollView: {
    flex: 1,
  },
  priceSection: {
    backgroundColor: '#FFFFFF',
    padding: 24,
    alignItems: 'center',
  },
  priceContainer: {
    alignItems: 'center',
    marginBottom: 24,
    gap: 8,
  },
  currentPrice: {
    fontSize: 36,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  changeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  changeText: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  balanceContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    width: '100%',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  balanceValue: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  actionsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  actionButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  chartContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chartTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  timeframeSelector: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 2,
  },
  timeframeButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  activeTimeframe: {
    backgroundColor: '#1B4D3E',
  },
  timeframeText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  activeTimeframeText: {
    color: '#FFFFFF',
  },
  chart: {
    height: 150,
  },
  chartArea: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  chartBar: {
    width: 8,
    borderRadius: 2,
    minHeight: 4,
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  infoGrid: {
    gap: 16,
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#F8F9FA',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  infoValue: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'right',
    maxWidth: '50%',
  },
  transactionsSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  noTransactions: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  noTransactionsText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
    marginTop: 16,
    marginBottom: 8,
  },
  noTransactionsSubtext: {
    fontSize: 14,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  transactionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  transactionAmount: {
    fontSize: 14,
    fontFamily: 'Poppins-Bold',
  },
  viewAllTransactions: {
    backgroundColor: '#F0EADA',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 16,
  },
  viewAllText: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  bottomSpacing: {
    height: 20,
  },
});