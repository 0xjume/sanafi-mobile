import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ArrowUpRight, ArrowDownLeft, RefreshCw } from 'lucide-react-native';
import { Transaction } from '@/data/mockData';

interface RecentTransactionCardProps {
  transaction: Transaction;
}

export function RecentTransactionCard({ transaction }: RecentTransactionCardProps) {
  const getIcon = () => {
    switch (transaction.type) {
      case 'sent':
        return <ArrowUpRight size={20} color="#EF4444" strokeWidth={2} />;
      case 'received':
        return <ArrowDownLeft size={20} color="#22C55E" strokeWidth={2} />;
      case 'exchange':
        return <RefreshCw size={20} color="#3B82F6" strokeWidth={2} />;
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
      <View style={styles.iconContainer}>
        {getIcon()}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.title}>{getTitle()}</Text>
        <View style={styles.details}>
          <Text style={styles.time}>
            {transaction.timestamp.toLocaleTimeString('en-AE', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </Text>
          <View style={[styles.statusBadge, {
            backgroundColor: transaction.status === 'completed' ? '#22C55E' : 
                           transaction.status === 'pending' ? '#F59E0B' : '#EF4444'
          }]}>
            <Text style={styles.statusText}>{transaction.status}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.amountContainer}>
        <Text style={[styles.amount, { color: getAmountColor() }]}>
          {getAmountPrefix()}{transaction.amount.toFixed(2)} {transaction.token}
        </Text>
        {transaction.fee && (
          <Text style={styles.fee}>Fee: {transaction.fee.toFixed(2)}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 4,
  },
  details: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  time: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    textTransform: 'capitalize',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    marginBottom: 2,
  },
  fee: {
    fontSize: 10,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
});