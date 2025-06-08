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
import { X, ArrowDownToLine, Building2, CreditCard, Check, CircleAlert as AlertCircle, Clock, Shield } from 'lucide-react-native';
import { Token } from '@/data/mockData';

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  type: 'checking' | 'savings';
  isDefault: boolean;
}

interface CashOutModalProps {
  visible: boolean;
  onClose: () => void;
  onCashOut: (amount: number, token: string, bankAccount: string) => void;
  tokens: Token[];
  balanceVisible: boolean;
}

export function CashOutModal({ visible, onClose, onCashOut, tokens, balanceVisible }: CashOutModalProps) {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [amount, setAmount] = useState('');
  const [selectedBankAccount, setSelectedBankAccount] = useState<BankAccount | null>(null);
  const [step, setStep] = useState<'amount' | 'bank' | 'confirm'>('amount');

  const bankAccounts: BankAccount[] = [
    {
      id: '1',
      name: 'Emirates NBD Current Account',
      accountNumber: '****1234',
      bankName: 'Emirates NBD',
      type: 'checking',
      isDefault: true,
    },
    {
      id: '2',
      name: 'ADCB Savings Account',
      accountNumber: '****5678',
      bankName: 'Abu Dhabi Commercial Bank',
      type: 'savings',
      isDefault: false,
    },
    {
      id: '3',
      name: 'FAB Business Account',
      accountNumber: '****9012',
      bankName: 'First Abu Dhabi Bank',
      type: 'checking',
      isDefault: false,
    },
  ];

  const resetModal = () => {
    setStep('amount');
    setAmount('');
    setSelectedBankAccount(bankAccounts.find(acc => acc.isDefault) || bankAccounts[0]);
    setSelectedToken(tokens[0]);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleNext = () => {
    if (step === 'amount') {
      if (!amount || parseFloat(amount) <= 0) {
        Alert.alert('Error', 'Please enter a valid amount');
        return;
      }
      if (parseFloat(amount) > selectedToken.balance) {
        Alert.alert('Error', 'Insufficient balance');
        return;
      }
      setStep('bank');
    } else if (step === 'bank') {
      if (!selectedBankAccount) {
        Alert.alert('Error', 'Please select a bank account');
        return;
      }
      setStep('confirm');
    } else if (step === 'confirm') {
      onCashOut(parseFloat(amount), selectedToken.symbol, selectedBankAccount!.name);
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (step === 'bank') {
      setStep('amount');
    } else if (step === 'confirm') {
      setStep('bank');
    }
  };

  const renderTokenSelector = () => (
    <View style={styles.tokenSelector}>
      <Text style={styles.sectionLabel}>Select Token</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tokenList}>
        {tokens.map((token) => (
          <TouchableOpacity
            key={token.symbol}
            style={[
              styles.tokenOption,
              selectedToken.symbol === token.symbol && styles.selectedTokenOption,
            ]}
            onPress={() => setSelectedToken(token)}
          >
            <Text style={styles.tokenIcon}>{token.icon}</Text>
            <Text style={styles.tokenSymbol}>{token.symbol}</Text>
            <Text style={styles.tokenBalance}>
              {balanceVisible ? `${token.balance.toFixed(2)}` : '••••••'}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAmountStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <ArrowDownToLine size={32} color="#1B4D3E" strokeWidth={2} />
        <Text style={styles.stepTitle}>Withdraw to Bank</Text>
        <Text style={styles.stepDescription}>
          Withdraw your digital currency to your bank account
        </Text>
      </View>

      {renderTokenSelector()}

      <View style={styles.amountSection}>
        <Text style={styles.sectionLabel}>Amount to Withdraw</Text>
        <View style={styles.amountInputContainer}>
          <TextInput
            style={styles.amountInput}
            value={amount}
            onChangeText={setAmount}
            placeholder="0.00"
            placeholderTextColor="#999999"
            keyboardType="numeric"
          />
          <Text style={styles.currencyLabel}>AED</Text>
        </View>
        
        <View style={styles.balanceInfo}>
          <Text style={styles.availableBalance}>
            Available: {balanceVisible ? `${selectedToken.balance.toFixed(2)} ${selectedToken.symbol}` : '••••••'}
          </Text>
          <TouchableOpacity
            style={styles.maxButton}
            onPress={() => setAmount(selectedToken.balance.toString())}
          >
            <Text style={styles.maxButtonText}>MAX</Text>
          </TouchableOpacity>
        </View>

        {amount && (
          <View style={styles.conversionInfo}>
            <Text style={styles.conversionText}>
              ≈ AED {(parseFloat(amount) * selectedToken.price).toFixed(2)}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.feeInfo}>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>Processing Fee</Text>
          <Text style={styles.feeValue}>AED 2.50</Text>
        </View>
        <View style={styles.feeRow}>
          <Text style={styles.feeLabel}>You'll Receive</Text>
          <Text style={styles.totalValue}>
            AED {amount ? (parseFloat(amount) * selectedToken.price - 2.50).toFixed(2) : '0.00'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderBankStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Building2 size={32} color="#1B4D3E" strokeWidth={2} />
        <Text style={styles.stepTitle}>Select Bank Account</Text>
        <Text style={styles.stepDescription}>
          Choose the bank account to receive your funds
        </Text>
      </View>

      <View style={styles.bankAccountsList}>
        {bankAccounts.map((account) => (
          <TouchableOpacity
            key={account.id}
            style={[
              styles.bankAccountOption,
              selectedBankAccount?.id === account.id && styles.selectedBankAccount,
            ]}
            onPress={() => setSelectedBankAccount(account)}
          >
            <View style={styles.bankAccountIcon}>
              <Building2 size={24} color="#1B4D3E" strokeWidth={2} />
            </View>
            
            <View style={styles.bankAccountDetails}>
              <Text style={styles.bankAccountName}>{account.name}</Text>
              <Text style={styles.bankName}>{account.bankName}</Text>
              <Text style={styles.accountNumber}>{account.accountNumber}</Text>
              {account.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Default</Text>
                </View>
              )}
            </View>
            
            {selectedBankAccount?.id === account.id && (
              <Check size={20} color="#22C55E" strokeWidth={2} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.addAccountButton}>
        <TouchableOpacity style={styles.addAccountTouchable}>
          <Text style={styles.addAccountText}>+ Add New Bank Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfirmStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Shield size={32} color="#1B4D3E" strokeWidth={2} />
        <Text style={styles.stepTitle}>Confirm Withdrawal</Text>
        <Text style={styles.stepDescription}>
          Please review your withdrawal details
        </Text>
      </View>

      <View style={styles.confirmationCard}>
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Amount</Text>
          <Text style={styles.confirmationValue}>
            {amount} {selectedToken.symbol}
          </Text>
        </View>
        
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Equivalent</Text>
          <Text style={styles.confirmationValue}>
            AED {(parseFloat(amount) * selectedToken.price).toFixed(2)}
          </Text>
        </View>
        
        <View style={styles.confirmationRow}>
          <Text style={styles.confirmationLabel}>Processing Fee</Text>
          <Text style={styles.confirmationValue}>AED 2.50</Text>
        </View>
        
        <View style={[styles.confirmationRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>You'll Receive</Text>
          <Text style={styles.totalAmount}>
            AED {(parseFloat(amount) * selectedToken.price - 2.50).toFixed(2)}
          </Text>
        </View>
      </View>

      <View style={styles.bankAccountSummary}>
        <Text style={styles.summaryLabel}>Destination Account</Text>
        <View style={styles.summaryCard}>
          <Building2 size={20} color="#1B4D3E" strokeWidth={2} />
          <View style={styles.summaryDetails}>
            <Text style={styles.summaryBankName}>{selectedBankAccount?.bankName}</Text>
            <Text style={styles.summaryAccountNumber}>{selectedBankAccount?.accountNumber}</Text>
          </View>
        </View>
      </View>

      <View style={styles.processingInfo}>
        <View style={styles.processingRow}>
          <Clock size={16} color="#666666" strokeWidth={2} />
          <Text style={styles.processingText}>
            Processing time: 1-2 business days
          </Text>
        </View>
        <View style={styles.processingRow}>
          <AlertCircle size={16} color="#F59E0B" strokeWidth={2} />
          <Text style={styles.processingText}>
            This transaction cannot be reversed once confirmed
          </Text>
        </View>
      </View>
    </View>
  );

  const getStepContent = () => {
    switch (step) {
      case 'amount':
        return renderAmountStep();
      case 'bank':
        return renderBankStep();
      case 'confirm':
        return renderConfirmStep();
      default:
        return renderAmountStep();
    }
  };

  const getButtonText = () => {
    switch (step) {
      case 'amount':
        return 'Continue';
      case 'bank':
        return 'Continue';
      case 'confirm':
        return 'Confirm Withdrawal';
      default:
        return 'Continue';
    }
  };

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
            <View style={styles.stepIndicator}>
              <View style={[styles.stepDot, step === 'amount' && styles.activeStepDot]} />
              <View style={[styles.stepDot, step === 'bank' && styles.activeStepDot]} />
              <View style={[styles.stepDot, step === 'confirm' && styles.activeStepDot]} />
            </View>
            
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <X size={24} color="#1B4D3E" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          {/* Content */}
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            {getStepContent()}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            {step !== 'amount' && (
              <TouchableOpacity style={styles.backButton} onPress={handlePrevious}>
                <Text style={styles.backButtonText}>Back</Text>
              </TouchableOpacity>
            )}
            
            <TouchableOpacity
              style={[
                styles.continueButton,
                step === 'amount' && styles.fullWidthButton,
              ]}
              onPress={handleNext}
            >
              <Text style={styles.continueButtonText}>{getButtonText()}</Text>
            </TouchableOpacity>
          </View>
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
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingTop: 20,
    maxHeight: '90%',
    minHeight: '60%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  stepIndicator: {
    flexDirection: 'row',
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
  },
  activeStepDot: {
    backgroundColor: '#1B4D3E',
    width: 24,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  stepContent: {
    paddingBottom: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  stepTitle: {
    fontSize: 24,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginTop: 16,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
  },
  tokenSelector: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  tokenList: {
    flexDirection: 'row',
  },
  tokenOption: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginRight: 12,
    alignItems: 'center',
    minWidth: 80,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedTokenOption: {
    backgroundColor: '#F0EADA',
    borderColor: '#1B4D3E',
  },
  tokenIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  tokenSymbol: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  tokenBalance: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  amountSection: {
    marginBottom: 24,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 2,
    borderColor: '#E5E7EB',
  },
  amountInput: {
    flex: 1,
    fontSize: 32,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  currencyLabel: {
    fontSize: 18,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  balanceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  availableBalance: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  maxButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  maxButtonText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  conversionInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  conversionText: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  feeInfo: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  feeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  feeValue: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  totalValue: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  bankAccountsList: {
    gap: 12,
    marginBottom: 24,
  },
  bankAccountOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedBankAccount: {
    backgroundColor: '#F0EADA',
    borderColor: '#1B4D3E',
  },
  bankAccountIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  bankAccountDetails: {
    flex: 1,
  },
  bankAccountName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  bankName: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 2,
  },
  accountNumber: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
  },
  defaultBadge: {
    backgroundColor: '#22C55E',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  defaultBadgeText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  addAccountButton: {
    alignItems: 'center',
  },
  addAccountTouchable: {
    paddingVertical: 12,
  },
  addAccountText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  confirmationCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    gap: 16,
  },
  confirmationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  confirmationLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  confirmationValue: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingTop: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  totalAmount: {
    fontSize: 18,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  bankAccountSummary: {
    marginBottom: 24,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  summaryCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    gap: 12,
  },
  summaryDetails: {
    flex: 1,
  },
  summaryBankName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  summaryAccountNumber: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  processingInfo: {
    gap: 12,
  },
  processingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  processingText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  footer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 20,
    gap: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0EADA',
  },
  backButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  backButtonText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
  },
  continueButton: {
    flex: 2,
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  fullWidthButton: {
    flex: 1,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
});