
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useColorScheme, View, ScrollView } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import TabButton from "src/core/shared/presentation/components/tab-button";
import ExpensesTransactionScreen from "./expenses-transaction-screen";
import ExpensesSummaryScreen from "./expenses-summary-screen";
import { usePortfolioStore } from "src/features/portfolio/presentation/zustand/portfolio-store";
import AIAgentButton from "src/core/shared/presentation/components/ai-agent-button";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import AiAgentSheet from "src/features/ai-agent/presentation/view/components/ai-agent-sheet";
import LoanStressSheet from "src/features/loan/presentation/view/components/loan-stress-sheet";



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

    const bottomSheetRef = useRef<BottomSheetModal>(null);

    const snapPoints = useMemo(() => ["30%", "50%", "90%"], []);


    const renderBackdrop = useCallback(
        (props: BottomSheetBackdropProps) => (
            <BottomSheetBackdrop
                {...props}
                disappearsOnIndex={-1}
                appearsOnIndex={0}
                pressBehavior={"close"}
            />
        ),
        []
    );


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
            <AIAgentButton handleTransactionPress={() => {
                bottomSheetRef.current?.present();
            }} />

            <BottomSheetModal
                ref={bottomSheetRef}
                index={3}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <AiAgentSheet />
                </BottomSheetView>
            </BottomSheetModal>

        </>
    )
}



export default ExpensesScreen;