import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BankCardSlider from '@core/shared/presentation/components/bankcard-slider';
import CardDetailsBox from '@core/shared/presentation/components/card-details-box';
import Header from '@core/shared/presentation/components/header';  
import NetWorthChart from '@core/shared/presentation/components/net-worth-chart';
import StressLevel from '@core/shared/presentation/components/stress-level';
import ExpensesGraph from '@core/shared/presentation/components/expenses-small-graph';
import RecurringPayments from '@core/shared/presentation/components/recurring-payments';
import FinancialFitness from '@core/shared/presentation/components/financial-fitness';

type RecurringPayment = {
    name: string;
    amount: number;
    status: 'active' | 'pending';
    icon: string;
};

const { width, height } = Dimensions.get('window');
const chartData = [
    {
        value: 25,
        key: 'gx-bank',
        svg: { fill: '#4285F4' },
        label: 'GX Bank'
    },
    {
        value: 10,
        key: 'bank-islam',
        svg: { fill: '#34A853' },
        label: 'Bank Islam'
    },
    {
        value: 30,
        key: 'maybank',
        svg: { fill: '#FBBC05' },
        label: 'Maybank'
    },
    {
        value: 25,
        key: 'cimb',
        svg: { fill: '#EA4335' },
        label: 'CIMB'
    },
];
const HomeScreen = () => {
    const handleAddClick = () => {
        console.log('Add button clicked');
    };

    const handleDrawerPress = () => {
        console.log('Drawer button pressed');
        // Implement your drawer navigation logic here
    };

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#29C445', '#007A25', '#5ECC72']}
                locations={[1, 0.6, 1]}  
                end={{ x: 0, y: 1 }}
                style={styles.backgroundGradient}
            />
            
            <ScrollView 
                style={styles.content}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <Header onDrawerPress={handleDrawerPress} />
                <BankCardSlider />
                <CardDetailsBox 
                    name="Hazwan Jr."
                    expDate="09/29"
                    onAddClick={handleAddClick}
                />
                
                <FinancialFitness 
                    score={80}
                    status="Strong"
                    description="Lorem"
                />
                
                <View style={styles.chartContainer}>
                    <NetWorthChart totalAmount={10000} data={chartData} />
                </View>
                
                <View style={styles.metricsContainer}>
                    <View style={styles.metricItem}>
                        <StressLevel value={35} trend="down" />
                    </View>
                    <View style={styles.metricItem}>
                        <ExpensesGraph amount={55100} percentage={-5} />
                    </View>
                </View>
                
                <RecurringPayments 
                    payments={[
                        { name: 'Youtube Subscription', amount: 12, status: 'active'},
                        { name: 'Apple Subscription', amount: 12, status: 'active' },
                        { name: 'Spotify Subscription', amount: 12, status: 'pending'},
                    ]}
                    billingDate="29 December 2025"
                />
            </ScrollView>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    chartContainer: {
        marginHorizontal: 16,
        marginTop: 20,
        width: width - 32,
    },
    backgroundGradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: height * 0.3,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
    },
    content: {
        flex: 1,
        zIndex: 1,
    },
    metricsContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 16,
        gap: 16,
        width: width - 32,
    },
    metricItem: {
        width: (width - 48) / 2,
        maxWidth: undefined,
    },
    scrollContent: {
        paddingBottom: 24,
    },
});

export default HomeScreen;