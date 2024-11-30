import { View, Text, useColorScheme } from "react-native"
import {
    AntDesign,
    Ionicons
} from "@expo/vector-icons"
import PortfolioLoanCard from "../components/portfolio-loan-card"
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { BankPortfolio, portfolioData } from "src/core/constant/Data";
import { useEffect, useState } from "react";
import { Loan } from "src/core/constant/Data";
import { usePortfolioStore } from "../../zustand/portfolio-store";

export const PortfolioLoanScreen = () => {
    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];


    const [bankPortfolio, setBankPortfolio] = useState<BankPortfolio | null>(null);
    const [loans, setLoans] = useState<Loan[]>([]);


    const {
        portfolio,
        setPortfolio,
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
        <View style={{
            flex: 1,
            backgroundColor: color.background
        }}>
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
    )
}