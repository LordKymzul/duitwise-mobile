import DefaultEntityCard from "@/src/core/shared/presentation/components/default-entity-card"
import { View, Text, useColorScheme } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { PATHS } from "@/src/core/constant/Paths";
import { getTitleStyle } from "@/src/core/constant/Texts";
import { Sizes } from "@/src/core/constant/Sizes";
import { COLORS } from "@/src/core/constant/Colors";


export interface TransactionCardProps {
    title: string;
    subtitle: string;
    amount: number;
    imageUrl: string;
}

const TransactionCard = ({ title, subtitle, amount, imageUrl }: TransactionCardProps) => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    const isPositive = amount > 0;

    return (
        <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%"
        }}>

            <View style={{
                flex: 1,
                alignItems: "flex-start",
                justifyContent: "center"
            }}>
                <DefaultEntityCard
                    imageUrl={imageUrl}
                    title={title}
                    subtitle={subtitle}
                />
            </View>

            <View style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: Sizes.spacing.sm
            }}>
                <Text style={getTitleStyle(Sizes.fontSize.md, isPositive ? "green" : "red")}>RM {amount.toFixed(2)}</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: Sizes.spacing.md
                }}>

                    <Ionicons
                        name="information-circle-outline"
                        size={Sizes.iconSize.sm}
                        color={colors.onBackground} />

                    <Text style={[getTitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                        Low Stress
                    </Text>

                </View>
            </View>

        </View>
    )
}

export default TransactionCard;