
import { useColorScheme, View, Text } from "react-native";
import { Colors } from "src/core/constant/Colors";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { getSubtitleStyle, getTitleStyle } from "src/core/constant/Texts";




const SummaryCard = ({
    title,
    value,
    type
}: {
    title: string;
    value: string;
    type: "income" | "expense" | "monthly";
}) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    let color;

    switch (type) {
        case "income":
            color = Colors.green;
            break;
        case "expense":
            color = 'red';
            break;
        case "monthly":
            color = Colors.blue;
            break;
    }


    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            backgroundColor: "#FFFFFF",
            paddingVertical: Sizes.spacing.md,
            paddingHorizontal: Sizes.spacing.md,
            borderRadius: Sizes.borderRadius.lg,
            width: "100%",
            borderColor: colors.secondaryContainer,
            borderWidth: 1
        }}>

            <View style={{
                width: 4,
                height: 60,
                backgroundColor: color,
                borderRadius: Sizes.borderRadius.md
            }} />


            <View style={{
                flexDirection: "column",
                gap: Sizes.spacing.sm,
                marginLeft: Sizes.spacing.md
            }}>
                <Text style={getTitleStyle(Sizes.fontSize.md, colors.onBackground)}>
                    {title}
                </Text>
                <Text style={getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)}>
                    {value}
                </Text>
            </View>




        </View>

    )
}

export default SummaryCard;