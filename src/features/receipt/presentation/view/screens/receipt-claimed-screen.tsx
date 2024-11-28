import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
  TextInput,
  ScrollView,
  Dimensions,
  Animated,
  Share,
} from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '@core/constant/Colors';
import { LinearGradient } from 'expo-linear-gradient';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const { width } = Dimensions.get('window');

export const ReceiptClaimedScreen: React.FC = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const scrollY = new Animated.Value(0);

  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [120, 120],
    extrapolate: 'clamp',
  });

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Receipt Details:\nItem: Air Pod\nPrice: RM1000.00\nDate: 28 Oct 2022`,
        title: 'Receipt Details'
      });
    } catch (error) {
      console.error(error);
    }
  };

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date: Date) => {
    setSelectedDate(date);
    hideDatePicker();
    // Here you can implement the filter logic based on the selected date
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-MY', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Fixed Header */}
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <View style={styles.headerTop}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
          >
            <Ionicons name="chevron-back" size={28} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Electronics</Text>
          <TouchableOpacity style={styles.filterButton}>
            <MaterialCommunityIcons name="tune-vertical" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Enhanced Search Bar with Date Picker */}
        <View style={styles.searchWrapper}>
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={20} color={Colors.light.icon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search receipts"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={Colors.light.icon}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity 
                onPress={() => setSearchQuery('')}
                style={styles.clearButton}
              >
                <Ionicons name="close-circle-filled" size={20} color={Colors.light.icon} />
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity 
            style={styles.searchFilterChip}
            onPress={showDatePicker}
          >
            <MaterialCommunityIcons name="calendar-range" size={20} color={Colors.light.tint} />
            <Text style={styles.filterChipText}>
              {selectedDate ? formatDate(selectedDate) : 'Date'}
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      {/* Date Picker Modal */}
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Animated.ScrollView
        style={[styles.scrollView, { marginTop: 0 }]}
        contentContainerStyle={{ paddingTop: 0 }}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        <View style={[styles.content, { paddingTop: 0 }]}>
          {/* Improved Claimed Amount Card with Green Theme */}
          <LinearGradient
            colors={['#2E7D32', '#1B5E20']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.claimedCard}
          >
            <View style={styles.claimedContent}>
              <View style={styles.amountSection}>
                <Text style={styles.totalClaimedLabel}>Total Claimed</Text>
                <Text style={styles.amountText}>RM 1,000</Text>
                <View style={styles.limitBadge}>
                  <MaterialCommunityIcons name="chart-line-variant" size={16} color="white" />
                  <Text style={styles.limitText}>40% of RM2,500</Text>
                </View>
              </View>
              <View style={styles.progressSection}>
                <View style={styles.progressBar}>
                  <LinearGradient
                    colors={['#FFFFFF', '#E8F5E9']}
                    style={[styles.progressFill, { width: '40%' }]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  />
                </View>
                <View style={styles.progressLabels}>
                  <Text style={styles.progressStart}>RM 0</Text>
                  <Text style={styles.progressEnd}>RM 2,500</Text>
                </View>
              </View>
            </View>
          </LinearGradient>

          {/* Receipt Card with Working Share Button */}
          <View style={styles.receiptCard}>
            <View style={styles.receiptHeader}>
              <MaterialCommunityIcons name="receipt" size={24} color={Colors.light.tint} />
              <Text style={styles.receiptHeaderText}>Latest Receipt</Text>
            </View>
            <Image
              source={require('@assets/machinesreceipt.jpg')}
              style={styles.receiptImage}
              resizeMode="contain"
            />
            <View style={styles.receiptDetails}>
              <View style={styles.detailRow}>
                <View>
                  <Text style={styles.detailLabel}>Item Name</Text>
                  <Text style={styles.detailValue}>Air Pod</Text>
                </View>
                <TouchableOpacity 
                  style={styles.shareButton}
                  onPress={handleShare}
                >
                  <Ionicons name="share-outline" size={20} color={Colors.light.tint} />
                </TouchableOpacity>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Total Price</Text>
                <Text style={[styles.detailValue, styles.priceValue]}>RM1000.00</Text>
              </View>
              <View style={styles.detailRow}>
                <Text style={styles.detailLabel}>Date</Text>
                <Text style={styles.detailValue}>28 Oct 2022</Text>
              </View>
            </View>
          </View>
        </View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    backgroundColor: '#F8F9FA',
    paddingTop: 8,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 1000,
    paddingBottom: 8,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  filterButton: {
    padding: 8,
  },
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 16,
    marginBottom: 0,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
  claimedCard: {
    borderRadius: 20,
    marginBottom: 20,
    overflow: 'hidden',
    elevation: 4,
    shadowColor: Colors.light.tint,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
  },
  claimedContent: {
    padding: 24,
  },
  amountSection: {
    marginBottom: 20,
  },
  totalClaimedLabel: {
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    marginBottom: 8,
    fontWeight: '500',
  },
  amountText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 12,
  },
  limitBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: 'flex-start',
    gap: 6,
  },
  limitText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  progressSection: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 16,
    borderRadius: 16,
  },
  progressBar: {
    height: 12,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 6,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progressStart: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  progressEnd: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 12,
  },
  receiptCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  receiptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  receiptHeaderText: {
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  receiptImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
  },
  receiptDetails: {
    padding: 16,
    gap: 16,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  priceValue: {
    color: Colors.light.tint,
    fontSize: 18,
  },
  shareButton: {
    padding: 8,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchFilterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    gap: 4,
  },
  filterChipText: {
    color: Colors.light.tint,
    fontSize: 14,
    fontWeight: '500',
  },
  clearButton: {
    padding: 4,
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
});
