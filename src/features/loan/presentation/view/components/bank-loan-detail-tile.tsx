import { View, Text, useColorScheme } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { getSubtitleStyle } from "../../../../../core/constant/Texts";
import { Sizes } from "../../../../../core/constant/Sizes";
import { COLORS } from "../../../../../core/constant/Colors";

const BankLoanDetailTile = ({ title, value, }: { title: string, value: string }) => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];

    return (
        <View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            gap: Sizes.spacing.md,
            width: "100%"
        }}>

            <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                {title}
            </Text>

            <Text style={[getSubtitleStyle(Sizes.fontSize.sm, colors.onBackground)]}>
                {value}
            </Text>
        </View>

    )
}

export default BankLoanDetailTile;