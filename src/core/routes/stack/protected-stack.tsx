import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainBottomNavbar from "../navbar/main-bottom-navbar";
import PortfolioScreen from "@/src/features/portfolio/presentation/view/screen/portfolio-screen";
import PortfolioLoanDetailScreen from "@/src/features/portfolio/presentation/view/screen/portfolio-loan-detail-screen";

const ProtectedStack = createNativeStackNavigator();


const ProtectedStackGroup = () => {
    return (
        <ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
            <ProtectedStack.Screen name="MainBottomNavbar" component={MainBottomNavbar} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "" }} name="Portfolio" component={PortfolioScreen} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "Loan Detail" }} name="PortfolioLoanDetail" component={PortfolioLoanDetailScreen} />
        </ProtectedStack.Navigator>
    )
}

export default ProtectedStackGroup;