import { View, Text, useColorScheme, TouchableOpacity } from "react-native"
import { Sizes } from "@/src/core/constant/Sizes"
import {
    AntDesign,
    Ionicons
} from "@expo/vector-icons"
import { Colors, COLORS } from "@/src/core/constant/Colors"
import { getSubtitleStyle, getTitleStyle } from "@/src/core/constant/Texts"
import PercentageBar from "@/src/core/shared/presentation/components/percentage-bar"
import InfoChip from "@/src/core/shared/presentation/components/info-chip"
import { NavigationProp, useNavigation } from "@react-navigation/native"
import { RootStackParams } from "@/src/core/shared/types/navigation"

const PortfolioLoanCard = () => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];

    const {
        navigate
    } = useNavigation<NavigationProp<RootStackParams>>();

    return (
        <TouchableOpacity onPress={() => {
            navigate("PortfolioLoanDetail")
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
                        }}>House Loan</Text>
                        <View style={{
                            flexDirection: "row",
                            alignItems: "center",
                            gap: Sizes.spacing.sm
                        }}>
                            <AntDesign name="clockcircleo" size={Sizes.iconSize.sm} color={color.onBackground} />
                            <Text style={{
                                ...getSubtitleStyle(Sizes.fontSize.sm, color.onBackground)
                            }}>RM 15,054.44</Text>
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
                        }}>RM 550,000</Text>

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
                        RM 15,054.44
                    </Text>

                </View>

                <View style={{
                    flexDirection: "column",
                    gap: Sizes.spacing.lg,
                    width: "100%"
                }}>
                    <LoanIndicator percentage={50} barColor={color.tint} color={color} title="Loan Amount" value="RM 15,054.44" />
                    <LoanIndicator percentage={50} barColor={color.tint} color={color} title="Total Loan" value="RM 550,000" />
                    <LoanIndicator percentage={50} barColor={color.tint} color={color} title="Loan Amount" value="RM 15,054.44" />
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
                        title="Loan Amount"
                        color={color.tint}
                    />
                    <InfoChip
                        icon={{
                            name: "information-circle-outline",
                            size: Sizes.iconSize.md,
                            color: color.tint,
                            type: "Ionicons"
                        }}
                        title="Loan Amount"
                        color={color.tint}
                    />
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
                    RM {value}
                </Text>

            </View>

            <PercentageBar percentage={50} barColor={color.tint} sizePad={4} />

        </View>
    )
}

export default PortfolioLoanCard