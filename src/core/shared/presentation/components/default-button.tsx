import { TouchableOpacity, Text, useColorScheme } from "react-native";
import { Sizes } from "../../../constant/Sizes";
import { getTitleStyle } from "../../../constant/Texts";
import { COLORS } from "../../../constant/Colors";

interface DefaultButtonProps {
    title: string;
    onPress: () => void;
    color: string;
    borderRadius?: number;
    isPrimary?: boolean;
}

const DefaultButton = ({ title, onPress, color, borderRadius, isPrimary }: DefaultButtonProps) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <TouchableOpacity onPress={onPress} style={{
            backgroundColor: isPrimary ? color : colors.background,
            borderRadius: borderRadius ?? Sizes.borderRadius.md,
            paddingVertical: Sizes.padding.md,
            paddingHorizontal: Sizes.padding.md,
            alignItems: "center",
            justifyContent: "center",
            borderColor: isPrimary ? "transparent" : colors.tint,
            borderWidth: isPrimary ? 0 : 1
        }}>
            <Text style={[getTitleStyle(Sizes.fontSize.md, isPrimary ? "white" : colors.tint)]}>{title}</Text>
        </TouchableOpacity>
    )
}

export default DefaultButton;