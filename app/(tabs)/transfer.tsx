import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUp, ArrowDown, QrCode, Users, Scan } from 'lucide-react-native';
import { TokenSelector } from '@/components/TokenSelector';
import { ContactsList } from '@/components/ContactsList';
import { BiometricAuth } from '@/components/BiometricAuth';
import { QRScanner } from '@/components/QRScanner';
import { mockTokens } from '@/data/mockData';

export default function TransferScreen() {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>('send');
  const [selectedToken, setSelectedToken] = useState(mockTokens[0]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showBiometric, setShowBiometric] = useState(false);
  const [qrScannerVisible, setQrScannerVisible] = useState(false);

  const handleSend = () => {
    if (amount && recipient) {
      setShowBiometric(true);
    }
  };

  const handleBiometricSuccess = () => {
    setShowBiometric(false);
    // Handle successful transaction
    setAmount('');
    setRecipient('');
  };

  const handleQRScan = (data: string) => {
    setRecipient(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Transfer</Text>
        </View>

        {/* Tab Selector */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'send' && styles.activeTab]}
            onPress={() => setActiveTab('send')}
          >
            <ArrowUp size={20} color={activeTab === 'send' ? '#FFFFFF' : '#1B4D3E'} strokeWidth={2} />
            <Text style={[styles.tabText, activeTab === 'send' && styles.activeTabText]}>
              Send
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'receive' && styles.activeTab]}
            onPress={() => setActiveTab('receive')}
          >
            <ArrowDown size={20} color={activeTab === 'receive' ? '#FFFFFF' : '#1B4D3E'} strokeWidth={2} />
            <Text style={[styles.tabText, activeTab === 'receive' && styles.activeTabText]}>
              Receive
            </Text>
          </TouchableOpacity>
        </View>

        {activeTab === 'send' ? (
          <View style={styles.sendContainer}>
            {/* Token Selection */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Select Token</Text>
              <TokenSelector
                selectedToken={selectedToken}
                onTokenSelect={setSelectedToken}
                tokens={mockTokens}
              />
            </View>

            {/* Amount Input */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Amount</Text>
              <View style={styles.amountCard}>
                <TextInput
                  style={styles.amountInput}
                  value={amount}
                  onChangeText={setAmount}
                  placeholder="0.00"
                  placeholderTextColor="#999999"
                  keyboardType="numeric"
                />
                <Text style={styles.tokenSymbol}>{selectedToken.symbol}</Text>
              </View>
              <Text style={styles.balanceText}>
                Available: {selectedToken.balance.toFixed(2)} {selectedToken.symbol}
              </Text>
            </View>

            {/* Recipient */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Send To</Text>
              <View style={styles.recipientCard}>
                <TextInput
                  style={styles.recipientInput}
                  value={recipient}
                  onChangeText={setRecipient}
                  placeholder="Enter wallet address or phone number"
                  placeholderTextColor="#999999"
                />
                <TouchableOpacity 
                  style={styles.scanButton}
                  onPress={() => setQrScannerVisible(true)}
                >
                  <Scan size={20} color="#1B4D3E" strokeWidth={2} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Quick Contacts */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quick Send</Text>
              <ContactsList onContactSelect={setRecipient} />
            </View>

            {/* Send Button */}
            <TouchableOpacity
              style={[styles.sendButton, (!amount || !recipient) && styles.disabledButton]}
              onPress={handleSend}
              disabled={!amount || !recipient}
            >
              <Text style={styles.sendButtonText}>Send {selectedToken.symbol}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.receiveContainer}>
            {/* QR Code Display */}
            <View style={styles.qrContainer}>
              <View style={styles.qrPlaceholder}>
                <QrCode size={120} color="#1B4D3E" strokeWidth={1} />
              </View>
              <Text style={styles.walletAddress}>
                8K7Qt...9mPx2
              </Text>
              <Text style={styles.addressSubtext}>
                Your {selectedToken.symbol} wallet address
              </Text>
            </View>

            {/* Share Options */}
            <View style={styles.shareOptions}>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Copy Address</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareButton}>
                <Text style={styles.shareButtonText}>Share QR Code</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Biometric Authentication Modal */}
      <BiometricAuth
        visible={showBiometric}
        onSuccess={handleBiometricSuccess}
        onCancel={() => setShowBiometric(false)}
        amount={amount}
        token={selectedToken.symbol}
        recipient={recipient}
      />

      {/* QR Scanner Modal */}
      <QRScanner
        visible={qrScannerVisible}
        onClose={() => setQrScannerVisible(false)}
        onScan={handleQRScan}
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
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginBottom: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  activeTab: {
    backgroundColor: '#1B4D3E',
  },
  tabText: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  activeTabText: {
    color: '#FFFFFF',
  },
  sendContainer: {
    flex: 1,
  },
  receiveContainer: {
    flex: 1,
    alignItems: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  amountCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  tokenSymbol: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  balanceText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginTop: 8,
  },
  recipientCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  recipientInput: {
    flex: 1,
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Regular',
  },
  scanButton: {
    padding: 8,
    backgroundColor: '#F0EADA',
    borderRadius: 8,
  },
  sendButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 24,
    padding: 18,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.5,
  },
  sendButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    margin: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  qrPlaceholder: {
    width: 200,
    height: 200,
    backgroundColor: '#F0EADA',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  walletAddress: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  addressSubtext: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  shareOptions: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B4D3E',
  },
  shareButtonText: {
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
});