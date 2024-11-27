import { View, Text, TouchableOpacity } from "react-native";
import DefaultButton from "../components/default-button";
import { Colors } from "@/src/core/constant/Colors";
import { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../types/navigation";

const HomeScreen = () => {

    const {
        navigate
    } = useNavigation<NavigationProp<RootStackParams>>();


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <TouchableOpacity
                onPress={() => {
                    navigate("Portfolio");
                }}
            >
                <Text>Go to Portfolio</Text>
            </TouchableOpacity>
        </View>
    )
}

export default HomeScreen;