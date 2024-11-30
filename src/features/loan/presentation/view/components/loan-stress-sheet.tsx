import { View, Text, Image, useColorScheme } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import DefaultGauge from "src/core/shared/presentation/components/default-gauge";

const LoanStressSheet = ({ value }: { value: number }) => {

    const colors = useColorScheme();
    const colorScheme = COLORS[colors ?? 'dark'];

    const gaugeValue = () => {
        if (value < 25) {
            return "Low"
        } else if (value >= 25 && value < 50) {
            return "Medium"
        } else if (value >= 50 && value < 75) {
            return "High"
        } else {
            return "Extreme"
        }
    }

    return (
        <View style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            gap: Sizes.spacing.md
        }}>
            <DefaultGauge value={value} />
            <Text style={[getTitleStyle(Sizes.fontSize.lg, colorScheme.onBackground)]}>
                Stress Level
            </Text>
            <Text style={[getSubtitleStyle(Sizes.fontSize.md, colorScheme.onBackground)]}>
                {gaugeValue()}
            </Text>
        </View>
    )
}

export default LoanStressSheet;