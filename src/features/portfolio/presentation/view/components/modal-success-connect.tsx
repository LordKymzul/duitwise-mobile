import React from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DefaultButton from '@core/shared/presentation/components/default-button';

interface ModalSuccessConnectProps {
  visible: boolean;
  onClose: () => void;
  bankName: string;
}

const { width } = Dimensions.get('window');

const ModalSuccessConnect: React.FC<ModalSuccessConnectProps> = ({ 
  visible, 
  onClose,
  bankName 
}) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Ionicons name="checkmark-circle" size={80} color="#29C445" />
          </View>
          
          <Text style={styles.title}>Successfully Connected!</Text>
          <Text style={styles.subtitle}>
            Your account has been successfully connected to Duitwise
          </Text>

          <DefaultButton
            title="Done"
            onPress={onClose}
            isPrimary={true}
            color="#29C445"
            style={styles.button}
          />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 24,
    width: width - 48,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 24,
  },
  button: {
    width: '100%',
    height: 56,
    borderRadius: 12,
  },
});

export default ModalSuccessConnect;
