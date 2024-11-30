import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity, useColorScheme } from "react-native";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";

const DefaultGoBackButton = ({ onPress }: { onPress: () => void }) => {

    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? "dark"];
    return <TouchableOpacity onPress={onPress}>
        <Ionicons name="chevron-back" size={Sizes.iconSize.lg} color={colors.onBackground} />
    </TouchableOpacity>
};

export default DefaultGoBackButton;