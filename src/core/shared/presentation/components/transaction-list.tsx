import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, Pressable, Modal, SectionList } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TransactionDetailsBox } from './transaction-details-box';
import { TransactionItem } from 'src/types/transaction';

interface TransactionListProps {
  transactions: TransactionItem[];
  onTransactionPress: (transaction: TransactionItem) => void;
}

export const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  onTransactionPress,
}) => {
  const [timeFrame, setTimeFrame] = useState('Last 3 Months');
  const [showPicker, setShowPicker] = useState(false);

  const timeFrameOptions = ['Last 3 Months', 'Last 6 Months', 'Last Year'];

  const groupTransactionsByDate = (transactions: TransactionItem[]) => {
    const grouped = transactions.reduce((acc, transaction) => {
      const date = new Date(transaction.date).toLocaleDateString('en-MY', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(transaction);
      return acc;
    }, {} as Record<string, TransactionItem[]>);

    return Object.entries(grouped).map(([title, data]) => ({ title, data }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transactions</Text>
        <Pressable onPress={() => setShowPicker(true)} style={styles.picker}>
          <Text style={styles.pickerText}>{timeFrame}</Text>
          <MaterialCommunityIcons name="chevron-down" size={24} color="#333" />
        </Pressable>
      </View>

      <Modal visible={showPicker} transparent animationType="fade">
        <Pressable style={styles.modalOverlay} onPress={() => setShowPicker(false)}>
          <View style={styles.modalView}>
            {timeFrameOptions.map((option) => (
              <Pressable
                key={option}
                style={[styles.option, option === timeFrame && styles.selectedOption]}
                onPress={() => {
                  setTimeFrame(option);
                  setShowPicker(false);
                }}
              >
                <Text style={[styles.optionText, option === timeFrame && styles.selectedOptionText]}>{option}</Text>
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>
      
      <SectionList
        sections={groupTransactionsByDate(transactions)}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionDetailsBox
            transaction={item}
            onPress={() => onTransactionPress(item)}
          />
        )}
        renderSectionHeader={({ section: { title } }) => (
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionHeaderText}>{title}</Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F8F8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  picker: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    backgroundColor: '#F8F8F8',
  },
  pickerText: {
    fontSize: 16,
    color: '#333',
    marginRight: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  selectedOption: {
    backgroundColor: '#F0F0F0',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  selectedOptionText: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  sectionHeader: {
    backgroundColor: '#F0F0F0',
    padding: 10,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
});