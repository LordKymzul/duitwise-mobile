import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionItem } from '../../../../types/transaction';

interface TransactionDetailsBoxProps {
  transaction: TransactionItem;
  onPress: () => void;
}

export const TransactionDetailsBox: React.FC<TransactionDetailsBoxProps> = ({
  transaction,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons name="shopping" size={24} color="#666" />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.merchantName}>{transaction.merchantName}</Text>
        <Text style={styles.category}>Shopping</Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={styles.amount}>
          -RM {transaction.amount.toFixed(2)}
        </Text>
        <MaterialCommunityIcons name="chevron-right" size={20} color="#666" />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  category: {
    fontSize: 14,
    color: '#666',
  },
  rightContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF3B30',
    marginBottom: 4,
  },
});
