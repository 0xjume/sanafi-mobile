import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  TextInput,
  ScrollView,
  Alert,
} from 'react-native';
import { X, ArrowUpDown, ArrowUp, ArrowDown, QrCode, Scan, Send, Download } from 'lucide-react-native';
import { TokenSelector } from '@/components/TokenSelector';
import { ContactsList } from '@/components/ContactsList';
import { BiometricAuth } from '@/components/BiometricAuth';
import { QRScanner } from '@/components/QRScanner';
import { mockTokens, Token } from '@/data/mockData';

interface TransferModalProps {
  visible: boolean;
  onClose: () => void;
  initialTab?: 'send' | 'receive';
}

export function TransferModal({ visible, onClose, initialTab = 'send' }: TransferModalProps) {
  const [activeTab, setActiveTab] = useState<'send' | 'receive'>(initialTab);
  const [selectedToken, setSelectedToken] = useState(mockTokens[0]);
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');
  const [showBiometric, setShowBiometric] = useState(false);
  const [qrScannerVisible, setQrScannerVisible] = useState(false);

  const resetModal = () => {
    setActiveTab(initialTab);
    setAmount('');
    setRecipient('');
    setSelectedToken(mockTokens[0]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleSend = () => {
    if (amount && recipient) {
      setShowBiometric(true);
    } else {
      Alert.alert('Error', 'Please enter amount and recipient');
    }
  };

  const handleBiometricSuccess = () => {
    setShowBiometric(false);
    Alert.alert(
      'Transaction Successful',
      `Successfully sent ${amount} ${selectedToken.symbol} to ${recipient}`,
      [{ text: 'OK', onPress: handleClose }]
    );
  };

  const handleQRScan = (data: string) => {
    setRecipient(data);
    setQrScannerVisible(false);
  };

  const handleReceive = () => {
    Alert.alert(
      'Receive Address',
      `Your ${selectedToken.symbol} address:\n\n8K7Qt...9mPx2\n\nShare this address to receive payments.`,
      [
        { text: 'Copy Address', onPress: () => Alert.alert('Copied', 'Address copied to clipboard') },
        { text: 'Share QR Code', onPress: () => Alert.alert('Share', 'QR code sharing opened') },
        { text: 'Close', style: 'cancel' },
      ]
    );
  };

  const renderSendTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
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
        
        {/* Quick Amount Buttons */}
        <View style={styles.quickAmounts}>
          {[25, 50, 100, 250].map((quickAmount) => (
            <TouchableOpacity
              key={quickAmount}
              style={styles.quickAmountButton}
              onPress={() => setAmount(quickAmount.toString())}
            >
              <Text style={styles.quickAmountText}>{quickAmount}</Text>
            </TouchableOpacity>
          ))}
        </View>
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
        style={[
          styles.actionButton,
          (!amount || !recipient) && styles.disabledButton,
        ]}
        onPress={handleSend}
        disabled={!amount || !recipient}
      >
        <Send size={20} color="#FFFFFF" strokeWidth={2} />
        <Text style={styles.actionButtonText}>Send {selectedToken.symbol}</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  const renderReceiveTab = () => (
    <ScrollView style={styles.tabContent} showsVerticalScrollIndicator={false}>
      {/* Token Selection */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Select Token</Text>
        <TokenSelector
          selectedToken={selectedToken}
          onTokenSelect={setSelectedToken}
          tokens={mockTokens}
        />
      </View>

      {/* QR Code Display */}
      <View style={styles.qrContainer}>
        <View style={styles.qrPlaceholder}>
          <QrCode size={120} color="#1B4D3E" strokeWidth={1} />
        </View>
        <Text style={styles.walletAddress}>8K7Qt...9mPx2</Text>
        <Text style={styles.addressSubtext}>
          Your {selectedToken.symbol} wallet address
        </Text>
      </View>

      {/* Share Options */}
      <View style={styles.shareOptions}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => Alert.alert('Copied', 'Address copied to clipboard')}
        >
          <Text style={styles.shareButtonText}>Copy Address</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => Alert.alert('Share', 'QR code sharing opened')}
        >
          <Text style={styles.shareButtonText}>Share QR Code</Text>
        </TouchableOpacity>
      </View>

      {/* Receive Button */}
      <TouchableOpacity
        style={styles.actionButton}
        onPress={handleReceive}
      >
        <Download size={20} color="#FFFFFF" strokeWidth={2} />
        <Text style={styles.actionButtonText}>Generate Receive Link</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={handleClose}
    >
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Transfer</Text>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#1B4D3E" strokeWidth={2} />
            </TouchableOpacity>
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

          {/* Content */}
          <View style={styles.content}>
            {activeTab === 'send' ? renderSendTab() : renderReceiveTab()}
          </View>

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
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modal: {
    backgroundColor: '#F0EADA',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
    minHeight: '70%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 20,
    marginBottom: 20,
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
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
  },
  tabContent: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 20,
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
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  quickAmounts: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  quickAmountButton: {
    backgroundColor: '#F0EADA',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#1B4D3E',
  },
  quickAmountText: {
    fontSize: 12,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  recipientCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
  actionButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
  qrContainer: {
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#E5E7EB',
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
    gap: 12,
    marginBottom: 24,
  },
  shareButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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