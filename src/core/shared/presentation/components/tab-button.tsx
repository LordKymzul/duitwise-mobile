import { View, Text, useColorScheme, TouchableOpacity } from "react-native"
import { COLORS } from "../../../constant/Colors";
import { Sizes } from "../../../constant/Sizes";
import { getTitleStyle } from "../../../constant/Texts";






const TabButton = ({ title, isSelected, onPress }: { title: string, isSelected: boolean, onPress: () => void }) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <TouchableOpacity
            onPress={onPress}
            style={{
                backgroundColor: isSelected ? colors.tint : colors.background,
                borderWidth: 1,
                borderColor: isSelected ? colors.tint : colors.secondaryContainer,
                paddingHorizontal: Sizes.spacing.lg,
                paddingVertical: Sizes.spacing.md,
                borderRadius: 100,
                alignItems: "center",
                justifyContent: "center"
            }}>
            <Text style={[getTitleStyle(Sizes.fontSize.md, isSelected ? "white" : colors.onBackground)]}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export default TabButton;