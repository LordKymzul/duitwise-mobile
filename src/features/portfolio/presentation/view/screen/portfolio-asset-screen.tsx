import { COLORS } from "@/src/core/constant/Colors";
import { Sizes } from "@/src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "@/src/core/constant/Texts";
import { View, Text, useColorScheme } from "react-native"
import PortfolioAssetCard from "../components/portfolio-asset-card";

const PortfolioAssetScreen = () => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";

    return (
        <View style={{
            flex: 1,
            backgroundColor: color.background,
            marginTop: Sizes.padding.lg,
        }}>
            {
                Array.from({ length: 10 }).map((_, index) => (
                    <View key={index} style={{

                        marginVertical: Sizes.padding.sm,
                        marginHorizontal: Sizes.padding.md,
                    }}>
                        <PortfolioAssetCard />
                    </View>
                ))
            }
        </View>

    )
}


export default PortfolioAssetScreen;