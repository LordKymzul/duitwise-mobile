
import { View, Text, useColorScheme } from "react-native"
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";


const PortfolioAssetCard = () => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"];
    const isDark = colorScheme === "dark";

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "center",
            backgroundColor: color.tint,
            borderRadius: Sizes.padding.md,
            padding: Sizes.padding.lg,
            gap: Sizes.padding.xl,

        }}>

            <View style={{
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "center",
                gap: Sizes.padding.sm,
            }}>
                <Text style={{
                    ...getTitleStyle(Sizes.fontSize.md, color.onTint)
                }}>
                    Portfolio Asset Screen
                </Text>
                <Text style={{
                    ...getSubtitleStyle(Sizes.fontSize.sm, color.onTint)
                }}>
                    1644 3333 333
                </Text>
            </View>

            <Text style={{
                ...getTitleStyle(Sizes.fontSize.lg, color.onTint)
            }}>
                RM 744.00
            </Text>
        </View>
    )
}

export default PortfolioAssetCard;