import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Filter, Download, Search } from 'lucide-react-native';
import { TransactionCard } from '@/components/TransactionCard';
import { FilterModal } from '@/components/FilterModal';
import { mockTransactions } from '@/data/mockData';

export default function ActivityScreen() {
  const [filterVisible, setFilterVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filteredTransactions, setFilteredTransactions] = useState(mockTransactions);

  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'all') {
      setFilteredTransactions(mockTransactions);
    } else {
      setFilteredTransactions(mockTransactions.filter(tx => tx.type === filter));
    }
  };

  const getFilterDisplayName = (filter: string) => {
    const filterNames: { [key: string]: string } = {
      all: 'All Transactions',
      sent: 'Sent',
      received: 'Received',
      exchange: 'Exchanges',
    };
    return filterNames[filter] || 'All Transactions';
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Search size={20} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerButton}
            onPress={() => setFilterVisible(true)}
          >
            <Filter size={20} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Download size={20} color="#1B4D3E" strokeWidth={2} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Filter Summary */}
      <View style={styles.filterSummary}>
        <Text style={styles.filterText}>
          Showing {getFilterDisplayName(selectedFilter)} ({filteredTransactions.length})
        </Text>
      </View>

      {/* Transaction List */}
      <FlatList
        data={filteredTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TransactionCard transaction={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />

      {/* Filter Modal */}
      <FilterModal
        visible={filterVisible}
        onClose={() => setFilterVisible(false)}
        selectedFilter={selectedFilter}
        onFilterChange={handleFilterChange}
      />
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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
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
  filterSummary: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  filterText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  separator: {
    height: 12,
  },
});