import { Colors, COLORS } from "@/src/core/constant/Colors";
import { Sizes } from "@/src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "@/src/core/constant/Texts";
import { IconProps } from "@/src/core/shared/interface/props";
import DefaultIcon from "@/src/core/shared/presentation/components/default-icon";
import { useColorScheme, View, Text } from "react-native";
import SummaryCard from "../components/summary-card";
import SummaryTypeCard from "../components/summary-type-card";
import SummaryPieChart from "../components/summary-pie-chart";


const ExpensesSummaryScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];


    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
        }}>



            <SummaryPieChart />

            <View style={{
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center",
                gap: Sizes.spacing.md,
                width: "100%",
                marginTop: Sizes.spacing.lg
            }}>

                <View style={{
                    flex: 1
                }}>
                    <SummaryTypeCard
                        icon={{
                            name: "wallet-outline",
                            size: Sizes.iconSize.lg,
                            color: Colors.green,
                            type: "Ionicons"
                        }}
                        title="Total Income"
                        subtitle="RM8,000"
                    />
                </View>

                <View style={{
                    flex: 1
                }}>
                    <SummaryTypeCard
                        icon={{
                            name: "wallet-outline",
                            size: Sizes.iconSize.lg,
                            color: Colors.green,
                            type: "Ionicons"
                        }}
                        title="Total Expenses"
                        subtitle="RM8,000"
                    />
                </View>
                <View style={{
                    flex: 1
                }}>
                    <SummaryTypeCard
                        icon={{
                            name: "wallet-outline",
                            size: Sizes.iconSize.lg,
                            color: Colors.green,
                            type: "Ionicons"
                        }}
                        title="Monthly Surplus"
                        subtitle="RM8,000"
                    />
                </View>

            </View>

            {
                Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={{
                        marginTop: Sizes.spacing.md,
                        marginHorizontal: Sizes.spacing.lg
                    }}>
                        <SummaryCard
                            title="Primary Salary"
                            value="RM 5,000"
                            type="income"
                        />
                    </View>
                ))
            }






        </View >
    )
}


export default ExpensesSummaryScreen;