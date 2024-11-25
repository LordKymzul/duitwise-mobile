import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedStackGroup from "./protected-stack";

const AppStack = createNativeStackNavigator();




const AppStackGroup = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="ProtectedStack" component={ProtectedStackGroup} />
        </AppStack.Navigator>
    )
}

export default AppStackGroup;