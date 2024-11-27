import { View, Text, useColorScheme } from "react-native"
import { Sizes } from "@/src/core/constant/Sizes"
import {
    AntDesign,
    Ionicons
} from "@expo/vector-icons"
import { Colors, COLORS } from "@/src/core/constant/Colors"
import { getSubtitleStyle, getTitleStyle } from "@/src/core/constant/Texts"
import PercentageBar from "@/src/core/shared/presentation/components/percentage-bar"
import PortfolioLoanCard from "../components/portfolio-loan-card"

export const PortfolioLoanScreen = () => {
    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];


    return (
        <View style={{
            flex: 1,
            backgroundColor: color.background
        }}>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={{
                        marginHorizontal: Sizes.padding.lg,
                        marginVertical: Sizes.spacing.md
                    }}>
                        <PortfolioLoanCard />
                    </View>
                ))
            }
        </View>
    )
}