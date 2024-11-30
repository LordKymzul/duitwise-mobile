import { View, Text, TouchableOpacity, Image, useColorScheme } from "react-native";
import { Ionicons, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { getSubtitleStyle, getTitleStyle } from "../../../../../core/constant/Texts";
import BankLoanDetailTile from "./bank-loan-detail-tile";
import { Sizes } from "../../../../../core/constant/Sizes";
import { COLORS } from "../../../../../core/constant/Colors";



export interface BankLoanDetailProps {
    title: string;
    value: string;

}

export interface BankLoanCardProps {
    bankName: string;
    loanType: string;
    details: BankLoanDetailProps[];
}

const BankLoanCard = ({ bankName, loanType, details }: BankLoanCardProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    console.log('Details: ', details);


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

            <TouchableOpacity style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: Sizes.spacing.lg,
                borderColor: colors.secondaryContainer,
                borderWidth: 1,
                padding: Sizes.padding.md,
                borderRadius: Sizes.borderRadius.md
            }}>
                <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    View All
                </Text>

                <Ionicons name="chevron-forward-outline" color={colors.onBackground} size={Sizes.iconSize.sm} />
            </TouchableOpacity>
        </View>
    )
}

export default BankLoanCard;