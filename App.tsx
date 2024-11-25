import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, useColorScheme, View } from 'react-native';
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStackGroup from './src/core/routes/stack/app-stack';
import { COLORS } from './src/core/constant/Colors';


export default function App() {

  const colorScheme = useColorScheme();
  return (
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <StatusBar style="auto" />
      <AppStackGroup />
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
