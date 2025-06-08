import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { Fingerprint, X, CheckCircle } from 'lucide-react-native';

interface BiometricAuthProps {
  visible: boolean;
  onSuccess: () => void;
  onCancel: () => void;
  amount: string;
  token: string;
  recipient: string;
}

export function BiometricAuth({ visible, onSuccess, onCancel, amount, token, recipient }: BiometricAuthProps) {
  const [authStatus, setAuthStatus] = React.useState<'waiting' | 'success' | 'error'>('waiting');

  useEffect(() => {
    if (visible) {
      setAuthStatus('waiting');
      // Simulate biometric authentication
      const timer = setTimeout(() => {
        setAuthStatus('success');
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [visible, onSuccess]);

  const getStatusIcon = () => {
    switch (authStatus) {
      case 'waiting':
        return <Fingerprint size={64} color="#1B4D3E" strokeWidth={1.5} />;
      case 'success':
        return <CheckCircle size={64} color="#22C55E" strokeWidth={1.5} />;
      case 'error':
        return <X size={64} color="#EF4444" strokeWidth={1.5} />;
    }
  };

  const getStatusText = () => {
    switch (authStatus) {
      case 'waiting':
        return 'Touch the fingerprint sensor';
      case 'success':
        return 'Authentication successful';
      case 'error':
        return 'Authentication failed';
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onCancel}
    >
      <Pressable style={styles.overlay} onPress={onCancel}>
        <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
          <TouchableOpacity style={styles.closeButton} onPress={onCancel}>
            <X size={24} color="#666666" strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              {getStatusIcon()}
            </View>

            <Text style={styles.title}>Confirm Transaction</Text>
            <Text style={styles.subtitle}>{getStatusText()}</Text>

            <View style={styles.transactionDetails}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>{amount} {token}</Text>
              
              <Text style={styles.detailLabel}>To:</Text>
              <Text style={styles.detailValue}>{recipient}</Text>
            </View>

            {authStatus === 'error' && (
              <TouchableOpacity style={styles.retryButton}>
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            )}
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    margin: 20,
    width: '90%',
    maxWidth: 400,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
    textAlign: 'center',
  },
  transactionDetails: {
    width: '100%',
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 24,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  retryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});