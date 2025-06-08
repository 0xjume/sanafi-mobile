import React from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, Pressable } from 'react-native';
import { X, TriangleAlert as AlertTriangle, ArrowRight } from 'lucide-react-native';

interface SkipKYCModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export function SkipKYCModal({ visible, onConfirm, onCancel }: SkipKYCModalProps) {
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
            <X size={20} color="#666666" strokeWidth={2} />
          </TouchableOpacity>

          <View style={styles.content}>
            <View style={styles.iconContainer}>
              <AlertTriangle size={48} color="#F59E0B" strokeWidth={2} />
            </View>

            <Text style={styles.title}>Skip KYC Verification?</Text>
            
            <Text style={styles.description}>
              You can complete your verification later in Settings. However, some features may be limited until verification is complete.
            </Text>

            <View style={styles.limitationsList}>
              <View style={styles.limitationItem}>
                <View style={styles.bullet}>
                  <Text style={styles.bulletText}>•</Text>
                </View>
                <Text style={styles.limitationText}>Lower transaction limits</Text>
              </View>
              <View style={styles.limitationItem}>
                <View style={styles.bullet}>
                  <Text style={styles.bulletText}>•</Text>
                </View>
                <Text style={styles.limitationText}>Restricted international transfers</Text>
              </View>
              <View style={styles.limitationItem}>
                <View style={styles.bullet}>
                  <Text style={styles.bulletText}>•</Text>
                </View>
                <Text style={styles.limitationText}>Limited access to premium features</Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
                <Text style={styles.cancelButtonText}>Continue KYC</Text>
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.confirmButton} onPress={onConfirm}>
                <Text style={styles.confirmButtonText}>Skip for Now</Text>
                <ArrowRight size={16} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>

            <Text style={styles.footerText}>
              You can always complete verification later in your account settings.
            </Text>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 4,
    marginBottom: 8,
  },
  content: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 24,
  },
  limitationsList: {
    width: '100%',
    marginBottom: 32,
  },
  limitationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  bullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#F59E0B',
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bulletText: {
    fontSize: 12,
    color: '#F59E0B',
    fontFamily: 'Poppins-Bold',
    textAlign: 'center',
  },
  limitationText: {
    fontSize: 14,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    marginBottom: 16,
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#1B4D3E',
    fontFamily: 'Poppins-SemiBold',
  },
  confirmButton: {
    flex: 1,
    backgroundColor: '#F59E0B',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  confirmButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 18,
  },
});