import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X, Check } from 'lucide-react-native';

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

export function FilterModal({ visible, onClose, selectedFilter, onFilterChange }: FilterModalProps) {
  const filters = [
    { key: 'all', label: 'All Transactions', description: 'Show all transaction types' },
    { key: 'sent', label: 'Sent', description: 'Outgoing transfers' },
    { key: 'received', label: 'Received', description: 'Incoming transfers' },
    { key: 'exchange', label: 'Exchanges', description: 'Token swaps and conversions' },
  ];

  const handleFilterSelect = (filter: string) => {
    onFilterChange(filter);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
          <View style={styles.header}>
            <Text style={styles.title}>Filter Transactions</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#1B4D3E" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.content}>
            {filters.map((filter) => (
              <TouchableOpacity
                key={filter.key}
                style={[
                  styles.filterOption,
                  selectedFilter === filter.key && styles.selectedOption
                ]}
                onPress={() => handleFilterSelect(filter.key)}
              >
                <View style={styles.filterContent}>
                  <Text style={[
                    styles.filterLabel,
                    selectedFilter === filter.key && styles.selectedLabel
                  ]}>
                    {filter.label}
                  </Text>
                  <Text style={[
                    styles.filterDescription,
                    selectedFilter === filter.key && styles.selectedDescription
                  ]}>
                    {filter.description}
                  </Text>
                </View>
                {selectedFilter === filter.key && (
                  <Check size={20} color="#1B4D3E" strokeWidth={2} />
                )}
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.applyButton} onPress={onClose}>
            <Text style={styles.applyButtonText}>Apply Filter</Text>
          </TouchableOpacity>
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    maxHeight: '80%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
  },
  closeButton: {
    padding: 4,
  },
  content: {
    marginBottom: 24,
  },
  filterOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    backgroundColor: '#F8F9FA',
  },
  selectedOption: {
    backgroundColor: '#F0EADA',
    borderWidth: 2,
    borderColor: '#1B4D3E',
  },
  filterContent: {
    flex: 1,
  },
  filterLabel: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 2,
  },
  selectedLabel: {
    color: '#1B4D3E',
  },
  filterDescription: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  selectedDescription: {
    color: '#1B4D3E',
  },
  applyButton: {
    backgroundColor: '#1B4D3E',
    borderRadius: 24,
    padding: 16,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
  },
});