import { TouchableOpacity, useColorScheme } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "src/core/constant/Colors";
import { Sizes } from "src/core/constant/Sizes";
import { FontAwesome5 } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";


const AIAgentButton = ({ handleTransactionPress }: { handleTransactionPress: () => void }) => {
    const colorsScheme = useColorScheme();
    const colors = COLORS[colorsScheme ?? "dark"];
    return (
        <TouchableOpacity onPress={handleTransactionPress}>
            <LinearGradient colors={['#addfad', '#32cd32']} style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 50,
                position: 'absolute',
                bottom: 10,
                right: 10,
                height: 50,

                borderRadius: 100,
            }}>

                <FontAwesome5 name="robot" size={Sizes.iconSize.md} color={colors.onTint} />
            </LinearGradient>
        </TouchableOpacity>
    )
}



export default AIAgentButton;