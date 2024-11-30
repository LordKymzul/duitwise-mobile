import { useNavigation, useRoute } from "@react-navigation/native";
import { NavigationProp } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, useColorScheme, ScrollView } from "react-native";

import {
    Ionicons
} from "@expo/vector-icons"
import { PortfolioLoanDetailScreenRouteProp, RootStackParams } from "src/core/shared/types/navigation";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getBoldTitleStyle, getTitleStyle } from "src/core/constant/Texts";
import PercentageBar from "src/core/shared/presentation/components/percentage-bar";
import { LinearGradient } from "expo-linear-gradient";
import { formatDate } from "src/core/shared/utils/helper";
import { LoanHistoryEntry } from "src/core/constant/Data";


const PortfolioLoanDetailScreen = () => {

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";

    const {
        params,

    } = useRoute<PortfolioLoanDetailScreenRouteProp>();

    useLayoutEffect(() => {
        navigation.setOptions({
            headerStyle: {
                elevation: 0,
                borderBottomWidth: 0,
            },
            headerBackground: () => <LinearGradient colors={['#4CAF50', '#4CAF50']} style={{ flex: 1 }} />,
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
            <LinearGradient
                colors={['#4CAF50', '#000']}
                style={{ flex: 1 }}>
                <View style={{
                    flexDirection: "column",
                    alignItems: "center",

                }}>
                    <View style={{
                        flexDirection: "column",
                        alignItems: "center",
                        gap: Sizes.spacing.md,
                        marginVertical: Sizes.spacing.xl
                    }}>
                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.md, color.onTint)
                        }}>CW231232323</Text>
                        <Text style={{
                            ...getBoldTitleStyle(Sizes.fontSize.xxl, color.onTint)
                        }}>RM {params.loan.loanDetails.balance}</Text>
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
                                    value={params.loan.type}
                                    colorValue={color.onBackground}
                                    isRight={false}
                                    color={color}
                                />
                                <Detail
                                    title="Duration"
                                    value={params.loan.loanDetails.duration}
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
                                    value={`RM ${params.loan.monthlyPayment ?? 0}`}
                                    colorValue={"green"}
                                    isRight={false}
                                    color={color}
                                />
                                <Detail
                                    title="Balance"
                                    value={`RM ${params.loan.loanDetails.balance ?? 0}`}
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
                                    value={params.loan.loanDetails.maturityDate ? formatDate(params.loan.loanDetails.maturityDate) : "N/A"}
                                    colorValue={color.onBackground}
                                    isRight={false}
                                    color={color}
                                />
                                <Detail
                                    title="Loan Release Date"
                                    value={params.loan.loanDetails.loanReleaseDate ? formatDate(params.loan.loanDetails.loanReleaseDate) : "N/A"}
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

                            {params.loan.loanDetails.loanHistory.map((loanHistory, index) => (
                                <PaymentHistory key={index} color={color} loanHistory={loanHistory} />
                            ))}


                        </View>

                    </View>
                </View >
            </LinearGradient>
        </ScrollView >
    )
}

const PaymentHistory = ({
    color,
    loanHistory
}: {
    loanHistory: LoanHistoryEntry;
    color: any;
}) => {
    return (
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
                }}>{formatDate(loanHistory.date)}</Text>

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
                }}>RM {loanHistory.paidAmount}</Text>

            </View>

        </View>
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