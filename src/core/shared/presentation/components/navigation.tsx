import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '@features/receipt/presentation/view/screens/transaction-screen';
import { TransactionDetailsScreen } from '@features/receipt/presentation/view/screens/transaction-details-screen';

const Stack = createStackNavigator();

export const AppNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Transactions" component={TransactionScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
    </Stack.Navigator>
  );
};
