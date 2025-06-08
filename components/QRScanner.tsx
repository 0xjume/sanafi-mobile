import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Pressable,
  Alert,
  Platform,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { X, QrCode, Flashlight, FlashlightOff } from 'lucide-react-native';

interface QRScannerProps {
  visible: boolean;
  onClose: () => void;
  onScan: (data: string) => void;
}

export function QRScanner({ visible, onClose, onScan }: QRScannerProps) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [flashEnabled, setFlashEnabled] = useState(false);

  useEffect(() => {
    if (visible) {
      setScanned(false);
    }
  }, [visible]);

  if (!permission) {
    return null;
  }

  if (!permission.granted) {
    return (
      <Modal visible={visible} animationType="slide" transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.permissionContainer}>
            <QrCode size={64} color="#1B4D3E" strokeWidth={2} />
            <Text style={styles.permissionTitle}>Camera Permission Required</Text>
            <Text style={styles.permissionText}>
              We need camera access to scan QR codes
            </Text>
            <View style={styles.permissionButtons}>
              <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.grantButton} onPress={requestPermission}>
                <Text style={styles.grantButtonText}>Grant Permission</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    if (!scanned) {
      setScanned(true);
      onScan(data);
      onClose();
    }
  };

  const toggleFlash = () => {
    setFlashEnabled(!flashEnabled);
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={false}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <X size={24} color="#FFFFFF" strokeWidth={2} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Scan QR Code</Text>
          <TouchableOpacity style={styles.flashButton} onPress={toggleFlash}>
            {flashEnabled ? (
              <FlashlightOff size={24} color="#FFFFFF" strokeWidth={2} />
            ) : (
              <Flashlight size={24} color="#FFFFFF" strokeWidth={2} />
            )}
          </TouchableOpacity>
        </View>

        {/* Camera View */}
        <View style={styles.cameraContainer}>
          <CameraView
            style={styles.camera}
            facing="back"
            onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
            enableTorch={flashEnabled}
            barcodeScannerSettings={{
              barcodeTypes: ['qr'],
            }}
          >
            {/* Scanning Overlay */}
            <View style={styles.scanningOverlay}>
              <View style={styles.scanningFrame}>
                <View style={[styles.corner, styles.topLeft]} />
                <View style={[styles.corner, styles.topRight]} />
                <View style={[styles.corner, styles.bottomLeft]} />
                <View style={[styles.corner, styles.bottomRight]} />
              </View>
            </View>
          </CameraView>
        </View>

        {/* Instructions */}
        <View style={styles.instructions}>
          <Text style={styles.instructionTitle}>Position QR code within the frame</Text>
          <Text style={styles.instructionText}>
            The QR code will be scanned automatically when detected
          </Text>
        </View>

        {/* Manual Input Option */}
        <TouchableOpacity
          style={styles.manualButton}
          onPress={() => {
            Alert.prompt(
              'Enter Address Manually',
              'Please enter the wallet address or payment code:',
              [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'OK',
                  onPress: (text) => {
                    if (text) {
                      onScan(text);
                      onClose();
                    }
                  },
                },
              ],
              'plain-text'
            );
          }}
        >
          <Text style={styles.manualButtonText}>Enter Address Manually</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  permissionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
  },
  permissionTitle: {
    fontSize: 20,
    color: '#1B4D3E',
    fontFamily: 'Poppins-Bold',
    marginTop: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  permissionText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  permissionButtons: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minHeight: 52,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#666666',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
  },
  grantButton: {
    flex: 1,
    backgroundColor: '#1B4D3E',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 52,
  },
  grantButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
    textAlign: 'center',
    lineHeight: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: Platform.OS === 'web' ? 20 : 50,
    paddingBottom: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
  },
  flashButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    margin: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  camera: {
    flex: 1,
  },
  scanningOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  scanningFrame: {
    width: 250,
    height: 250,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#FFFFFF',
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  instructions: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    alignItems: 'center',
  },
  instructionTitle: {
    fontSize: 18,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  instructionText: {
    fontSize: 14,
    color: '#CCCCCC',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 20,
  },
  manualButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginHorizontal: 20,
    marginBottom: Platform.OS === 'web' ? 20 : 40,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  manualButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
});