
import { useEffect, useState } from "react";
import { useColorScheme, View, ScrollView } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import TabButton from "src/core/shared/presentation/components/tab-button";
import ExpensesTransactionScreen from "./expenses-transaction-screen";
import ExpensesSummaryScreen from "./expenses-summary-screen";
import { usePortfolioStore } from "src/features/portfolio/presentation/zustand/portfolio-store";
import AIAgentButton from "src/core/shared/presentation/components/ai-agent-button";



const ExpensesScreen = () => {
    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    const [selectedTab, setSelectedTab] = useState<"transaction" | "summary">("transaction");

    const handleTabChange = (tab: "transaction" | "summary") => {
        setSelectedTab(tab);
        // usePortfolioStore.getState().setPortfolios();
    }

    useEffect(() => {
        const fetchPortfolios = async () => {
            await usePortfolioStore.getState().setPortfolios();
        };
        fetchPortfolios();
    }, []);

    return (

        <>
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
            <AIAgentButton handleTransactionPress={() => { }} />
        </>
    )
}



export default ExpensesScreen;