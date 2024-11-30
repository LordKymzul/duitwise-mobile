import { LinearGradient } from "expo-linear-gradient";
import { View, Text, useColorScheme } from "react-native"
import { COLORS } from "src/core/constant/Colors";
import { Asset } from "src/core/constant/Data";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";


const PortfolioAssetCard = ({ asset }: { asset: Asset }) => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";

    const gradientColors = isDark ?
        ['#004d40', '#00695c', '#00796b'] : // Dark theme green gradient
        ['#00897b', '#26a69a', '#4db6ac']; // Light theme green gradient

    return (
        <LinearGradient
            colors={["#00897b", "#26a69a", "#4db6ac"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
                borderRadius: Sizes.padding.md,
                padding: Sizes.padding.lg,
            }}>
            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: Sizes.padding.xl,
            }}>
                <View style={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    justifyContent: "center",
                    gap: Sizes.padding.sm,
                }}>
                    <Text style={{
                        ...getTitleStyle(Sizes.fontSize.md, "#ffffff")
                    }}>
                        {asset
                            .type}
                    </Text>
                    <Text style={{
                        ...getSubtitleStyle(Sizes.fontSize.sm, "#ffffff")
                    }}>
                        {asset.balance}
                    </Text>
                </View>

                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.lg, "#ffffff")
                }}>
                    RM {asset.balance}
                </Text>
            </View>
        </LinearGradient>
    )
}

export default PortfolioAssetCard;