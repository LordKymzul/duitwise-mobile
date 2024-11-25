import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainBottomNavbar from "../navbar/main-bottom-navbar";

const ProtectedStack = createNativeStackNavigator();


const ProtectedStackGroup = () => {
    return (
        <ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
            <ProtectedStack.Screen name="MainBottomNavbar" component={MainBottomNavbar} />
        </ProtectedStack.Navigator>
    )
}

export default ProtectedStackGroup;