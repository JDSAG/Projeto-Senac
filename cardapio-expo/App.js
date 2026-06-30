import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import HomeScreen from "./screens/HomeScreen";
import CaixaNavigator from "./navigation/CaixaNavigator";
import CozinhaNavigator from "./navigation/CozinhaNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />

        <Stack.Screen
          name="Caixa"
          component={CaixaNavigator}
        />

        <Stack.Screen
          name="Cozinha"
          component={CozinhaNavigator}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}