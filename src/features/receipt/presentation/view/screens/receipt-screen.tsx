import { View, Text, useColorScheme } from "react-native";
import { COLORS } from "../../../../../core/constant/Colors";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { Dimensions } from 'react-native'
import { Ionicons } from '@expo/vector-icons';


const ReceiptScreen = () => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <View style={{
            flex: 1,
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            backgroundColor: colors.background
        }}>

            <View style={{
                alignSelf: "center",
                flexDirection: "column",
                alignItems: "center",
                marginTop: Sizes.spacing.lg,
                gap: Sizes.spacing.sm,

            }}>
                <Text style={[getTitleStyle(Sizes.fontSize.xl, colors.onBackground)]}>
                    RM 3,400
                </Text>
                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                    Total Incentives Saved
                </Text>
            </View>

            <View style={{
                backgroundColor: colors.background,
                width: "100%",

            }}>
                <View style={{
                    width: "100%",
                    paddingHorizontal: Sizes.padding.lg
                }}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginTop: Sizes.spacing.lg,
                        gap: Sizes.spacing.lg,
                        borderColor: colors.secondaryContainer,
                        borderWidth: 1,
                        borderRadius: Sizes.borderRadius.lg,
                        padding: Sizes.padding.lg
                    }}>

                        <Text style={[getTitleStyle(Sizes.fontSize.lg, colors.onBackground)]}>
                            Relief Categories
                        </Text>

                        <ReceiptCard colors={colors} />

                        <ReceiptCard colors={colors} />

                        <ReceiptCard colors={colors} />



                    </View>
                </View>

                <View style={{
                    width: "100%",
                    paddingHorizontal: Sizes.padding.lg
                }}>
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
                </View>

            </View>
        </View>
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