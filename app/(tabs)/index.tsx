import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Eye, EyeOff, Plus, QrCode, Bell, RefreshCw, ArrowUpDown, CreditCard, ArrowDownToLine, Gift, Zap } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { TokenBalanceCard } from '@/components/TokenBalanceCard';
import { QuickActionCard } from '@/components/QuickActionCard';
import { RecentTransactionCard } from '@/components/RecentTransactionCard';
import { PriceCard } from '@/components/PriceCard';
import { QRScanner } from '@/components/QRScanner';
import { CashOutModal } from '../../components/CashOutModal';
import { AddFundsModal } from '../../components/AddFundsModal';
import { TransferModal } from '../../components/TransferModal';
import { mockTokens, mockTransactions, mockPrices } from '@/data/mockData';

export default function HomeScreen() {
  const router = useRouter();
  const [balanceVisible, setBalanceVisible] = useState(true);
  const [prices, setPrices] = useState(mockPrices);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [qrScannerVisible, setQrScannerVisible] = useState(false);
  const [cashOutModalVisible, setCashOutModalVisible] = useState(false);
  const [addFundsModalVisible, setAddFundsModalVisible] = useState(false);
  const [transferModalVisible, setTransferModalVisible] = useState(false);
  const [transferInitialTab, setTransferInitialTab] = useState<'send' | 'receive'>('send');

  // Simulate real-time price updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPrices(prevPrices => 
        prevPrices.map(price => ({
          ...price,
          price: price.price * (0.995 + Math.random() * 0.01), // Small price fluctuation
          change24h: -2 + Math.random() * 4, // Random change between -2% and +2%
        }))
      );
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const totalBalance = mockTokens.reduce((sum, token) => sum + (token.balance * token.price), 0);

  const recentTransactions = mockTransactions.slice(0, 3);

  const handleQuickAction = (action: string) => {
    switch (action) {
      case 'add-funds':
        setAddFundsModalVisible(true);
        break;
      case 'send':
        setTransferInitialTab('send');
        setTransferModalVisible(true);
        break;
      case 'receive':
        setTransferInitialTab('receive');
        setTransferModalVisible(true);
        break;
      case 'exchange':
        Alert.alert('Exchange Tokens', 'This would open the token exchange flow');
        break;
      case 'card':
        router.push('/card');
        break;
      case 'cash-out':
        setCashOutModalVisible(true);
        break;
      case 'rewards':
        Alert.alert('Rewards', 'This would open the rewards and loyalty program');
        break;
      case 'pay':
        Alert.alert('Pay', 'This would open the payment and bill pay features');
        break;
      default:
        break;
    }
  };

  const handleQRScan = (data: string) => {
    // Handle the scanned QR code data
    Alert.alert(
      'QR Code Scanned',
      `Scanned data: ${data}`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Use Address',
          onPress: () => {
            // Here you would typically navigate to send screen with the address
            Alert.alert('Success', 'Address has been set for transfer');
          },
        },
      ]
    );
  };

  const handleCashOut = (amount: number, token: string, bankAccount: string) => {
    // Simulate cash out process
    Alert.alert(
      'Cash Out Initiated',
      `AED ${amount.toFixed(2)} will be transferred to your ${bankAccount} account within 1-2 business days.`,
      [{ text: 'OK' }]
    );
  };

  const handleAddFunds = (amount: number, token: string, paymentMethod: string) => {
    // Simulate add funds process
    Alert.alert(
      'Add Funds Initiated',
      `AED ${amount.toFixed(2)} will be added to your ${token} balance using ${paymentMethod}.`,
      [{ text: 'OK' }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good morning</Text>
            <Text style={styles.userName}>Ahmed Al-Rashid</Text>
          </View>
          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.headerButton}>
              <Bell size={20} color="#1B4D3E" strokeWidth={2} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.headerButton}
              onPress={() => setQrScannerVisible(true)}
            >
              <QrCode size={20} color="#1B4D3E" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Integrated Balance & Actions Card - 4x2 Grid Layout */}
        <View style={styles.balanceActionsCard}>
          {/* Balance Section */}
          <View style={styles.balanceSection}>
            <View style={styles.balanceHeader}>
              <Text style={styles.balanceLabel}>Total Balance</Text>
              <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                {balanceVisible ? (
                  <EyeOff size={20} color="#FFFFFF" strokeWidth={2} />
                ) : (
                  <Eye size={20} color="#FFFFFF" strokeWidth={2} />
                )}
              </TouchableOpacity>
            </View>
            <Text style={styles.balanceAmount}>
              {balanceVisible ? `${totalBalance.toLocaleString('en-AE', { style: 'currency', currency: 'AED' })}` : '••••••'}
            </Text>
            <Text style={styles.balanceSubtext}>
              Last updated: {lastUpdate.toLocaleTimeString('en-AE', { hour: '2-digit', minute: '2-digit' })}
            </Text>
          </View>

          {/* 4x2 Grid Actions Layout */}
          <View style={styles.gridActionsContainer}>
            {/* First Row - 4 items */}
            <View style={styles.gridRow}>
              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('add-funds')}
              >
                <View style={styles.gridActionIcon}>
                  <Plus size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Add Funds</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('cash-out')}
              >
                <View style={styles.gridActionIcon}>
                  <ArrowDownToLine size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Cash Out</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('send')}
              >
                <View style={styles.gridActionIcon}>
                  <ArrowUpDown size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Send</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('receive')}
              >
                <View style={styles.gridActionIcon}>
                  <QrCode size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Receive</Text>
              </TouchableOpacity>
            </View>

            {/* Second Row - 4 items */}
            <View style={styles.gridRow}>
              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('exchange')}
              >
                <View style={styles.gridActionIcon}>
                  <RefreshCw size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Exchange</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('card')}
              >
                <View style={styles.gridActionIcon}>
                  <CreditCard size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>My Cards</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('rewards')}
              >
                <View style={styles.gridActionIcon}>
                  <Gift size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Rewards</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={styles.gridActionItem}
                onPress={() => handleQuickAction('pay')}
              >
                <View style={styles.gridActionIcon}>
                  <Zap size={16} color="#1B4D3E" strokeWidth={2} />
                </View>
                <Text style={styles.gridActionText}>Pay</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Token Balances */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your Tokens</Text>
          {mockTokens.map((token) => (
            <TokenBalanceCard
              key={token.symbol}
              token={token}
              isVisible={balanceVisible}
            />
          ))}
        </View>

        {/* Market Prices */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Market Prices</Text>
          {prices.map((priceData) => (
            <PriceCard
              key={priceData.symbol}
              priceData={priceData}
            />
          ))}
        </View>

        {/* Recent Transactions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {recentTransactions.map((transaction) => (
            <RecentTransactionCard
              key={transaction.id}
              transaction={transaction}
            />
          ))}
          <TouchableOpacity 
            style={styles.viewAllButton}
            onPress={() => router.push('/activity')}
          >
            <Text style={styles.viewAllText}>View All Transactions</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* QR Scanner Modal */}
      <QRScanner
        visible={qrScannerVisible}
        onClose={() => setQrScannerVisible(false)}
        onScan={handleQRScan}
      />

      {/* Cash Out Modal */}
      <CashOutModal
        visible={cashOutModalVisible}
        onClose={() => setCashOutModalVisible(false)}
        onCashOut={handleCashOut}
        tokens={mockTokens}
        balanceVisible={balanceVisible}
      />

      {/* Add Funds Modal */}
      <AddFundsModal
        visible={addFundsModalVisible}
        onClose={() => setAddFundsModalVisible(false)}
        onAddFunds={handleAddFunds}
        tokens={mockTokens}
        balanceVisible={balanceVisible}
      />

      {/* Transfer Modal */}
      <TransferModal
        visible={transferModalVisible}
        onClose={() => setTransferModalVisible(false)}
        initialTab={transferInitialTab}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  userName: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginTop: 4,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 12,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  balanceActionsCard: {
    backgroundColor: '#1B4D3E',
    borderRadius: 24,
    padding: 24,
    marginBottom: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
  },
  balanceSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  balanceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  balanceLabel: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    fontFamily: 'Poppins-Regular',
  },
  balanceAmount: {
    fontSize: 42,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  balanceSubtext: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.7)',
    fontFamily: 'Poppins-Regular',
  },

  // 4x2 Grid Layout Styles
  gridActionsContainer: {
    gap: 12,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  gridActionItem: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 12,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 70,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  gridActionIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  gridActionText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    lineHeight: 12,
  },

  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 16,
  },
  viewAllButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
    borderColor: '#1B4D3E',
  },
  viewAllText: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});