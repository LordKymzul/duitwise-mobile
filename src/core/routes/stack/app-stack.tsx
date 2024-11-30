import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedStackGroup from "./protected-stack";
import { TransactionDetailsScreen } from '@features/receipt/presentation/view/screens/transaction-details-screen';
import PortfolioScreen from "src/features/portfolio/presentation/view/screen/portfolio-screen";
import PortfolioLoanDetailScreen from "src/features/portfolio/presentation/view/screen/portfolio-loan-detail-screen";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const AppStack = createNativeStackNavigator();

const AppStackGroup = () => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <BottomSheetModalProvider>
                <AppStack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <AppStack.Screen name="ProtectedStack" component={ProtectedStackGroup} />
                </AppStack.Navigator>
            </BottomSheetModalProvider>
        </GestureHandlerRootView>

    )
}

export default AppStackGroup;