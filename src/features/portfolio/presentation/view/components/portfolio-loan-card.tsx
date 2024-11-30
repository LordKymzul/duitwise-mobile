import { View, Text, useColorScheme, TouchableOpacity } from "react-native"
import {
    AntDesign,
    Ionicons
} from "@expo/vector-icons"

import { NavigationProp, useNavigation } from "@react-navigation/native"
import { Colors, COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import { RootStackParams } from "src/core/shared/types/navigation";
import InfoChip from "src/core/shared/presentation/components/info-chip";
import PercentageBar from "src/core/shared/presentation/components/percentage-bar";
import { Loan, PortfolioData } from "src/core/constant/Data";
import { capitalizeFirstLetter, formatDateDayandTime } from "src/core/shared/utils/helper";

const PortfolioLoanCard = ({ loan }: { loan: Loan }) => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];

    const {
        navigate
    } = useNavigation<NavigationProp<RootStackParams>>();

    const getColor = (title: string) => {
        if (title === "Principal & Interest") {
            return Colors.green;
        } else if (title === "Insurance Premium") {
            return Colors.blue;
        } else if (title === "Maintenance Reserve") {
            return Colors.purple;
        }
        return color.tint;
    }

    return (
        <TouchableOpacity onPress={() => {
            navigate("PortfolioLoanDetail", { loan: loan })
        }}
        >
            <View
                style={{
                    flexDirection: "column",
                    gap: Sizes.spacing.lg,
                    alignItems: "flex-start",
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
                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        gap: Sizes.spacing.md,
                        alignItems: "flex-start"
                    }}>

                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.lg, color.onBackground)
                        }}>{loan.type}</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: Sizes.spacing.sm
                        }}>
                            <AntDesign name="clockcircleo" size={Sizes.iconSize.sm} color={color.onBackground} />
                            <Text style={{
                                ...getSubtitleStyle(Sizes.fontSize.sm, color.onBackground)
                            }}>{formatDateDayandTime(loan.nextPaymentDate)}</Text>
                        </View>
                    </View>

                    <View style={{
                        flex: 1,
                        flexDirection: "column",
                        gap: Sizes.spacing.sm,
                        alignItems: "flex-end"
                    }}>
                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.md, color.onBackground)
                        }}>Total Loan</Text>
                        <Text style={{
                            ...getTitleStyle(Sizes.fontSize.lg, color.onBackground)
                        }}>RM {loan.totalLoan}</Text>

                    </View>
                </View>

                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: Sizes.spacing.md,
                    justifyContent: "space-between",
                    width: "100%",
                    backgroundColor: Colors.greenTransparent,
                    padding: Sizes.spacing.lg,
                    borderRadius: Sizes.borderRadius.lg
                }}>

                    <Text style={{
                        ...getSubtitleStyle(Sizes.fontSize.md, color.onBackground),
                        flex: 1,
                        textAlign: "left"
                    }}>
                        Loan Amount
                    </Text>

                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.lg, color.onBackground),
                        flex: 1,
                        textAlign: "right"
                    }}>
                        RM {loan.loanDetails.balance}
                    </Text>

                </View>

                <View style={{
                    flexDirection: "column",
                    gap: Sizes.spacing.lg,
                    width: "100%"
                }}>
                    <LoanIndicator percentage={50} barColor={getColor("Principal & Interest")} color={color} title="Principal & Interest" value={`RM ${loan.details.principalAndInterest}`} />
                    <LoanIndicator percentage={50} barColor={getColor("Insurance Premium")} color={color} title="Insurance Premium" value={`RM ${loan.details.insurancePremium}`} />
                    <LoanIndicator percentage={50} barColor={getColor("Maintenance Reserve")} color={color} title="Maintenance Reserve" value={`RM ${loan.details.maintenanceReserve}`} />
                </View>


                <View style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.md
                }}>
                    <InfoChip
                        icon={{
                            name: "information-circle-outline",
                            size: Sizes.iconSize.md,
                            color: color.tint,
                            type: "Ionicons"
                        }}
                        title={capitalizeFirstLetter(loan.status.activeStatus)}
                        color={color.tint}
                    />

                    <InfoChip
                        icon={{
                            name: "information-circle-outline",
                            size: Sizes.iconSize.md,
                            color: Colors.blue,
                            type: "Ionicons"
                        }}
                        title="Due Payment"
                        color={Colors.blue}
                    />
                    {/* <InfoChip
                        icon={{
                            name: "information-circle-outline",
                            size: Sizes.iconSize.md,
                            color: color.tint,
                            type: "Ionicons"
                        }}
                        title="Loan Amount"
                        color={color.tint}
                    /> */}
                </View>

            </View>
        </TouchableOpacity>
    )
}

const LoanIndicator = ({ percentage, barColor, color, title, value }: { percentage: number, barColor: string, color: any, title: string, value: string }) => {

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            width: "100%"
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: Sizes.spacing.md,
                width: "100%",
                marginBottom: Sizes.spacing.lg
            }}>

                <Text style={{
                    ...getSubtitleStyle(Sizes.fontSize.md, color.onBackground),
                    flex: 1,
                    textAlign: "left"
                }}>
                    {title}
                </Text>

                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.md, color.onBackground),
                    flex: 1,
                    textAlign: "right"
                }}>
                    {value}
                </Text>

            </View>

            <PercentageBar percentage={percentage} barColor={barColor} sizePad={4} />

        </View>
    )
}

export default PortfolioLoanCard