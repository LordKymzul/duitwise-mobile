import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStackGroup from './src/core/routes/stack/app-stack';
import { COLORS } from './src/core/constant/Colors';
import { useFonts } from 'expo-font';
import Toast from 'react-native-toast-message';


export default function App() {

  const colorScheme = useColorScheme();


  const [fontsLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Light': require('./assets/fonts/Roboto-Light.ttf'),
    'Roboto-Medium': require('./assets/fonts/Roboto-Medium.ttf'),
    'Figtree-VariableFont_wght': require('./assets/fonts/Figtree-VariableFont_wght.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NavigationContainer
    // theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <StatusBar style="auto" />
      <AppStackGroup />
      <Toast />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});