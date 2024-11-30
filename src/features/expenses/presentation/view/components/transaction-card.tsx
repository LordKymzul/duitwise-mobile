import { View, Text, useColorScheme } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import DefaultEntityCard from "src/core/shared/presentation/components/default-entity-card";
import { COLORS } from "src/core/constant/Colors";
import { getTitleStyle } from "src/core/constant/Texts";
import { Sizes } from "src/core/constant/Sizes";
import { TransactionItemEntity } from "src/core/constant/Data";
import { PATHS } from "src/core/constant/Paths";
import { capitalizeFirstLetter, formatDate, formatDateDayandTime } from "src/core/shared/utils/helper";




const TransactionCard = ({ transaction }: { transaction: TransactionItemEntity }) => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    const isPositive = transaction.value > 0;


    const getColorLevel = (level: string) => {
        if (level === "High Stress") return "red";
        if (level === "Low Stress") return "green";
        if (level === "Medium Stress") return "orange";
        if (level === "Income") return "blue";
        return "black";
    }

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
                    imageUrl={transaction.imageURL ?? PATHS.dummyURL}
                    title={transaction.transactionName}
                    subtitle={formatDate(transaction.date)}
                />
            </View>

            <View style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-end",
                justifyContent: "center",
                gap: Sizes.spacing.sm
            }}>
                <Text style={getTitleStyle(Sizes.fontSize.md, isPositive ? "green" : "red")}>RM {transaction.value.toFixed(2)}</Text>
                <View style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: Sizes.spacing.md
                }}>

                    <Ionicons
                        name="information-circle-outline"
                        size={Sizes.iconSize.sm}
                        color={getColorLevel(transaction.stressLevel)} />

                    <Text style={[getTitleStyle(Sizes.fontSize.sm, getColorLevel(transaction.stressLevel))]}>
                        {capitalizeFirstLetter(transaction.stressLevel)}
                    </Text>

                </View>
            </View>

        </View>
    )
}

export default TransactionCard;