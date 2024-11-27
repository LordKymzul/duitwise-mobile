import { View, Text, useColorScheme } from "react-native";
import { getSubtitleStyle, getTitleStyle } from "../../../constant/Texts";
import { Sizes } from "../../../constant/Sizes";
import Slider from "@react-native-community/slider";
import { COLORS } from "../../../constant/Colors";


interface SliderFormProps {
    title: string;
    value: number;
    minimumValue: number;
    maximumValue: number;
    onChange: (value: number) => void;
    unit: string;
    color?: string;
}


export const SliderForm = ({
    title,
    value,
    minimumValue,
    maximumValue,
    onChange,
    unit,
    color }: SliderFormProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];

    const isRM = unit === "RM";
    const isMonths = unit === "Months";
    return (
        <View style={{
            flexDirection: "column",
            alignItems: "flex-start",
            justifyContent: "flex-start",
            gap: Sizes.spacing.sm
        }}>

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
            }}>

                <Text style={[getSubtitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    {title}
                </Text>

                <Text style={[getTitleStyle(Sizes.fontSize.md, colors.onBackground)]}>
                    {value} {unit}
                </Text>

            </View>

            <Slider
                style={{
                    width: "100%",
                    height: 40,

                }}
                value={value}
                minimumValue={minimumValue}
                maximumValue={maximumValue}
                minimumTrackTintColor={color ?? colors.tint}
                maximumTrackTintColor={colors.secondaryContainer}
                step={1}
                onValueChange={onChange}

            />

            <View style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                width: "100%"
            }}>
                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                    {isRM ? "RM" : ""} {minimumValue} {isMonths ? "Months" : ""}
                </Text>

                <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                    {isRM ? "RM" : ""} {maximumValue} {isMonths ? "Months" : ""}
                </Text>
            </View>
        </View>
    )
}