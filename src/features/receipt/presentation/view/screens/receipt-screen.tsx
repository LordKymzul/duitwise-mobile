import { View, Text, useColorScheme, ScrollView, TouchableOpacity } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { useLayoutEffect } from "react";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "@/src/core/shared/types/navigation";
import React from "react";

const ReceiptScreen = () => {


    const navigation = useNavigation<NavigationProp<RootStackParams>>();


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];
    const isDark = colorScheme === "dark";


    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: colors.tint,
                shadowColor: 'transparent', // Remove header bottom shadow
                elevation: 0, // Remove elevation shadow on Android
            },
            headerTitle: "",
        })
    }, [isDark, colors, navigation])


    return (
        <>
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                    flex: 1,
                    backgroundColor: colors.tint
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
                        backgroundColor: colors.tint,
                        width: "100%",
                    }}>
                        <Text style={[getTitleStyle(Sizes.fontSize.xl, colors.onTint)]}>
                            RM 3,400
                        </Text>
                        <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onTint)]}>
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

                            <ReceiptCard colors={colors} />

                            <ReceiptCard colors={colors} />

                            <ReceiptCard colors={colors} />



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

            <TouchableOpacity
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



const ReceiptCard = ({ colors }: { colors: any }) => {
    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            gap: Sizes.spacing.lg
        }}>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: Sizes.spacing.sm,
                width: "100%"
            }}>

                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    Self Medical 2 Transactions
                </Text>

                <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    RM 1,200 of RM 1,500
                </Text>
            </View>

            <View style={{

                width: Dimensions.get('screen').width - Sizes.padding.lg * 4,
                height: 10,
                backgroundColor: colors.secondaryContainer,
                borderRadius: 100

            }}>

                <View style={{
                    width: "50%",
                    height: "100%",
                    backgroundColor: colors.tint,
                    borderRadius: 100
                }}>
                </View>

            </View>

            <View style={{
                flexDirection: "row",
                justifyContent: "space-between",
                gap: Sizes.spacing.sm,
                width: "100%",
                backgroundColor: colors.secondaryContainer,
                padding: Sizes.padding.md,
                borderRadius: Sizes.borderRadius.md
            }}>

                <View style={{
                    flexDirection: "row",
                    gap: Sizes.spacing.md,
                    alignItems: "center"
                }}>
                    <Ionicons name="newspaper-outline" size={Sizes.iconSize.md} color={colors.onBackground} />
                    <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        Latest : KPJ Healthcare
                    </Text>
                </View>
                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    RM 200
                </Text>

            </View>

        </View>

    )
}

export default ReceiptScreen;