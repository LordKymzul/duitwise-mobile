
import { View, Text, useColorScheme } from "react-native";
import { Colors } from "src/core/constant/Colors";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";
import { IconProps } from "src/core/shared/interface/props";
import DefaultIcon from "src/core/shared/presentation/components/default-icon";
;

const SummaryTypeCard = ({ icon, title, subtitle }: { icon: IconProps, title: string, subtitle: string }) => {

    let colorMain;
    let colorSecondary;

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    switch (title) {
        case "Total Expenses":
            colorMain = Colors.purple;
            colorSecondary = Colors.purpleTransparent;
            break;
        case "Total Income":
            colorMain = Colors.green;
            colorSecondary = Colors.greenTransparent;
            break;
        case "Monthly Surplus":
            colorMain = Colors.blue;
            colorSecondary = Colors.blueTransparent;
            break;
        default:
            colorMain = Colors.grey;
            colorSecondary = Colors.grey;
            break;
    }

    return (
        <View style={{
            flexDirection: "column",
            gap: Sizes.spacing.md,
            alignItems: "center",
            justifyContent: "center",
        }}>

            <View style={{
                padding: Sizes.spacing.lg,
                backgroundColor: colorSecondary,
                borderRadius: 100
            }}>
                <DefaultIcon {...icon} color={colorMain} />
            </View>

            <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>
                {title}
            </Text>
            <Text style={getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)}>
                {subtitle}
            </Text>

        </View>
    )
}


export default SummaryTypeCard; 