import { View, Text, useColorScheme } from "react-native"
import {
    AntDesign,
    Ionicons
} from "@expo/vector-icons"
import PortfolioLoanCard from "../components/portfolio-loan-card"
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { BankPortfolio, portfolioData } from "src/core/constant/Data";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Loan } from "src/core/constant/Data";
import { usePortfolioStore } from "../../zustand/portfolio-store";
import DefaultButton from "src/core/shared/presentation/components/default-button";
import { BottomSheetBackdrop, BottomSheetBackdropProps, BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModal } from "@gorhom/bottom-sheet";

export const PortfolioLoanScreen = () => {
    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];


    const [bankPortfolio, setBankPortfolio] = useState<BankPortfolio | null>(null);
    const [loans, setLoans] = useState<Loan[]>([]);


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


    const {

        selectedPortfolio,
        setSelectedPortfolio
    } = usePortfolioStore()


    useEffect(() => {
        if (selectedPortfolio !== null) {
            setBankPortfolio(selectedPortfolio);
            setLoans(selectedPortfolio.loans);
        } else {
            setBankPortfolio(null);
            setLoans(portfolioData.portfolio.map((item) => item.loans).flat());
        }
    }, [selectedPortfolio]);


    return (
        <>
            <View style={{
                flex: 1,
                backgroundColor: color.background
            }}>

                <View style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: Sizes.padding.md
                }}>

                    {/* <View style={{
                        flexDirection: "row",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        width: "100%",
                        paddingHorizontal: Sizes.padding.lg
                    }}>
                        <DefaultButton
                            title="View All"
                            onPress={() => {
                                bottomSheetRef.current?.present()
                            }}
                            color={color.tint}
                            isPrimary
                        />
                    </View> */}
                    {
                        loans.length === 0 && (
                            <View style={{
                                marginVertical: Sizes.padding.lg,
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <Text>No loans found</Text>
                            </View>
                        )
                    }
                    {
                        loans.map((loan, index) => (
                            <View key={index} style={{
                                marginHorizontal: Sizes.padding.lg,
                                marginVertical: Sizes.spacing.md
                            }}>
                                <PortfolioLoanCard loan={loan} />
                            </View>
                        ))
                    }
                </View>

            </View>

            <BottomSheetModal
                ref={bottomSheetRef}
                index={1}
                snapPoints={snapPoints}
                backdropComponent={renderBackdrop}
            >
                <BottomSheetView>
                    <Text>
                        Hello
                    </Text>
                </BottomSheetView>
            </BottomSheetModal>
        </>
    )
}


