import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { User } from 'lucide-react-native';
import { mockContacts } from '@/data/mockData';

interface ContactsListProps {
  onContactSelect: (address: string) => void;
}

export function ContactsList({ onContactSelect }: ContactsListProps) {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {mockContacts.map((contact) => (
          <TouchableOpacity
            key={contact.id}
            style={styles.contactItem}
            onPress={() => onContactSelect(contact.address)}
          >
            <View style={styles.avatar}>
              <User size={20} color="#1B4D3E" strokeWidth={2} />
            </View>
            <Text style={styles.contactName}>{contact.name}</Text>
            <Text style={styles.contactAddress}>{contact.address}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 120,
  },
  contactItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    alignItems: 'center',
    width: 100,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0EADA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  contactName: {
    fontSize: 12,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    marginBottom: 4,
  },
  contactAddress: {
    fontSize: 10,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
});