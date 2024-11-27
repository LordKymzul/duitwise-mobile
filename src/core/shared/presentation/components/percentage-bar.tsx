import { COLORS } from "@/src/core/constant/Colors"
import { Sizes } from "@/src/core/constant/Sizes"
import { Dimensions, useColorScheme } from "react-native"

import { View } from "react-native"

const PercentageBar = ({ percentage, barColor, sizePad }: { percentage: number, barColor: string, sizePad: number | undefined }) => {

    const colorScheme = useColorScheme()
    const color = COLORS[colorScheme ?? "dark"]
    return (
        <View style={{
            width: Dimensions.get('screen').width - Sizes.padding.lg * (sizePad ?? 4),
            // width: Dimensions.get('window').width,
            height: 10,
            backgroundColor: color.secondaryContainer,
            borderRadius: 100
        }}>
            <View style={{
                width: `${percentage}%`,
                height: "100%",
                backgroundColor: barColor,
                borderRadius: 100
            }}>
            </View>
        </View>

    )
}

export default PercentageBar

