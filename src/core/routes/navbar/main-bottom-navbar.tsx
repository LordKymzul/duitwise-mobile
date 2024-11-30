import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { COLORS } from "../../constant/Colors";
import { useColorScheme } from "react-native";


import {
    Feather,
    Ionicons
} from "@expo/vector-icons";
import ReceiptScreen from "@features/receipt/presentation/view/screens/receipt-screen";
import { TransactionScreen } from "@features/receipt/presentation/view/screens/transaction-screen";
import { ReceiptClaimedScreen } from "@features/receipt/presentation/view/screens/receipt-claimed-screen";
import ExpensesScreen from "src/features/expenses/presentation/view/screens/expenses-screen";
import LoanScreen from "src/features/loan/presentation/view/screens/loan-screen";
import HomeScreen from "src/core/shared/presentation/screen/home-screen";
import { LinearGradient } from "expo-linear-gradient";
const Tab = createBottomTabNavigator();

const MainBottomNavbar = () => {


    const colorScheme = useColorScheme();
    const colors = COLORS[colorScheme ?? 'dark'];


    return (
        <Tab.Navigator
            id={undefined}
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
            <Tab.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Tab.Screen name="Expenses" component={ExpensesScreen} />
            <Tab.Screen options={{

                headerTitle: "",
                headerShadowVisible: false,
                headerShown: true,
                headerStyle: {
                    elevation: 0,
                    borderBottomWidth: 0,
                },
                headerBackground: () => <LinearGradient colors={['#4CAF50', '#4CAF50']} style={{ flex: 1 }} />
            }} name="Loans" component={LoanScreen} />
            <Tab.Screen options={{
                headerTitle: "",
                headerShadowVisible: false,
                headerShown: true,
                headerStyle: {
                    elevation: 0,
                    borderBottomWidth: 0,
                },
                headerBackground: () => <LinearGradient colors={['#4CAF50', '#4CAF50']} style={{ flex: 1 }} />
            }} name="Snaps" component={ReceiptScreen} />
        </Tab.Navigator>
    )
}

export default MainBottomNavbar;