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
import { X, Plus, Building2, CreditCard, Check, CircleAlert as AlertCircle, Clock, Shield, Smartphone, Banknote } from 'lucide-react-native';
import { Token } from '@/data/mockData';

interface PaymentMethod {
  id: string;
  type: 'bank' | 'card' | 'wallet' | 'cash';
  name: string;
  details: string;
  icon: React.ReactNode;
  isDefault: boolean;
  processingTime: string;
  fee: number;
}

interface AddFundsModalProps {
  visible: boolean;
  onClose: () => void;
  onAddFunds: (amount: number, token: string, paymentMethod: string) => void;
  tokens: Token[];
  balanceVisible: boolean;
}

export function AddFundsModal({ visible, onClose, onAddFunds, tokens, balanceVisible }: AddFundsModalProps) {
  const [selectedToken, setSelectedToken] = useState(tokens[0]);
  const [amount, setAmount] = useState('');
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [step, setStep] = useState<'amount' | 'method' | 'confirm'>('amount');

  const paymentMethods: PaymentMethod[] = [
    {
      id: '1',
      type: 'bank',
      name: 'Emirates NBD Bank Transfer',
      details: 'Current Account ****1234',
      icon: <Building2 size={24} color="#1B4D3E" strokeWidth={2} />,
      isDefault: true,
      processingTime: '1-2 business days',
      fee: 0,
    },
    {
      id: '2',
      type: 'card',
      name: 'Visa Debit Card',
      details: '**** **** **** 5678',
      icon: <CreditCard size={24} color="#1B4D3E" strokeWidth={2} />,
      isDefault: false,
      processingTime: 'Instant',
      fee: 2.5,
    },
    {
      id: '3',
      type: 'wallet',
      name: 'Apple Pay',
      details: 'iPhone Wallet',
      icon: <Smartphone size={24} color="#1B4D3E" strokeWidth={2} />,
      isDefault: false,
      processingTime: 'Instant',
      fee: 1.5,
    },
    {
      id: '4',
      type: 'cash',
      name: 'Cash Deposit',
      details: 'At Sanafi Partner Locations',
      icon: <Banknote size={24} color="#1B4D3E" strokeWidth={2} />,
      isDefault: false,
      processingTime: 'Instant',
      fee: 5.0,
    },
  ];

  const resetModal = () => {
    setStep('amount');
    setAmount('');
    setSelectedPaymentMethod(paymentMethods.find(method => method.isDefault) || paymentMethods[0]);
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
      if (parseFloat(amount) < 10) {
        Alert.alert('Error', 'Minimum amount is AED 10');
        return;
      }
      if (parseFloat(amount) > 50000) {
        Alert.alert('Error', 'Maximum amount is AED 50,000 per transaction');
        return;
      }
      setStep('method');
    } else if (step === 'method') {
      if (!selectedPaymentMethod) {
        Alert.alert('Error', 'Please select a payment method');
        return;
      }
      setStep('confirm');
    } else if (step === 'confirm') {
      onAddFunds(parseFloat(amount), selectedToken.symbol, selectedPaymentMethod!.name);
      handleClose();
    }
  };

  const handlePrevious = () => {
    if (step === 'method') {
      setStep('amount');
    } else if (step === 'confirm') {
      setStep('method');
    }
  };

  const renderTokenSelector = () => (
    <View style={styles.tokenSelector}>
      <Text style={styles.sectionLabel}>Select Token to Add</Text>
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
            <Text style={styles.tokenName}>{token.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderAmountStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <Plus size={32} color="#1B4D3E" strokeWidth={2} />
        <Text style={styles.stepTitle}>Add Funds</Text>
        <Text style={styles.stepDescription}>
          Add money to your digital wallet from various sources
        </Text>
      </View>

      {renderTokenSelector()}

      <View style={styles.amountSection}>
        <Text style={styles.sectionLabel}>Amount to Add</Text>
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
        
        <View style={styles.amountLimits}>
          <Text style={styles.limitText}>Min: AED 10 • Max: AED 50,000</Text>
        </View>

        {/* Quick Amount Buttons */}
        <View style={styles.quickAmounts}>
          <Text style={styles.quickAmountsLabel}>Quick amounts:</Text>
          <View style={styles.quickAmountButtons}>
            {[100, 500, 1000, 2500].map((quickAmount) => (
              <TouchableOpacity
                key={quickAmount}
                style={styles.quickAmountButton}
                onPress={() => setAmount(quickAmount.toString())}
              >
                <Text style={styles.quickAmountText}>AED {quickAmount}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {amount && (
          <View style={styles.conversionInfo}>
            <Text style={styles.conversionText}>
              You'll receive: {(parseFloat(amount) / selectedToken.price).toFixed(4)} {selectedToken.symbol}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.benefitsInfo}>
        <Text style={styles.benefitsTitle}>Why Add Funds?</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>⚡</Text>
            <Text style={styles.benefitText}>Instant transactions</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>🔒</Text>
            <Text style={styles.benefitText}>Secure & encrypted</Text>
          </View>
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>💰</Text>
            <Text style={styles.benefitText}>Earn rewards on spending</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMethodStep = () => (
    <View style={styles.stepContent}>
      <View style={styles.stepHeader}>
        <CreditCard size={32} color="#1B4D3E" strokeWidth={2} />
        <Text style={styles.stepTitle}>Payment Method</Text>
        <Text style={styles.stepDescription}>
          Choose how you'd like to add funds to your wallet
        </Text>
      </View>

      <View style={styles.paymentMethodsList}>
        {paymentMethods.map((method) => (
          <TouchableOpacity
            key={method.id}
            style={[
              styles.paymentMethodOption,
              selectedPaymentMethod?.id === method.id && styles.selectedPaymentMethod,
            ]}
            onPress={() => setSelectedPaymentMethod(method)}
          >
            <View style={styles.paymentMethodIcon}>
              {method.icon}
            </View>
            
            <View style={styles.paymentMethodDetails}>
              <Text style={styles.paymentMethodName}>{method.name}</Text>
              <Text style={styles.paymentMethodInfo}>{method.details}</Text>
              <View style={styles.paymentMethodMeta}>
                <Text style={styles.processingTime}>{method.processingTime}</Text>
                <Text style={styles.methodFee}>
                  {method.fee === 0 ? 'No fee' : `AED ${method.fee.toFixed(2)} fee`}
                </Text>
              </View>
              {method.isDefault && (
                <View style={styles.defaultBadge}>
                  <Text style={styles.defaultBadgeText}>Recommended</Text>
                </View>
              )}
            </View>
            
            {selectedPaymentMethod?.id === method.id && (
              <Check size={20} color="#22C55E" strokeWidth={2} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.addMethodButton}>
        <TouchableOpacity style={styles.addMethodTouchable}>
          <Text style={styles.addMethodText}>+ Add New Payment Method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderConfirmStep = () => {
    const totalAmount = parseFloat(amount) + (selectedPaymentMethod?.fee || 0);
    const tokensToReceive = parseFloat(amount) / selectedToken.price;

    return (
      <View style={styles.stepContent}>
        <View style={styles.stepHeader}>
          <Shield size={32} color="#1B4D3E" strokeWidth={2} />
          <Text style={styles.stepTitle}>Confirm Add Funds</Text>
          <Text style={styles.stepDescription}>
            Please review your transaction details
          </Text>
        </View>

        <View style={styles.confirmationCard}>
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Amount</Text>
            <Text style={styles.confirmationValue}>AED {amount}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>Token</Text>
            <Text style={styles.confirmationValue}>{selectedToken.symbol}</Text>
          </View>
          
          <View style={styles.confirmationRow}>
            <Text style={styles.confirmationLabel}>You'll Receive</Text>
            <Text style={styles.confirmationValue}>
              {tokensToReceive.toFixed(4)} {selectedToken.symbol}
            </Text>
          </View>
          
          {selectedPaymentMethod?.fee && selectedPaymentMethod.fee > 0 && (
            <View style={styles.confirmationRow}>
              <Text style={styles.confirmationLabel}>Processing Fee</Text>
              <Text style={styles.confirmationValue}>AED {selectedPaymentMethod.fee.toFixed(2)}</Text>
            </View>
          )}
          
          <View style={[styles.confirmationRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total to Pay</Text>
            <Text style={styles.totalAmount}>AED {totalAmount.toFixed(2)}</Text>
          </View>
        </View>

        <View style={styles.paymentMethodSummary}>
          <Text style={styles.summaryLabel}>Payment Method</Text>
          <View style={styles.summaryCard}>
            {selectedPaymentMethod?.icon}
            <View style={styles.summaryDetails}>
              <Text style={styles.summaryMethodName}>{selectedPaymentMethod?.name}</Text>
              <Text style={styles.summaryMethodDetails}>{selectedPaymentMethod?.details}</Text>
            </View>
          </View>
        </View>

        <View style={styles.processingInfo}>
          <View style={styles.processingRow}>
            <Clock size={16} color="#666666" strokeWidth={2} />
            <Text style={styles.processingText}>
              Processing time: {selectedPaymentMethod?.processingTime}
            </Text>
          </View>
          <View style={styles.processingRow}>
            <Shield size={16} color="#22C55E" strokeWidth={2} />
            <Text style={styles.processingText}>
              Your transaction is secured with bank-level encryption
            </Text>
          </View>
          {selectedPaymentMethod?.type === 'bank' && (
            <View style={styles.processingRow}>
              <AlertCircle size={16} color="#F59E0B" strokeWidth={2} />
              <Text style={styles.processingText}>
                Bank transfers may take 1-2 business days to process
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const getStepContent = () => {
    switch (step) {
      case 'amount':
        return renderAmountStep();
      case 'method':
        return renderMethodStep();
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
      case 'method':
        return 'Continue';
      case 'confirm':
        return 'Confirm Add Funds';
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
              <View style={[styles.stepDot, step === 'method' && styles.activeStepDot]} />
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
    minWidth: 100,
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
  tokenName: {
    fontSize: 10,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
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
  amountLimits: {
    alignItems: 'center',
    marginTop: 8,
  },
  limitText: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  quickAmounts: {
    marginTop: 16,
  },
  quickAmountsLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 8,
  },
  quickAmountButtons: {
    flexDirection: 'row',
    gap: 8,
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
  conversionInfo: {
    alignItems: 'center',
    marginTop: 16,
    backgroundColor: '#F0EADA',
    borderRadius: 12,
    padding: 12,
  },
  conversionText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  benefitsInfo: {
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
  },
  benefitsTitle: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
  },
  benefitsList: {
    gap: 8,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  benefitIcon: {
    fontSize: 16,
  },
  benefitText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  paymentMethodsList: {
    gap: 12,
    marginBottom: 24,
  },
  paymentMethodOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedPaymentMethod: {
    backgroundColor: '#F0EADA',
    borderColor: '#1B4D3E',
  },
  paymentMethodIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  paymentMethodDetails: {
    flex: 1,
  },
  paymentMethodName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  paymentMethodInfo: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  paymentMethodMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  processingTime: {
    fontSize: 12,
    color: '#22C55E',
    fontFamily: 'Poppins-SemiBold',
  },
  methodFee: {
    fontSize: 12,
    color: '#666666',
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
  addMethodButton: {
    alignItems: 'center',
  },
  addMethodTouchable: {
    paddingVertical: 12,
  },
  addMethodText: {
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
  paymentMethodSummary: {
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
  summaryMethodName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  summaryMethodDetails: {
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