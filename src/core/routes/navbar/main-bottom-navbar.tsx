import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "@features/receipt/presentation/view/screens/home-screen";import { COLORS } from "../../constant/Colors";
import { useColorScheme } from "react-native";


import {
    Feather,
    Ionicons
} from "@expo/vector-icons";
import ReceiptScreen from "@features/receipt/presentation/view/screens/receipt-screen";
import { TransactionScreen } from "@features/receipt/presentation/view/screens/transaction-screen";
import { ReceiptClaimedScreen } from "@features/receipt/presentation/view/screens/receipt-claimed-screen";
const Tab = createBottomTabNavigator();

const MainBottomNavbar = () => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarActiveTintColor: colors.tint,
                tabBarIcon: ({ color, size, focused }) => {
                    let iconname;

                    if (route.name === "Home") {
                        iconname = focused ? "home" : "home-outline";
                    } else if (route.name === "Expenses") {
                        iconname = focused ? "wallet" : "wallet-outline";
                    } else if (route.name === "Loans") {
                        iconname = focused ? "newspaper" : "newspaper-outline";
                    } else if (route.name === "Snaps") {
                        iconname = focused ? "camera" : "camera-outline";
                    }

                    return <Ionicons name={iconname as keyof typeof Ionicons.glyphMap} color={color} size={size} />
                },
            })}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Expenses" component={TransactionScreen} />
            <Tab.Screen name="Loans" component={ReceiptClaimedScreen} />
            <Tab.Screen name="Snaps" component={ReceiptScreen} />
        </Tab.Navigator>
    )
}

export default MainBottomNavbar;