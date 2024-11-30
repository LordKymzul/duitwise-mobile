import React, { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { TransactionList } from '@core/shared/presentation/components/transaction-list';
import { TransactionItem } from 'src/types/transaction';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
  Ionicons
} from "@expo/vector-icons";
import DefaultGoBackButton from 'src/core/shared/presentation/components/default-goback-button';

type RootStackParamList = {
  Transactions: undefined;
  TransactionDetails: { transaction: TransactionItem };
};

type TransactionScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Transactions'>;




const sampleTransactions: TransactionItem[] = [
  {
    id: 1,
    merchantName: 'Machine Iphone 11',
    amount: 2498,
    date: '2024-03-27'
  },
  {
    id: 2,
    merchantName: 'UMobile SDN BHD',
    amount: 38,
    date: '2024-03-26'
  },
  {
    id: 3,
    merchantName: 'Decathlon',
    amount: 207.8,
    date: '2024-03-25'
  },
  {
    id: 4,
    merchantName: 'Netflix',
    amount: 49.9,
    date: '2024-03-24'
  },
];

export const TransactionScreen: React.FC = () => {
  const navigation = useNavigation<TransactionScreenNavigationProp>();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => <DefaultGoBackButton onPress={() => navigation.goBack()} />
    });
  }, []);

  const handleTransactionPress = (transaction: TransactionItem) => {
    navigation.navigate('TransactionDetails', { transaction });
  };

  return (
    <View style={styles.container}>
      <TransactionList
        transactions={sampleTransactions}
        onTransactionPress={handleTransactionPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});