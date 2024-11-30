
import { View, Text, useColorScheme } from "react-native"
import PortfolioAssetCard from "../components/portfolio-asset-card";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { usePortfolioStore } from "../../zustand/portfolio-store";
import { Asset, portfolioData } from "src/core/constant/Data";
import { getTitleStyle } from "src/core/constant/Texts";

const PortfolioAssetScreen = () => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";


    const {
        selectedPortfolio
    } = usePortfolioStore();


    const getAssets = (): Asset[] => {
        if (selectedPortfolio == null) {
            return portfolioData.portfolio.map((item) => item.assets).flat();
        }
        return portfolioData.portfolio.find((item) => item.bankName === selectedPortfolio?.bankName)?.assets ?? [];
    }


    return (
        <View style={{
            flex: 1,
            backgroundColor: color.background,
            marginTop: Sizes.padding.lg,
        }}>
            {
                getAssets().length === 0 && (
                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.md, color.onBackground),
                        textAlign: "center",
                        marginVertical: Sizes.padding.lg,
                    }}>No assets found</Text>
                )
            }
            {
                getAssets().map((asset, index) => (
                    <View key={index} style={{

                        marginVertical: Sizes.padding.sm,
                        marginHorizontal: Sizes.padding.md,
                    }}>
                        <PortfolioAssetCard asset={asset} />
                    </View>
                ))
            }
        </View>

    )
}


export default PortfolioAssetScreen;