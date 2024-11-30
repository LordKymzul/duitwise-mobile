
import { useColorScheme, View, Text } from "react-native";
import SummaryCard from "../components/summary-card";
import SummaryTypeCard from "../components/summary-type-card";
import SummaryPieChart from "../components/summary-pie-chart";
import { Colors, COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import PieChart from "react-native-pie-chart";
import { chartData } from "src/core/shared/utils/helper";
import DefaultAccordian from "src/core/shared/presentation/components/default-accordian";
import { useState } from "react";



const summaryAccordianData = [
    {
        "label": "Total Income",
        "value": "totalIncome",
        "isOpen": true
    },
    {
        "label": "Total Expenses",
        "value": "totalExpenses",
        "isOpen": true
    }
]


const ExpensesSummaryScreen = () => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];


    const [summaryAccordian, setSummaryAccordian] = useState(summaryAccordianData);


    const handleAccordian = (value: boolean, index: number) => {
        summaryAccordian[index].isOpen = !value;
        setSummaryAccordian([...summaryAccordian]);
    }



    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
        }}>

            <View style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: Sizes.spacing.lg
            }}>
                <SummaryPieChart />

            </View>
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
                summaryAccordian.map((item, index) => (
                    <View key={index} style={{
                        marginTop: Sizes.spacing.md,
                        marginHorizontal: Sizes.spacing.lg
                    }}>
                        <DefaultAccordian
                            key={index}
                            title={item.label}
                            isOpen={item.isOpen}
                            setIsOpen={() => handleAccordian(item.isOpen, index)}

                        >
                            {
                                item.isOpen && (
                                    <SummaryCard
                                        title={item.label}
                                        value="RM 5,000"
                                        type="income"
                                    />
                                )
                            }

                        </DefaultAccordian>

                    </View>
                ))
            }






        </View >
    )
}


export default ExpensesSummaryScreen;