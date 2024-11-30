import { View, Text, TouchableOpacity, Image, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import BankLoanDetailTile from "./bank-loan-detail-tile";
import { Sizes } from "../../../../../core/constant/Sizes";
import { COLORS } from "../../../../../core/constant/Colors";
import DefaultButton from "src/core/shared/presentation/components/default-button";



export interface BankLoanDetailProps {
    title: string;
    value: string;

}

export interface BankLoanCardProps {
    bankName: string;
    loanType: string;
    details: BankLoanDetailProps[];
    onStressTestPress: () => void;
    onApplyPress: () => void;
}

const BankLoanCard = ({ bankName, loanType, details, onStressTestPress, onApplyPress }: BankLoanCardProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];



    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: Sizes.spacing.sm,
            backgroundColor: colors.background,
            borderColor: colors.secondaryContainer,
            borderWidth: 1,
            padding: Sizes.padding.lg,
            borderRadius: Sizes.borderRadius.md
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                gap: Sizes.spacing.lg
            }}>

                <MaterialCommunityIcons name="bank" color={colors.onBackground} size={Sizes.iconSize.lg} />

                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "flex-start",
                    gap: Sizes.spacing.sm
                }}>

                    <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                        {loanType}
                    </Text>

                    <View style={{
                        backgroundColor: colors.tint,
                        paddingHorizontal: Sizes.padding.md,
                        paddingVertical: Sizes.padding.sm,
                        borderRadius: 100
                    }}>
                        <Text style={[getSubtitleStyle(Sizes.fontSize.sm, "white")]}>
                            Popular
                        </Text>
                    </View>

                </View>

            </View>

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                marginTop: Sizes.spacing.md,
                gap: Sizes.spacing.lg,
            }}>

                {
                    details.length > 0 && details.map((detail, index) => (
                        <BankLoanDetailTile key={index} title={detail.title} value={detail.value} />
                    ))
                }

            </View>

            <View style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: Sizes.spacing.lg,
                marginTop: Sizes.spacing.lg,
            }}>

                <View style={{
                    flex: 1
                }}>
                    <DefaultButton
                        title="Stress Test"
                        onPress={onStressTestPress}
                        color={colors.tint}
                        isPrimary={false}
                    />
                </View>

                <View style={{
                    flex: 1
                }}>
                    <DefaultButton
                        title="Apply"
                        onPress={onApplyPress}
                        color={colors.tint}
                        isPrimary={true}
                    />
                </View>

            </View>

        </View>
    )
}

export default BankLoanCard;