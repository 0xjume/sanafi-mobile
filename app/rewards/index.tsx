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
import { ArrowLeft, Gift, Star, Trophy, Target, Zap, Coffee, ShoppingBag, Fuel, Utensils, Plane, Gamepad2, Crown, Clock, TrendingUp, Award, Sparkles, CircleCheck as CheckCircle } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface Reward {
  id: string;
  title: string;
  description: string;
  points: number;
  originalPoints?: number;
  category: string;
  type: 'cashback' | 'discount' | 'freebie' | 'experience';
  expiryDate: Date;
  icon: React.ReactNode;
  color: string;
  featured?: boolean;
  limitedTime?: boolean;
  claimed?: boolean;
  image?: string;
}

interface RewardCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  color: string;
  count: number;
}

interface UserStats {
  totalPoints: number;
  pointsEarned: number;
  pointsRedeemed: number;
  tier: string;
  nextTierPoints: number;
  cashbackEarned: number;
  rewardsRedeemed: number;
}

export default function RewardsScreen() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState<'available' | 'claimed' | 'expired'>('available');

  const userStats: UserStats = {
    totalPoints: 2450,
    pointsEarned: 5680,
    pointsRedeemed: 3230,
    tier: 'Gold',
    nextTierPoints: 550,
    cashbackEarned: 234.50,
    rewardsRedeemed: 12,
  };

  const categories: RewardCategory[] = [
    {
      id: 'all',
      name: 'All',
      icon: <Star size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#1B4D3E',
      count: 24,
    },
    {
      id: 'dining',
      name: 'Dining',
      icon: <Utensils size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#EF4444',
      count: 8,
    },
    {
      id: 'shopping',
      name: 'Shopping',
      icon: <ShoppingBag size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B5CF6',
      count: 6,
    },
    {
      id: 'fuel',
      name: 'Fuel',
      icon: <Fuel size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#F59E0B',
      count: 4,
    },
    {
      id: 'travel',
      name: 'Travel',
      icon: <Plane size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#06B6D4',
      count: 3,
    },
    {
      id: 'entertainment',
      name: 'Fun',
      icon: <Gamepad2 size={20} color="#FFFFFF" strokeWidth={2} />,
      color: '#EC4899',
      count: 3,
    },
  ];

  const rewards: Reward[] = [
    {
      id: '1',
      title: '10% Cashback at Starbucks',
      description: 'Get 10% cashback on all Starbucks purchases this week',
      points: 500,
      category: 'dining',
      type: 'cashback',
      expiryDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000),
      icon: <Coffee size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B4513',
      featured: true,
      limitedTime: true,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '2',
      title: 'Free Dubai Mall Parking',
      description: 'Complimentary 4-hour parking at Dubai Mall',
      points: 200,
      category: 'shopping',
      type: 'freebie',
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      icon: <ShoppingBag size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B5CF6',
      image: 'https://images.pexels.com/photos/1004584/pexels-photo-1004584.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '3',
      title: 'AED 50 ADNOC Fuel Credit',
      description: 'Get AED 50 credit for fuel purchases at any ADNOC station',
      points: 1000,
      category: 'fuel',
      type: 'cashback',
      expiryDate: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
      icon: <Fuel size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#F59E0B',
      featured: true,
      image: 'https://images.pexels.com/photos/33688/delicate-arch-night-stars-landscape.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '4',
      title: '25% Off Emirates Flight',
      description: 'Save 25% on your next Emirates flight booking',
      points: 2000,
      originalPoints: 2500,
      category: 'travel',
      type: 'discount',
      expiryDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
      icon: <Plane size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#06B6D4',
      featured: true,
      image: 'https://images.pexels.com/photos/358319/pexels-photo-358319.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '5',
      title: 'VOX Cinema Free Ticket',
      description: 'Complimentary movie ticket at any VOX Cinema location',
      points: 800,
      category: 'entertainment',
      type: 'freebie',
      expiryDate: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
      icon: <Gamepad2 size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#EC4899',
      image: 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '6',
      title: 'Double Points Weekend',
      description: 'Earn 2x points on all purchases this weekend',
      points: 0,
      category: 'all',
      type: 'experience',
      expiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
      icon: <Sparkles size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#22C55E',
      limitedTime: true,
      image: 'https://images.pexels.com/photos/6801648/pexels-photo-6801648.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '7',
      title: 'Carrefour AED 100 Voucher',
      description: 'Shopping voucher valid at any Carrefour hypermarket',
      points: 1500,
      category: 'shopping',
      type: 'discount',
      expiryDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
      icon: <ShoppingBag size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#00A651',
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
    {
      id: '8',
      title: 'Premium Dining Experience',
      description: '3-course meal for 2 at Atlantis The Palm',
      points: 3500,
      category: 'dining',
      type: 'experience',
      expiryDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
      icon: <Crown size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#DC2626',
      featured: true,
      image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&dpr=1',
    },
  ];

  const claimedRewards: Reward[] = [
    {
      id: 'c1',
      title: 'AED 25 Starbucks Credit',
      description: 'Cashback credit applied to your account',
      points: 500,
      category: 'dining',
      type: 'cashback',
      expiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      icon: <Coffee size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B4513',
      claimed: true,
    },
    {
      id: 'c2',
      title: 'Free Mall of Emirates Parking',
      description: 'Used on December 15, 2024',
      points: 200,
      category: 'shopping',
      type: 'freebie',
      expiryDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      icon: <ShoppingBag size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#8B5CF6',
      claimed: true,
    },
  ];

  const expiredRewards: Reward[] = [
    {
      id: 'e1',
      title: '15% Off Noon.com',
      description: 'Discount code expired on December 1, 2024',
      points: 750,
      category: 'shopping',
      type: 'discount',
      expiryDate: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      icon: <ShoppingBag size={24} color="#FFFFFF" strokeWidth={2} />,
      color: '#6B7280',
    },
  ];

  const filteredRewards = () => {
    let rewardsList = rewards;
    
    if (activeTab === 'claimed') {
      rewardsList = claimedRewards;
    } else if (activeTab === 'expired') {
      rewardsList = expiredRewards;
    }

    if (selectedCategory === 'all') {
      return rewardsList;
    }
    return rewardsList.filter(reward => reward.category === selectedCategory);
  };

  const handleClaimReward = (reward: Reward) => {
    if (userStats.totalPoints < reward.points) {
      Alert.alert(
        'Insufficient Points',
        `You need ${reward.points - userStats.totalPoints} more points to claim this reward.`,
        [{ text: 'OK' }]
      );
      return;
    }

    Alert.alert(
      'Claim Reward',
      `Are you sure you want to claim "${reward.title}" for ${reward.points} points?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Claim',
          onPress: () => {
            Alert.alert(
              'Reward Claimed!',
              `You've successfully claimed "${reward.title}". Check your claimed rewards for details.`,
              [{ text: 'OK' }]
            );
          },
        },
      ]
    );
  };

  const getTierProgress = () => {
    const currentTierPoints = userStats.totalPoints;
    const totalNeeded = currentTierPoints + userStats.nextTierPoints;
    return (currentTierPoints / totalNeeded) * 100;
  };

  const renderStatsCard = () => (
    <View style={styles.statsCard}>
      <View style={styles.statsHeader}>
        <View style={styles.tierBadge}>
          <Crown size={20} color="#F59E0B" strokeWidth={2} />
          <Text style={styles.tierText}>{userStats.tier} Member</Text>
        </View>
        <View style={styles.pointsDisplay}>
          <Text style={styles.pointsAmount}>{userStats.totalPoints.toLocaleString()}</Text>
          <Text style={styles.pointsLabel}>Available Points</Text>
        </View>
      </View>

      <View style={styles.tierProgress}>
        <View style={styles.progressInfo}>
          <Text style={styles.progressLabel}>Progress to Platinum</Text>
          <Text style={styles.progressPoints}>{userStats.nextTierPoints} points to go</Text>
        </View>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${getTierProgress()}%` }]} />
        </View>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>AED {userStats.cashbackEarned}</Text>
          <Text style={styles.statLabel}>Cashback Earned</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.rewardsRedeemed}</Text>
          <Text style={styles.statLabel}>Rewards Claimed</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{userStats.pointsEarned.toLocaleString()}</Text>
          <Text style={styles.statLabel}>Total Points Earned</Text>
        </View>
      </View>
    </View>
  );

  const renderCategoryFilter = () => (
    <View style={styles.categoriesContainer}>
      <Text style={styles.sectionTitle}>Categories</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesList}>
        {categories.map((category) => (
          <TouchableOpacity
            key={category.id}
            style={[
              styles.categoryItem,
              { backgroundColor: category.color },
              selectedCategory === category.id && styles.selectedCategory,
            ]}
            onPress={() => setSelectedCategory(category.id)}
          >
            <View style={styles.categoryIcon}>
              {category.icon}
            </View>
            <Text style={styles.categoryName}>{category.name}</Text>
            <Text style={styles.categoryCount}>{category.count}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderRewardCard = (reward: Reward) => (
    <View key={reward.id} style={styles.rewardCard}>
      {reward.image && (
        <Image source={{ uri: reward.image }} style={styles.rewardImage} resizeMode="cover" />
      )}
      
      <View style={styles.rewardContent}>
        <View style={styles.rewardHeader}>
          <View style={[styles.rewardIcon, { backgroundColor: reward.color }]}>
            {reward.icon}
          </View>
          
          <View style={styles.rewardInfo}>
            <View style={styles.rewardTitleRow}>
              <Text style={styles.rewardTitle} numberOfLines={1}>{reward.title}</Text>
              {reward.featured && (
                <View style={styles.featuredBadge}>
                  <Star size={12} color="#F59E0B" strokeWidth={2} fill="#F59E0B" />
                </View>
              )}
              {reward.limitedTime && (
                <View style={styles.limitedBadge}>
                  <Clock size={12} color="#EF4444" strokeWidth={2} />
                </View>
              )}
            </View>
            
            <Text style={styles.rewardDescription} numberOfLines={2}>
              {reward.description}
            </Text>
            
            <View style={styles.rewardMeta}>
              <View style={styles.pointsContainer}>
                {reward.originalPoints && (
                  <Text style={styles.originalPoints}>{reward.originalPoints}</Text>
                )}
                <Text style={styles.rewardPoints}>
                  {reward.points === 0 ? 'FREE' : `${reward.points} pts`}
                </Text>
              </View>
              
              <Text style={styles.expiryDate}>
                Expires {reward.expiryDate.toLocaleDateString()}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.rewardActions}>
          {activeTab === 'available' ? (
            <TouchableOpacity
              style={[
                styles.claimButton,
                userStats.totalPoints < reward.points && styles.disabledButton,
              ]}
              onPress={() => handleClaimReward(reward)}
              disabled={userStats.totalPoints < reward.points}
            >
              <Text style={[
                styles.claimButtonText,
                userStats.totalPoints < reward.points && styles.disabledButtonText,
              ]}>
                {userStats.totalPoints < reward.points ? 'Insufficient Points' : 'Claim Reward'}
              </Text>
            </TouchableOpacity>
          ) : activeTab === 'claimed' ? (
            <View style={styles.claimedStatus}>
              <CheckCircle size={16} color="#22C55E" strokeWidth={2} />
              <Text style={styles.claimedText}>Claimed</Text>
            </View>
          ) : (
            <View style={styles.expiredStatus}>
              <Clock size={16} color="#6B7280" strokeWidth={2} />
              <Text style={styles.expiredText}>Expired</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <ArrowLeft size={24} color="#1B4D3E" strokeWidth={2} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Rewards</Text>
        
        <TouchableOpacity style={styles.historyButton}>
          <Trophy size={24} color="#1B4D3E" strokeWidth={2} />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Stats Card */}
        {renderStatsCard()}

        {/* Category Filter */}
        {renderCategoryFilter()}

        {/* Tab Navigation */}
        <View style={styles.tabNavigation}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'available' && styles.activeTabButton]}
            onPress={() => setActiveTab('available')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'available' && styles.activeTabButtonText]}>
              Available ({rewards.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'claimed' && styles.activeTabButton]}
            onPress={() => setActiveTab('claimed')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'claimed' && styles.activeTabButtonText]}>
              Claimed ({claimedRewards.length})
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'expired' && styles.activeTabButton]}
            onPress={() => setActiveTab('expired')}
          >
            <Text style={[styles.tabButtonText, activeTab === 'expired' && styles.activeTabButtonText]}>
              Expired ({expiredRewards.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Rewards List */}
        <View style={styles.rewardsContainer}>
          {filteredRewards().map(renderRewardCard)}
          
          {filteredRewards().length === 0 && (
            <View style={styles.emptyState}>
              <Gift size={64} color="#CCCCCC" strokeWidth={1} />
              <Text style={styles.emptyStateTitle}>No Rewards Found</Text>
              <Text style={styles.emptyStateText}>
                {activeTab === 'available' 
                  ? 'Check back later for new rewards in this category'
                  : activeTab === 'claimed'
                  ? 'You haven\'t claimed any rewards yet'
                  : 'No expired rewards in this category'
                }
              </Text>
            </View>
          )}
        </View>

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
  historyButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollView: {
    flex: 1,
  },
  statsCard: {
    backgroundColor: '#1B4D3E',
    margin: 20,
    borderRadius: 20,
    padding: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  statsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  tierBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 6,
  },
  tierText: {
    fontSize: 14,
    color: '#F59E0B',
    fontFamily: 'Poppins-Bold',
  },
  pointsDisplay: {
    alignItems: 'flex-end',
  },
  pointsAmount: {
    fontSize: 28,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  pointsLabel: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
  },
  tierProgress: {
    marginBottom: 24,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    fontFamily: 'Poppins-SemiBold',
  },
  progressPoints: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-Regular',
  },
  progressBar: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#F59E0B',
    borderRadius: 3,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  categoriesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  categoriesList: {
    flexDirection: 'row',
  },
  categoryItem: {
    alignItems: 'center',
    borderRadius: 16,
    padding: 16,
    marginRight: 12,
    minWidth: 80,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedCategory: {
    transform: [{ scale: 1.05 }],
    elevation: 4,
    shadowOpacity: 0.2,
  },
  categoryIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  categoryCount: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
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
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  activeTabButtonText: {
    color: '#FFFFFF',
  },
  rewardsContainer: {
    paddingHorizontal: 20,
  },
  rewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  rewardImage: {
    width: '100%',
    height: 120,
  },
  rewardContent: {
    padding: 20,
  },
  rewardHeader: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  rewardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  rewardInfo: {
    flex: 1,
  },
  rewardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
    gap: 8,
  },
  rewardTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    flex: 1,
  },
  featuredBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  limitedBadge: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#FEE2E2',
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 20,
    marginBottom: 12,
  },
  rewardMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  originalPoints: {
    fontSize: 14,
    color: '#999999',
    fontFamily: 'Poppins-SemiBold',
    textDecorationLine: 'line-through',
  },
  rewardPoints: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  expiryDate: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
  },
  rewardActions: {
    alignItems: 'flex-end',
  },
  claimButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  disabledButton: {
    backgroundColor: '#CCCCCC',
  },
  claimButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  disabledButtonText: {
    color: '#666666',
  },
  claimedStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F0FDF4',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  claimedText: {
    fontSize: 12,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  expiredStatus: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  expiredText: {
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Poppins-SemiBold',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyStateTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: 40,
  },
  bottomSpacing: {
    height: 20,
  },
});