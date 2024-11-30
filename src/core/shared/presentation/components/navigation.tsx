import { createStackNavigator } from '@react-navigation/stack';
import { TransactionScreen } from '@features/receipt/presentation/view/screens/transaction-screen';
import { TransactionDetailsScreen } from '@features/receipt/presentation/view/screens/transaction-details-screen';
import LoginPortfolio from '@features/portfolio/presentation/view/screen/login-portfolio';
import HomeScreen from '../screen/home-screen';
import { RootStackParams } from '../../types/navigation';

const Stack = createStackNavigator<RootStackParams>();

export const AppNavigator = () => {
  return (
    <Stack.Navigator id={undefined}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Transaction" component={TransactionScreen} />
      <Stack.Screen name="TransactionDetails" component={TransactionDetailsScreen} />
      <Stack.Screen 
        name="LoginPortfolio" 
        component={LoginPortfolio}
        options={{
         
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
};
