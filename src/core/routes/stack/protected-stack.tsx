import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MainBottomNavbar from "../navbar/main-bottom-navbar";
import PortfolioScreen from "src/features/portfolio/presentation/view/screen/portfolio-screen";
import PortfolioLoanDetailScreen from "src/features/portfolio/presentation/view/screen/portfolio-loan-detail-screen";
import { TransactionDetailsScreen } from "src/features/receipt/presentation/view/screens/transaction-details-screen";
import { TransactionScreen } from "src/features/receipt/presentation/view/screens/transaction-screen";
import { ReceiptClaimedScreen } from "src/features/receipt/presentation/view/screens/receipt-claimed-screen";
import { PortfolioDrawer } from "../drawer/portfolio-drawer";
import ReceiptAttachedScreen from "src/features/receipt/presentation/view/screens/receipt-attached-screen";

const ProtectedStack = createNativeStackNavigator();


const ProtectedStackGroup = () => {
    return (
        <ProtectedStack.Navigator screenOptions={{ headerShown: false }}>
            <ProtectedStack.Screen name="MainBottomNavbar" component={MainBottomNavbar} />
            <ProtectedStack.Screen options={{ headerShown: false, headerTitle: "" }} name="Portfolio" component={PortfolioDrawer} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "Loan Detail" }} name="PortfolioLoanDetail" component={PortfolioLoanDetailScreen} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "" }} name="Transaction" component={TransactionScreen} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "", }} name="TransactionDetails" component={TransactionDetailsScreen} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "" }} name="ReceiptDetail" component={ReceiptClaimedScreen} />
            <ProtectedStack.Screen options={{ headerShown: true, headerTitle: "" }} name="ReceiptAttached" component={ReceiptAttachedScreen} />
        </ProtectedStack.Navigator>
    )
}

export default ProtectedStackGroup;