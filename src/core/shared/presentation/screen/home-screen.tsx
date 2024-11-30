import * as React from 'react';
import { View, StyleSheet, Dimensions, ScrollView, TouchableOpacity, useColorScheme } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BankCardSlider from '@core/shared/presentation/components/bankcard-slider';
import CardDetailsBox from '@core/shared/presentation/components/card-details-box';
import Header from '@core/shared/presentation/components/header';
import NetWorthChart from '@core/shared/presentation/components/net-worth-chart';
import StressLevel from '@core/shared/presentation/components/stress-level';
import ExpensesGraph from '@core/shared/presentation/components/expenses-small-graph';
import RecurringPayments from '@core/shared/presentation/components/recurring-payments';
import FinancialFitness from '@core/shared/presentation/components/financial-fitness';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParams } from 'src/core/shared/types/navigation';
import { COLORS } from 'src/core/constant/Colors';
import { useEffect, useLayoutEffect } from 'react';
import { Sizes } from 'src/core/constant/Sizes';
import { chartData } from '../../utils/helper';
import Animated, {
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue,
    interpolateColor,
    withTiming
} from 'react-native-reanimated';
import ModalChooseBank from '@features/portfolio/presentation/view/components/modal-choose-bank';
import { usePortfolioStore } from 'src/features/portfolio/presentation/zustand/portfolio-store';
import { BankPortfolio } from 'src/core/constant/Data';


type RecurringPayment = {
    name: string;
    amount: number;
    status: 'active' | 'pending';
    icon: string;
};

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];
    const isDark = colorScheme === 'dark';

    const scrollY = useSharedValue(0);
    const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    const headerAnimatedStyle = useAnimatedStyle(() => {
        const backgroundColor = interpolateColor(
            scrollY.value,
            [0, 100],
            ['#29C445', colors.background]
        );

        return {
            backgroundColor: withTiming(backgroundColor, { duration: 150 }),
        };
    });

    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: "",
            headerStyle: headerAnimatedStyle,
            headerTransparent: true,
        });
    }, [headerAnimatedStyle, isDark]);

    const [isBankModalVisible, setIsBankModalVisible] = React.useState(false);

    const handleAddClick = () => {
        setIsBankModalVisible(true);
    };

    const handleBankSelect = (bank: BankPortfolio) => {
        setIsBankModalVisible(false);
        navigation.navigate('LoginPortfolio', { bank });
    };

    const { setPortfolios } = usePortfolioStore();


    useEffect(() => {
        const fetchPortfolios = async () => {
            await usePortfolioStore.getState().setPortfolios();
        };
        fetchPortfolios();
    }, []);

    return (
        <View style={styles.container}>
            <LinearGradient
                colors={['#29C445', '#007A25', '#5ECC72']}
                locations={[1, 0.6, 1]}
                end={{ x: 0, y: 1 }}
                style={[styles.backgroundGradient,]}
            />
            <Header />

            <AnimatedScrollView
                style={[styles.content, { borderRadius: Sizes.borderRadius.lg }]}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
            >

                <BankCardSlider />
                <CardDetailsBox
                    name="Hazwan Jr."
                    expDate="09/29"
                    onAddClick={handleAddClick}
                />

                <FinancialFitness
                    score={80}
                    status="Strong"
                    description="Based on savings, debt, emergency funds, income usage, and investments"
                />

                <TouchableOpacity style={styles.chartContainer} onPress={() => {
                    navigation.navigate("Portfolio")
                }}>
                    <NetWorthChart totalAmount={10000} data={chartData} />
                </TouchableOpacity>

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
                        { name: 'Youtube Subscription', amount: 32, status: 'active' },
                        { name: 'Apple Subscription', amount: 11.90, status: 'active' },
                        { name: 'Spotify Subscription', amount: 23.90, status: 'pending' },
                    ]}
                    billingDate="29 December 2025"
                />
            </AnimatedScrollView>

            <ModalChooseBank
                visible={isBankModalVisible}
                onClose={() => setIsBankModalVisible(false)}

            />
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