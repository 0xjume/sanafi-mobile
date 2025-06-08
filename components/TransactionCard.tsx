import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, RefreshCw, Copy } from 'lucide-react-native';
import { Transaction } from '@/data/mockData';

interface TransactionCardProps {
  transaction: Transaction;
}

export function TransactionCard({ transaction }: TransactionCardProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'sent':
        return <ArrowUpRight size={24} color="#EF4444" strokeWidth={2} />;
      case 'received':
        return <ArrowDownLeft size={24} color="#22C55E" strokeWidth={2} />;
      case 'exchange':
        return <RefreshCw size={24} color="#3B82F6" strokeWidth={2} />;
    }
  };

  const getTitle = () => {
    switch (transaction.type) {
      case 'sent':
        return `Sent to ${transaction.recipient}`;
      case 'received':
        return `Received from ${transaction.sender}`;
      case 'exchange':
        return 'Token Exchange';
    }
  };

  const getAmountColor = () => {
    switch (transaction.type) {
      case 'sent':
        return '#EF4444';
      case 'received':
        return '#22C55E';
      case 'exchange':
        return '#1B4D3E';
    }
  };

  const getAmountPrefix = () => {
    switch (transaction.type) {
      case 'sent':
        return '-';
      case 'received':
        return '+';
      case 'exchange':
        return '';
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          {getIcon()}
        </View>
        
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{getTitle()}</Text>
          <Text style={styles.date}>
            {transaction.timestamp.toLocaleDateString('en-AE', {
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })} at {transaction.timestamp.toLocaleTimeString('en-AE', {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
        
        <View style={styles.amountContainer}>
          <Text style={[styles.amount, { color: getAmountColor() }]}>
            {getAmountPrefix()}{transaction.amount.toFixed(2)} {transaction.token}
          </Text>
          <View style={[styles.statusBadge, {
            backgroundColor: transaction.status === 'completed' ? '#22C55E' : 
                           transaction.status === 'pending' ? '#F59E0B' : '#EF4444'
          }]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>

      {transaction.hash && (
        <View style={styles.details}>
          <View style={styles.hashContainer}>
            <Text style={styles.hashLabel}>Transaction Hash:</Text>
            <View style={styles.hashRow}>
              <Text style={styles.hash}>{transaction.hash}</Text>
              <TouchableOpacity style={styles.copyButton}>
                <Copy size={16} color="#1B4D3E" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>
          
          {transaction.fee && (
            <View style={styles.feeContainer}>
              <Text style={styles.feeLabel}>Network Fee:</Text>
              <Text style={styles.fee}>{transaction.fee.toFixed(2)} {transaction.token}</Text>
            </View>
          )}
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  date: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  details: {
    borderTopWidth: 1,
    borderTopColor: '#F0EADA',
    paddingTop: 16,
  },
  hashContainer: {
    marginBottom: 12,
  },
  hashLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginBottom: 4,
  },
  hashRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hash: {
    fontSize: 14,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  copyButton: {
    padding: 4,
  },
  feeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  feeLabel: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  fee: {
    fontSize: 12,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
});