import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Dimensions } from 'react-native';
import DefaultNetworkImage from '@core/shared/presentation/components/default-network-image';
import { PATHS } from 'src/core/constant/Paths';
import { DrawerActions, NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from '@core/shared/types/navigation';
import { usePortfolioStore } from '../../zustand/portfolio-store';
import { BankPortfolio, portfolioData } from 'src/core/constant/Data';

const { width } = Dimensions.get('window');

interface Bank {
  id: string;
  name: string;
  imageURL: string;
}

interface ModalChooseBankProps {
  visible: boolean;
  onClose: () => void;
}

const banks: Bank[] = [
  {
    id: 'maybank',
    name: 'Maybank',
    imageURL: PATHS.maybankLogo
  },
  {
    id: 'cimb',
    name: 'CIMB',
    imageURL: PATHS.cimbLogo
  },
  {
    id: 'bankislam',
    name: 'Bank Islam',
    imageURL: PATHS.bankIslamLogo
  },
  {
    id: 'gxbank',
    name: 'GX Bank',
    imageURL: PATHS.gxBankLogo
  },
];

const ModalChooseBank: React.FC<ModalChooseBankProps> = ({ visible, onClose, }) => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const handleBankSelect = (bank: BankPortfolio) => {
    // onClose();
    // if (onSelectBank) {
    //   onSelectBank(bank);
    // } else {
    //   navigation.navigate('LoginPortfolio', { bank });
    // }
    onClose();
    navigation.navigate('LoginPortfolio', { bank });

  };

  const { portfolios } = usePortfolioStore();

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Add Portfolio</Text>
            <TouchableOpacity
              onPress={onClose}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.bankList}>
            <View style={styles.bankRow}>
              {portfolioData.portfolio.map((bank, index) => (
                <TouchableOpacity
                  key={bank.bankName}
                  style={styles.bankItem}
                  onPress={() => handleBankSelect(bank)}
                  activeOpacity={0.7}
                >
                  <View style={styles.bankIconContainer}>
                    <DefaultNetworkImage
                      uri={bank.imageURL}
                      height={70}
                      width={70}
                      borderRadius={16}
                    />
                  </View>
                  <Text style={styles.bankName}>{bank.bankName}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 24,
    paddingTop: 24,
    paddingBottom: 32,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 20,
    color: '#666',
  },
  bankList: {
    paddingHorizontal: 16,
  },
  bankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  bankItem: {
    width: (width - 48) / 2,
    aspectRatio: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 24,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bankIconContainer: {
    width: 90,
    height: 90,
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  bankName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
});

export default ModalChooseBank;
