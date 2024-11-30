import * as React from 'react';
import { View, Text, StyleSheet, Switch, Image } from 'react-native';

interface RecurringPayment {
  name: string;
  amount: number;
  status: 'active' | 'pending' | 'expired';
}

interface RecurringPaymentsProps {
  payments?: RecurringPayment[];
  billingDate?: string;
}

const RecurringPayments: React.FC<RecurringPaymentsProps> = ({ 
  payments = [
    { name: 'Youtube Subscription', amount: 32, status: 'active' },
    { name: 'Apple Subscription', amount: 11.90, status: 'active' },
    { name: 'Spotify Subscription', amount: 23.90, status: 'pending' },
  ],
  billingDate = '29 December 2024'
}) => {
  const [isNotified, setIsNotified] = React.useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Recurring Payments</Text>
        <View style={styles.notificationContainer}>
          <Text style={styles.notificationText}>Get Notified?</Text>
          <Switch 
            trackColor={{ false: '#E0E0E0', true: '#34A853' }}
            thumbColor={'#FFFFFF'}
            value={isNotified}
            onValueChange={setIsNotified}
            style={styles.switch}
          />
        </View>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image 
            source={require('@assets/payments.png')} 
            style={styles.paymentsImage}
            resizeMode="contain"
          />
          <Text style={styles.billingDate}>Upcoming billed at {billingDate}</Text>
        </View>

        <View style={styles.paymentsContainer}>
          {payments.map((payment, index) => (
            <View key={index} style={styles.paymentRow}>
              <View style={styles.paymentInfo}>
                <View style={[styles.statusDot, { 
                  backgroundColor: payment.status === 'active' ? '#34A853' : '#FBBC05'
                }]} />
                <Text style={styles.paymentName}>{payment.name}</Text>
              </View>
              <Text style={styles.paymentAmount}>RM {payment.amount}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
    marginHorizontal: 16,
    marginTop: 16,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  notificationText: {
    fontSize: 12,
    color: '#666',
    marginRight: 10,
  },
  contentContainer: {
    gap: 12,
  },
  imageContainer: {
    marginBottom: 4,
  },
  paymentsImage: {
    width: 140,
    height: 50,
    marginBottom: 4,
    marginLeft: -8,
  },
  billingDate: {
    fontSize: 13,
    color: '#666',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  paymentsContainer: {
    gap: 2,
    marginTop: -12,
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 2,
  },
  paymentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  paymentName: {
    fontSize: 16,
    color: '#666',
  },
  paymentAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  switch: {
    marginLeft: -8,
  },
});

export default RecurringPayments;
