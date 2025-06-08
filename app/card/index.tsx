import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, CreditCard, Plus, Eye, EyeOff, Settings, Lock, Clock as Unlock, Gift, Star, TrendingUp, Calendar, DollarSign, ShoppingBag, Coffee, Car, Utensils, Fuel, Zap, Award, Target, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Card {
  id: string;
  type: 'virtual' | 'physical';
  name: string;
  number: string;
  balance: number;
  currency: string;
  status: 'active' | 'locked' | 'expired';
  expiryDate: string;
  color: string;
  gradient: string[];
  cashback: number;
  monthlySpent: number;
  monthlyLimit: number;
}

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  currency: string;
  category: string;
  date: Date;
  cashback: number;
  icon: React.ReactNode;
}

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  category: string;
  expiryDate: Date;
  icon: React.ReactNode;
  color: string;
}

export default function CardScreen() {
  const router = useRouter();
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'rewards'>('overview');

  const cards: Card[] = [
    {
      id: '1',
      type: 'virtual',
      name: 'Sanafi Virtual Card',
      number: '**** **** **** 1234',
      balance: 2450.75,
      currency: 'AED',
      status: 'active',
      expiryDate: '12/27',
      color: '#1B4D3E',
      gradient: ['#1B4D3E', '#2D6B4F'],
      cashback: 2.5,
      monthlySpent: 1250.30,
      monthlyLimit: 5000,
    },
    {
      id: '2',
      type: 'physical',
      name: 'Sanafi Premium Card',
      number: '**** **** **** 5678',
      balance: 8920.40,
      currency: 'AED',
      status: 'active',
      expiryDate: '08/26',
      color: '#F59E0B',
      gradient: ['#F59E0B', '#D97706'],
      cashback: 5.0,
      monthlySpent: 3420.80,
      monthlyLimit: 15000,
    },
  ];

  const recentTransactions: Transaction[] = [
    {
      id: '1',
      merchant: 'Starbucks Coffee',
      amount: 25.50,
      currency: 'AED',
      category: 'Food & Dining',
      date: new Date(Date.now() - 2 * 60 * 60 * 1000),
      cashback: 1.28,
      icon: <Coffee size={20} color="#8B4513" strokeWidth={2} />,
    },
    {
      id: '2',
      merchant: 'ADNOC Petrol Station',
      amount: 180.00,
      currency: 'AED',
      category: 'Fuel',
      date: new Date(Date.now() - 6 * 60 * 60 * 1000),
      cashback: 9.00,
      icon: <Fuel size={20} color="#FF6B35" strokeWidth={2} />,
    },
    {
      id: '3',
      merchant: 'Carrefour Hypermarket',
      amount: 320.75,
      currency: 'AED',
      category: 'Shopping',
      date: new Date(Date.now() - 24 * 60 * 60 * 1000),
      cashback: 8.02,
      icon: <ShoppingBag size={20} color="#00A651" strokeWidth={2} />,
    },
    {
      id: '4',
      merchant: 'Dubai Mall Parking',
      amount: 15.00,
      currency: 'AED',
      category: 'Transport',
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      cashback: 0.75,
      icon: <Car size={20} color="#4A90E2" strokeWidth={2} />,
    },
    {
      id: '5',
      merchant: 'DEWA Bill Payment',
      amount: 450.20,
      currency: 'AED',
      category: 'Utilities',
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      cashback: 11.26,
      icon: <Zap size={20} color="#FFD700" strokeWidth={2} />,
    },
  ];

  const rewards: Reward[] = [
    {
      id: '1',
      title: '5% Cashback on Dining',
      description: 'Get 5% cashback on all restaurant purchases this month',
      points: 250,
      category: 'Dining',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      icon: <Utensils size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#EF4444',
    },
    {
      id: '2',
      title: 'Double Points Weekend',
      description: 'Earn 2x points on all purchases this weekend',
      points: 500,
      category: 'Shopping',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      icon: <Star size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B5CF6',
    },
    {
      id: '3',
      title: 'Fuel Savings Boost',
      description: '10% cashback on fuel purchases up to AED 100',
      points: 1000,
      category: 'Fuel',
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      icon: <Fuel size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#F59E0B',
    },
  ];

  const selectedCard = cards[selectedCardIndex];
  const totalCashback = recentTransactions.reduce((sum, tx) => sum + tx.cashback, 0);
  const totalRewardPoints = rewards.reduce((sum, reward) => sum + reward.points, 0);

  const handleCardAction = (action: string) => {
    switch (action) {
      case 'freeze':
        Alert.alert(
          'Freeze Card',
          `Are you sure you want to freeze your ${selectedCard.name}?`,
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Freeze', style: 'destructive', onPress: () => Alert.alert('Success', 'Card has been frozen') },
          ]
        );
        break;
      case 'settings':
        Alert.alert('Card Settings', 'This would open card settings and controls');
        break;
      case 'add':
        Alert.alert('Add New Card', 'This would open the new card application flow');
        break;
      default:
        break;
    }
  };

  const renderCard = (card: Card, index: number) => (
    <TouchableOpacity
      key={card.id}
      style={[
        styles.cardContainer,
        index === selectedCardIndex && styles.selectedCard,
      ]}
      onPress={() => setSelectedCardIndex(index)}
    >
      <View style={[styles.card, { backgroundColor: card.color }]}>
        <View style={styles.cardHeader}>
          <View style={styles.cardType}>
            <CreditCard size={24} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.cardTypeBadge}>
              {card.type === 'virtual' ? 'VIRTUAL' : 'PHYSICAL'}
            </Text>
          </View>
          <View style={styles.cardStatus}>
            {card.status === 'active' ? (
              <Unlock size={16} color="#22C55E" strokeWidth={2} />
            ) : (
              <Lock size={16} color="#EF4444" strokeWidth={2} />
            )}
          </View>
        </View>

        <View style={styles.cardBalance}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>
            {balanceVisible 
              ? `${card.balance.toLocaleString('en-AE', { style: 'currency', currency: card.currency })}`
              : '••••••'
            }
          </Text>
        </View>

        <View style={styles.cardFooter}>
          <View>
            <Text style={styles.cardNumber}>{card.number}</Text>
            <Text style={styles.cardName}>{card.name}</Text>
          </View>
          <View style={styles.cardExpiry}>
            <Text style={styles.expiryLabel}>EXPIRES</Text>
            <Text style={styles.expiryDate}>{card.expiryDate}</Text>
          </View>
        </View>

        <View style={styles.cardCashback}>
          <Text style={styles.cashbackText}>{card.cashback}% Cashback</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* Monthly Spending */}
      <View style={styles.spendingCard}>
        <Text style={styles.cardSectionTitle}>Monthly Spending</Text>
        <View style={styles.spendingProgress}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  width: `${(selectedCard.monthlySpent / selectedCard.monthlyLimit) * 100}%`,
                  backgroundColor: selectedCard.color,
                }
              ]} 
            />
          </View>
          <View style={styles.spendingDetails}>
            <Text style={styles.spentAmount}>
              AED {selectedCard.monthlySpent.toLocaleString()}
            </Text>
            <Text style={styles.spendingLimit}>
              of AED {selectedCard.monthlyLimit.toLocaleString()}
            </Text>
          </View>
        </View>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Gift size={24} color="#22C55E" strokeWidth={2} />
          </View>
          <Text style={styles.statValue}>AED {totalCashback.toFixed(2)}</Text>
          <Text style={styles.statLabel}>This Month's Cashback</Text>
        </View>
        
        <View style={styles.statCard}>
          <View style={styles.statIcon}>
            <Award size={24} color="#F59E0B" strokeWidth={2} />
          </View>
          <Text style={styles.statValue}>{totalRewardPoints}</Text>
          <Text style={styles.statLabel}>Reward Points</Text>
        </View>
      </View>

      {/* Card Controls */}
      <View style={styles.controlsSection}>
        <Text style={styles.cardSectionTitle}>Card Controls</Text>
        <View style={styles.controlsGrid}>
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => handleCardAction('freeze')}
          >
            <Lock size={24} color="#EF4444" strokeWidth={2} />
            <Text style={styles.controlButtonText}>Freeze Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.controlButton}
            onPress={() => handleCardAction('settings')}
          >
            <Settings size={24} color="#1B4D3E" strokeWidth={2} />
            <Text style={styles.controlButtonText}>Settings</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderTransactions = () => (
    <View style={styles.tabContent}>
      <View style={styles.transactionsHeader}>
        <Text style={styles.cardSectionTitle}>Recent Transactions</Text>
        <TouchableOpacity>
          <Text style={styles.viewAllLink}>View All</Text>
        </TouchableOpacity>
      </View>
      
      {recentTransactions.map((transaction) => (
        <View key={transaction.id} style={styles.transactionItem}>
          <View style={styles.transactionIcon}>
            {transaction.icon}
          </View>
          
          <View style={styles.transactionDetails}>
            <Text style={styles.transactionMerchant}>{transaction.merchant}</Text>
            <Text style={styles.transactionCategory}>{transaction.category}</Text>
            <Text style={styles.transactionDate}>
              {transaction.date.toLocaleDateString()} • {transaction.date.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>
          
          <View style={styles.transactionAmounts}>
            <Text style={styles.transactionAmount}>
              -AED {transaction.amount.toFixed(2)}
            </Text>
            <Text style={styles.transactionCashback}>
              +AED {transaction.cashback.toFixed(2)} cashback
            </Text>
          </View>
        </View>
      ))}
    </View>
  );

  const renderRewards = () => (
    <View style={styles.tabContent}>
      <View style={styles.rewardsHeader}>
        <Text style={styles.cardSectionTitle}>Available Rewards</Text>
        <View style={styles.totalPoints}>
          <Star size={16} color="#F59E0B" strokeWidth={2} />
          <Text style={styles.totalPointsText}>{totalRewardPoints} points</Text>
        </View>
      </View>
      
      {rewards.map((reward) => (
        <View key={reward.id} style={styles.rewardItem}>
          <View style={[styles.rewardIcon, { backgroundColor: reward.color }]}>
            {reward.icon}
          </View>
          
          <View style={styles.rewardDetails}>
            <Text style={styles.rewardTitle}>{reward.title}</Text>
            <Text style={styles.rewardDescription}>{reward.description}</Text>
            <View style={styles.rewardMeta}>
              <Text style={styles.rewardPoints}>{reward.points} points</Text>
              <Text style={styles.rewardExpiry}>
                Expires {reward.expiryDate.toLocaleDateString()}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.claimButton}>
            <Text style={styles.claimButtonText}>Claim</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>My Cards</Text>
        
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
            {balanceVisible ? (
              <EyeOff size={24} color="#1B4D3E" strokeWidth={2} />
            ) : (
              <Eye size={24} color="#1B4D3E" strokeWidth={2} />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.addButton}
            onPress={() => handleCardAction('add')}
          >
            <Plus size={20} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Cards Carousel */}
        <View style={styles.cardsSection}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.cardsContainer}
            snapToInterval={width - 60}
            decelerationRate="fast"
          >
            {cards.map((card, index) => renderCard(card, index))}
          </ScrollView>
          
          {/* Card Indicators */}
          <View style={styles.cardIndicators}>
            {cards.map((_, index) => (
              <View
                key={index}
                style={[
                  styles.indicator,
                  index === selectedCardIndex && styles.activeIndicator,
                ]}
              />
            ))}
          </View>
        </View>

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'overview' && styles.activeTabButton]}
            onPress={() => setActiveTab('overview')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'overview' && styles.activeTabButtonText]}>
              Overview
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'transactions' && styles.activeTabButton]}
            onPress={() => setActiveTab('transactions')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'transactions' && styles.activeTabButtonText]}>
              Transactions
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'rewards' && styles.activeTabButton]}
            onPress={() => setActiveTab('rewards')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'rewards' && styles.activeTabButtonText]}>
              Rewards
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'transactions' && renderTransactions()}
        {activeTab === 'rewards' && renderRewards()}

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
  headerTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1B4D3E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  cardsSection: {
    paddingVertical: 20,
  },
  cardsContainer: {
    paddingHorizontal: 20,
    gap: 16,
  },
  cardContainer: {
    width: width - 80,
  },
  selectedCard: {
    transform: [{ scale: 1.02 }],
  },
  card: {
    borderRadius: 20,
    padding: 24,
    height: 200,
    justifyContent: 'space-between',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  cardTypeBadge: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
  },
  cardStatus: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBalance: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  balanceAmount: {
    fontSize: 24,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  cardName: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
  },
  cardExpiry: {
    alignItems: 'flex-end',
  },
  expiryLabel: {
    fontSize: 8,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  cardCashback: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  cashbackText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  cardIndicators: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 8,
  },
  indicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#CCCCCC',
  },
  activeIndicator: {
    backgroundColor: '#1B4D3E',
    width: 24,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTabButton: {
    backgroundColor: '#1B4D3E',
  },
  tabButtonText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  tabContent: {
    paddingHorizontal: 20,
  },
  spendingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardSectionTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  spendingProgress: {
    gap: 12,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#F0EADA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  spendingDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  spentAmount: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  spendingLimit: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  controlsSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  controlsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  controlButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  controlButtonText: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  transactionsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  viewAllLink: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  transactionItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionMerchant: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  transactionCategory: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  transactionDate: {
    fontSize: 10,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
  },
  transactionAmounts: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    color: '#EF4444',
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
  },
  transactionCashback: {
    fontSize: 12,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  rewardsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  totalPoints: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  totalPointsText: {
    fontSize: 14,
    color: '#92400E',
    fontFamily: 'Poppins-Bold',
  },
  rewardItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  rewardIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardDetails: {
    flex: 1,
  },
  rewardTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
    lineHeight: 20,
  },
  rewardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rewardPoints: {
    fontSize: 12,
    color: '#F59E0B',
    fontFamily: 'Poppins-Bold',
  },
  rewardExpiry: {
    fontSize: 10,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
  },
  claimButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  claimButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  bottomSpacing: {
    height: 20,
  },
});