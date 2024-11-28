import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProtectedStackGroup from "./protected-stack";
import { TransactionDetailsScreen } from '@features/receipt/presentation/view/screens/transaction-details-screen';

const AppStack = createNativeStackNavigator();

const AppStackGroup = () => {
    return (
        <AppStack.Navigator screenOptions={{ headerShown: false }}>
            <AppStack.Screen name="ProtectedStack" component={ProtectedStackGroup} />
            <AppStack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
        </AppStack.Navigator>
    )
}

export default AppStackGroup;