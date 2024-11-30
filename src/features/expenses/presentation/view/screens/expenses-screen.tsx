
import { useState } from "react";
import { useColorScheme, View, ScrollView } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import TabButton from "src/core/shared/presentation/components/tab-button";
import ExpensesTransactionScreen from "./expenses-transaction-screen";
import ExpensesSummaryScreen from "./expenses-summary-screen";



const ExpensesScreen = () => {
    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    const [selectedTab, setSelectedTab] = useState<"transaction" | "summary">("transaction");

    const handleTabChange = (tab: "transaction" | "summary") => {
        setSelectedTab(tab);
    }

    return (

        <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
                backgroundColor: colors.background,
                flex: 1
            }}
        >
            <View style={{
                backgroundColor: colors.background,
                flexDirection: "column",
                gap: Sizes.spacing.md,

            }}>
                <View style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: Sizes.spacing.md,
                    marginTop: Sizes.spacing.lg,
                    paddingHorizontal: Sizes.spacing.lg
                }}>
                    <View style={{
                        flex: 1
                    }}>
                        <TabButton title="Transaction" isSelected={selectedTab === "transaction"} onPress={() => handleTabChange("transaction")} />
                    </View>

                    <View style={{
                        flex: 1
                    }}>
                        <TabButton title="Summary" isSelected={selectedTab === "summary"} onPress={() => handleTabChange("summary")} />
                    </View>
                </View>

                {selectedTab === "transaction" && <ExpensesTransactionScreen />}
                {selectedTab === "summary" && <ExpensesSummaryScreen />}


            </View>
        </ScrollView>
    )
}



export default ExpensesScreen;