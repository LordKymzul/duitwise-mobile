import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { TransactionItem } from 'src/types/transaction';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Share } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { ReceiptAttachedEntity, RootStackParams, TransactionDetailsScreenRouteProp } from 'src/core/shared/types/navigation';
import DefaultGoBackButton from 'src/core/shared/presentation/components/default-goback-button';
import Toast from 'react-native-toast-message';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { analyzeReceipt } from '../../zustand/receipt-attach-store';
import * as FileSystem from 'expo-file-system';


export const TransactionDetailsScreen = () => {
  const route = useRoute<TransactionDetailsScreenRouteProp>();
  const { transaction } = route.params;
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const [isLoading, setIsLoading] = useState(false);


  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Transaction Details",
      headerLeft: () => <DefaultGoBackButton onPress={() => navigation.goBack()} />,
      headerRight: () => <TouchableOpacity
        style={styles.shareButton}
        onPress={handleShare}
      >
        <Ionicons name="share-outline" size={24} color="#333" />
      </TouchableOpacity>

    });
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-MY', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };


  const handleShare = async () => {
    try {
      const message = `
Transaction Details:
Amount: RM ${transaction.amount.toFixed(2)}
Date: ${formatDate(transaction.date)}
Merchant: ${transaction.merchantName}
Reference: 12138173128312
      `.trim();

      await Share.share({
        message,
        title: 'Transaction Details',
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleAttachReceipt = async () => {
    setIsLoading(true);
    try {
      // Request permissions
      const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

      console.log(permissionResult);

      if (!permissionResult.granted) {
        alert('Permission to access camera roll is required!');
        return;
      }

      // Launch image picker
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {




        const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: FileSystem.EncodingType.Base64 });



        const response = await analyzeReceipt(base64, "AIzaSyDiEuFsPIya8em34GDtytDYXsOC1aJ48h8");



        console.log('Response', response);

        const receiptAttached: ReceiptAttachedEntity = {
          receiptImage: result.assets[0].uri,
          receiptName: response.receiptName,
          price: response.price,
          date: response.date
        }

        navigation.navigate("ReceiptAttached", {
          receipt: receiptAttached
        });


        Toast.show({
          text1: "Success",
          text2: "Receipt attached successfully!",
          type: "success"
        });
      }
    } catch (error) {
      console.error('Error attaching receipt:', error);
      alert('Failed to attach receipt. Please try again.' + error);
      Toast.show({
        text1: "Failed to attach receipt. Please try again.",
        text2: error instanceof Error ? error.message : String(error),
        type: "error"
      });
    } finally {

      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView bounces={false}>


        {/* Amount Card */}
        <LinearGradient
          colors={['#4CAF50', '#45a049']}
          style={styles.amountCard}
        >
          <Text style={styles.amountLabel}>Amount</Text>
          <Text style={styles.amount}>-RM {transaction.amount.toFixed(2)}</Text>
          <Text style={styles.date}>{formatDate(transaction.date)}</Text>
          <View style={styles.statusChip}>
            <MaterialCommunityIcons name="check-circle" size={16} color="#fff" />
            <Text style={styles.statusText}>Successful</Text>
          </View>
        </LinearGradient>

        {/* Details Section */}
        <View style={styles.detailsCard}>
          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="identifier" size={20} color="#666" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>Transaction Reference</Text>
              <Text style={styles.detailValue}>12138173128312</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="bank" size={20} color="#666" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>From</Text>
              <Text style={styles.detailValue}>Maybank PSVR</Text>
            </View>
          </View>

          <View style={styles.detailRow}>
            <View style={styles.detailIconContainer}>
              <MaterialCommunityIcons name="store" size={20} color="#666" />
            </View>
            <View style={styles.detailContent}>
              <Text style={styles.detailLabel}>To</Text>
              <Text style={styles.detailValue}>{transaction.merchantName}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        {
          isLoading ? <ActivityIndicator size="large" color="#4CAF50" /> : (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.attachButton}
                onPress={handleAttachReceipt}
              >
                <MaterialCommunityIcons name="attachment" size={24} color="#fff" />
                <Text style={styles.attachButtonText}>Attach Receipt</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.reportButton}>
                <MaterialCommunityIcons name="flag-outline" size={24} color="#666" />
                <Text style={styles.reportButtonText}>Report Issue</Text>
              </TouchableOpacity>
            </View>
          )
        }
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: 'white',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: '600',
    textAlign: 'center',
    color: '#333',
  },
  shareButton: {
    padding: 8,
  },
  amountCard: {
    margin: 16,
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  amountLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 8,
  },
  amount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  date: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: 16,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: 'white',
    marginLeft: 4,
    fontWeight: '500',
  },
  detailsCard: {
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  detailIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  actionButtons: {
    padding: 16,
    gap: 12,
  },
  attachButton: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  attachButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  reportButton: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  reportButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});