import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Pressable, Image } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import { Token } from '@/data/mockData';

interface TokenSelectorProps {
  selectedToken: Token;
  onTokenSelect: (token: Token) => void;
  tokens: Token[];
}

export function TokenSelector({ selectedToken, onTokenSelect, tokens }: TokenSelectorProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const handleTokenSelect = (token: Token) => {
    onTokenSelect(token);
    setModalVisible(false);
  };

  const renderIcon = (token: Token, size: number = 24) => {
    if (token.icon.startsWith('http')) {
      return (
        <Image 
          source={{ uri: token.icon }} 
          style={[styles.iconImage, { width: size, height: size, borderRadius: size / 2 }]}
          resizeMode="cover"
        />
      );
    }
    return <Text style={[styles.tokenIcon, { fontSize: size }]}>{token.icon}</Text>;
  };

  const renderTokenItem = ({ item }: { item: Token }) => (
    <TouchableOpacity
      style={[
        styles.tokenItem,
        selectedToken.symbol === item.symbol && styles.selectedTokenItem
      ]}
      onPress={() => handleTokenSelect(item)}
    >
      <View style={styles.tokenInfo}>
        <View style={styles.tokenIconContainer}>
          {renderIcon(item, 32)}
        </View>
        <View style={styles.tokenDetails}>
          <Text style={styles.tokenName}>{item.name}</Text>
          <Text style={styles.tokenSymbol}>{item.symbol}</Text>
          <Text style={styles.tokenBalance}>
            Available: {item.balance.toFixed(2)} {item.symbol}
          </Text>
        </View>
      </View>
      {selectedToken.symbol === item.symbol && (
        <Check size={20} color="#1B4D3E" strokeWidth={2} />
      )}
    </TouchableOpacity>
  );

  return (
    <>
      <TouchableOpacity style={styles.selector} onPress={() => setModalVisible(true)}>
        <View style={styles.selectedToken}>
          <View style={styles.selectedIconContainer}>
            {renderIcon(selectedToken, 24)}
          </View>
          <View style={styles.selectedDetails}>
            <Text style={styles.selectedName}>{selectedToken.name}</Text>
            <Text style={styles.selectedSymbol}>{selectedToken.symbol}</Text>
          </View>
        </View>
        <ChevronDown size={20} color="#1B4D3E" strokeWidth={2} />
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modal} onPress={e => e.stopPropagation()}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Token</Text>
            </View>
            
            <FlatList
              data={tokens}
              keyExtractor={(item) => item.symbol}
              renderItem={renderTokenItem}
              style={styles.tokenList}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  selector: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selectedToken: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedIconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  iconImage: {
    borderRadius: 12,
  },
  selectedDetails: {
    flex: 1,
  },
  selectedName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  selectedSymbol: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
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
    maxHeight: '80%',
  },
  modalHeader: {
    paddingHorizontal: 20,
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0EADA',
  },
  modalTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  tokenList: {
    paddingHorizontal: 20,
  },
  tokenItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginVertical: 4,
  },
  selectedTokenItem: {
    backgroundColor: '#F0EADA',
  },
  tokenInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tokenIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tokenIcon: {
    fontSize: 24,
  },
  tokenDetails: {
    flex: 1,
  },
  tokenName: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  tokenSymbol: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
  },
  tokenBalance: {
    fontSize: 12,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    marginTop: 2,
  },
});