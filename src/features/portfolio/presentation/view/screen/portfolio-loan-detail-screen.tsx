import { useNavigation } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, useColorScheme, ScrollView } from "react-native";
import { RootStackParams } from "@/src/core/shared/types/navigation";
import { Sizes } from "@/src/core/constant/Sizes";
import {
    Ionicons
} from "@expo/vector-icons"
import { COLORS } from "@/src/core/constant/Colors";
import { getTitleStyle } from "@/src/core/constant/Texts";
import PercentageBar from "@/src/core/shared/presentation/components/percentage-bar";

const PortfolioLoanDetailScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                backgroundColor: color.tint,
                shadowColor: 'transparent', // Remove header bottom shadow
                elevation: 0, // Remove elevation shadow on Android
            },
            headerTitle: "",
            headerLeft: () => (
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Sizes.spacing.md
                }}>
                    <Ionicons name="chevron-back" size={Sizes.iconSize.lg} color={color.onTint} onPress={() => navigation.goBack()} />
                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.lg, color.onTint)
                    }}>Loan Detail</Text>
                </View>
            )
        })
    }, [isDark, color, navigation])


    return (
        <ScrollView style={{
            flex: 1,
            backgroundColor: color.background
        }}>
            <View style={{
                flexDirection: "column",
                alignItems: "center",
                backgroundColor: color.tint
            }}>
                <View style={{
                    flexDirection: "column",
                    alignItems: "center",
                    gap: Sizes.spacing.md,
                    marginVertical: Sizes.spacing.xl
                }}>
                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.sm, color.onTint)
                    }}>CW231232323</Text>
                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.xl, color.onTint)
                    }}>RM 550,101</Text>
                </View>

                <View style={{
                    flexDirection: "column",
                    gap: Sizes.spacing.xl,
                    width: "100%",
                    borderTopEndRadius: Sizes.borderRadius.xl,
                    borderTopStartRadius: Sizes.borderRadius.xl,
                    borderWidth: 1,
                    borderBottomWidth: 0,
                    borderColor: color.secondaryContainer,
                    padding: Sizes.spacing.xl,
                    backgroundColor: color.background
                }}>
                    <View style={{
                        flexDirection: "column",
                        gap: Sizes.spacing.lg
                    }}>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: Sizes.spacing.md,
                            width: "100%"
                        }}>

                            <Detail
                                title="Loan Type"
                                value="House Loan"
                                colorValue={color.onBackground}
                                isRight={false}
                                color={color}
                            />
                            <Detail
                                title="Duration"
                                value="12 Months"
                                colorValue={color.onBackground}
                                isRight={true}
                                color={color}
                            />
                        </View>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: Sizes.spacing.md,
                            width: "100%"
                        }}>

                            <Detail
                                title="Monthly Repayment"
                                value="RM 45,842"
                                colorValue={"green"}
                                isRight={false}
                                color={color}
                            />
                            <Detail
                                title="Balance"
                                value="RM 550,101"
                                colorValue={"red"}
                                isRight={true}
                                color={color}
                            />
                        </View>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: Sizes.spacing.md,
                            width: "100%"
                        }}>

                            <Detail
                                title="Maturity Date"
                                value="2025-01-01"
                                colorValue={color.onBackground}
                                isRight={false}
                                color={color}
                            />
                            <Detail
                                title="Loan Release Date"
                                value="2024-01-01"
                                colorValue={color.onBackground}
                                isRight={true}
                                color={color}
                            />
                        </View>

                    </View>

                    <View style={{
                        flexDirection: "column",
                        gap: Sizes.spacing.lg,
                        borderWidth: 1,
                        borderColor: color.secondaryContainer,
                        borderRadius: Sizes.borderRadius.lg,
                        padding: Sizes.spacing.lg

                    }}>

                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: Sizes.spacing.md,
                            width: "100%"
                        }}>

                            <Text style={{
                                ...getTitleStyle(Sizes.fontSize.md, color.onBackground),
                                flex: 1,
                                textAlign: "left"
                            }}>Active</Text>

                            <Text style={{
                                ...getTitleStyle(Sizes.fontSize.md, color.onBackground),
                                flex: 1,
                                textAlign: "right"
                            }}>Interest Rate 3.54%</Text>

                        </View>

                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.md, color.tint),

                            textAlign: "right"
                        }}>64% Paid</Text>

                        <PercentageBar percentage={64} barColor={color.tint} sizePad={5} />

                    </View>

                    <View style={{
                        flexDirection: "column",
                        gap: Sizes.spacing.lg,
                        width: "100%",
                        alignItems: "flex-start"
                    }}>

                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.lg, color.onBackground),
                            textAlign: "left"
                        }}>Payment History</Text>

                        <View style={{
                            flexDirection: "row",
                            gap: Sizes.spacing.md,
                            alignItems: "center",
                            justifyContent: "space-between",
                            width: "100%",
                            borderWidth: 1,
                            borderColor: color.secondaryContainer,
                            borderRadius: Sizes.borderRadius.lg,
                            padding: Sizes.spacing.lg
                        }}>

                            <View style={{
                                flexDirection: "column",
                                gap: Sizes.spacing.md,
                                flex: 1,
                                alignItems: "flex-start",

                            }}>

                                <Text style={{
                                    ...getTitleStyle(Sizes.fontSize.sm, color.onBackground)
                                }}>Payment Date</Text>

                                <Text style={{
                                    ...getTitleStyle(Sizes.fontSize.md, color.onBackground)
                                }}>27 Nov 2024</Text>

                            </View>

                            <View style={{
                                flexDirection: "column",
                                gap: Sizes.spacing.md,
                                flex: 1,
                                alignItems: "flex-end"
                            }}>

                                <Text style={{
                                    ...getTitleStyle(Sizes.fontSize.sm, color.onBackground)
                                }}>Amount</Text>

                                <Text style={{
                                    ...getTitleStyle(Sizes.fontSize.md, color.tint)
                                }}>RM 45,842</Text>

                            </View>

                        </View>

                    </View>

                </View>
            </View >
        </ScrollView >
    )
}

const Detail = ({
    title,
    value,
    colorValue,
    isRight,
    color
}: {
    title: string;
    value: string;
    colorValue: string;
    isRight: boolean;
    color: any;
}) => {
    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
            flex: 1,
            alignItems: isRight ? "flex-end" : "flex-start"
        }}>
            <Text style={{
                ...getTitleStyle(Sizes.fontSize.sm, color.onBackground)
            }}>{title}</Text>
            <Text style={{
                ...getTitleStyle(Sizes.fontSize.lg, colorValue)
            }}>{value}</Text>
        </View>

    )
}

export default PortfolioLoanDetailScreen;