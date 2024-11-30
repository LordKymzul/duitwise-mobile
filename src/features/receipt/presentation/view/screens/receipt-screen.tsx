import { View, Text, useColorScheme, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "src/core/shared/types/navigation";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import ReceiptCard, { ReceiptEntity } from "../components/recepit-card";



const receipts: ReceiptEntity[] = [

    {
        receiptTitle: "Self Medical 2 Transactions",
        receiptAmount: "RM 1,200 of RM 1,500",
        receiptPercentage: "50%",
        receiptNumTransactions: 2,
        receiptLatest: {
            title: "KPJ Healthcare",
            amount: 200
        }
    },
    {
        receiptTitle: "Electronincs",
        receiptAmount: "RM 1,200 of RM 1,500",
        receiptPercentage: "50%",
        receiptNumTransactions: 2,
        receiptLatest: {
            title: "Machine Iphone 15",
            amount: 4599
        }
    },
    {
        receiptTitle: "Child Care",
        receiptAmount: "RM 500 of RM 1,000",
        receiptPercentage: "50%",
        receiptNumTransactions: 2,
        receiptLatest: {
            title: "School Fees",
            amount: 500
        }
    }

]

const ReceiptScreen = () => {


    const navigation = useNavigation<NavigationProp<RootStackParams>>();


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];
    const isDark = colorScheme === "dark";

    const handleTransactionPress = () => {
        navigation.navigate('Transaction');
    };

    const handleReceiptPress = (receipt: ReceiptEntity) => {
        navigation.navigate('ReceiptDetail', { receipt });
    }





    return (
        <>
            <LinearGradient colors={['#4CAF50', '#000']} style={{ flex: 1 }}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flex: 1,

                    }}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                    }}>

                        <View style={{
                            alignSelf: "center",
                            flexDirection: "column",
                            alignItems: "center",
                            marginBottom: Sizes.spacing.xxl,
                            gap: Sizes.spacing.sm,
                            marginTop: Sizes.spacing.xxl,
                            width: "100%",
                        }}>
                            <Text style={[getTitleStyle(Sizes.fontSize.xxl, colors.onTint)]}>
                                RM 3,400
                            </Text>
                            <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onTint)]}>
                                Total Incentives Saved
                            </Text>
                        </View>

                        <View style={{
                            height: "100%",
                            backgroundColor: colors.background,
                            width: "100%",
                            borderTopEndRadius: Sizes.borderRadius.xl,
                            borderTopStartRadius: Sizes.borderRadius.xl,

                            padding: Sizes.spacing.xl,

                        }}>
                            <View style={{
                                flexDirection: "column",
                                alignItems: "flex-start",

                                gap: Sizes.spacing.lg,
                            }}>

                                <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                                    Relief Categories
                                </Text>

                                {
                                    receipts.map((receipt, index) => (
                                        <ReceiptCard
                                            key={index}
                                            onPress={() => handleReceiptPress(receipt)}
                                            receipt={receipt}
                                        />
                                    ))
                                }

                            </View>

                            <View style={{
                                flexDirection: "column",
                                marginTop: Sizes.spacing.lg,
                                gap: Sizes.spacing.lg,
                                borderColor: colors.secondaryContainer,
                                borderWidth: 1,
                                borderRadius: Sizes.borderRadius.lg,
                                padding: Sizes.padding.lg
                            }}>

                                <View style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    gap: Sizes.spacing.sm
                                }}>

                                    <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                                        Relief Transactions
                                    </Text>

                                    <Ionicons name="filter-outline" size={Sizes.iconSize.lg} color={colors.onBackground} />

                                </View>

                                <View style={{
                                    flexDirection: "column",
                                    gap: Sizes.spacing.sm
                                }}>
                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: Sizes.spacing.sm

                                    }}>

                                        <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                                            Diesel
                                        </Text>

                                        <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                                            RM 1,200
                                        </Text>

                                    </View>

                                    <View style={{
                                        width: "100%",
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        gap: Sizes.spacing.sm

                                    }}>

                                        <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                                            Approved stations only
                                        </Text>

                                        <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                                            Monthly
                                        </Text>

                                    </View>
                                </View>

                                <View style={{
                                    width: "100%",
                                    flexDirection: "row",
                                    alignItems: "center",
                                    gap: Sizes.spacing.md
                                }}>

                                    <Ionicons name="calendar-outline" size={Sizes.iconSize.sm} color={colors.onBackground} />

                                    <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                                        Next Refill: 12 Oct 2024
                                    </Text>

                                </View>
                            </View>

                            <View style={{
                                marginTop: Sizes.spacing.lg,
                                width: "100%",
                                flexDirection: "row",
                                alignItems: "center",
                                gap: Sizes.spacing.md,
                                borderWidth: 1,
                                borderColor: colors.secondaryContainer,
                                borderRadius: Sizes.borderRadius.md,
                                padding: Sizes.padding.md
                            }}>

                                <Ionicons name="information-circle-outline" size={Sizes.iconSize.md} color={colors.onBackground} />

                                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground), { flex: 1 }]}>
                                    Don’t forget to keep your receipts! You’ll need them for tax filing
                                </Text>

                            </View>



                        </View>

                    </View>



                </ScrollView>

            </LinearGradient>
            <TouchableOpacity
                onPress={handleTransactionPress}
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 50,
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                    height: 50,
                    backgroundColor: colors.tint,
                    borderRadius: 100,
                }}
            >
                <Ionicons name="add" size={Sizes.iconSize.lg} color={colors.onTint} />
            </TouchableOpacity>
        </>
    )
}





export default ReceiptScreen;